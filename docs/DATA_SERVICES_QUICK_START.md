# Data Services Quick Start Guide

## TL;DR

Three services handle all data persistence with automatic Supabase ↔ localStorage fallback:

```typescript
import { getDocument } from './services/documentService';
import { loadOutline, saveOutline } from './services/outlineService';
import { loadBattle, saveBattle } from './services/battleService';

// Fetch document
const doc = await getDocument();

// Load user progress
const outline = await loadOutline(userId, docId);

// Save progress (debounced 300ms)
await saveOutline(userId, docId, outlineState);

// Load battle session
const battle = await loadBattle(userId, docId);

// Save battle session
await saveBattle(userId, docId, battleState);
```

## Setup

### Option 1: Mock Mode (No Setup Required)

Just start coding. Services use localStorage + mock data automatically.

```bash
npm run dev
```

### Option 2: Production Mode (Supabase)

1. Create a Supabase project at [supabase.com](https://supabase.com)

2. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

3. Add your credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

4. Run migrations (see `docs/DATA_SERVICES_ARCHITECTURE.md`)

5. Start the app:
```bash
npm run dev
```

## API Reference

### Document Service

```typescript
// Get a document by ID (or first available)
const doc: Document = await getDocument(docId?: string);

// Validate document structure
const isValid: boolean = validateDocument(doc);
```

**Returns:** Always returns a valid document (falls back to mock data on error)

---

### Outline Service

```typescript
// Load outline (returns default if none exists)
const outline: OutlineState = await loadOutline(
  userId: string,
  docId: string
);

// Save outline (debounced 300ms)
await saveOutline(
  userId: string,
  docId: string,
  outline: OutlineState
);
```

**OutlineState Structure:**
```typescript
{
  highlights: Highlight[];           // User-created highlights
  pinnedQuestions: PinnedQuestion[]; // Questions pinned from lenses
  engagedProvocations: string[];     // IDs of provocations engaged
  explainText: string;               // "Explain It Back" text
  explainRound: number;              // Revision round counter
}
```

**Key Behavior:**
- `loadOutline` returns empty default if nothing saved
- `saveOutline` is debounced (300ms) — call it freely on every keystroke
- Data isolated by `userId` + `docId` combination

---

### Battle Service

```typescript
// Load battle session (returns null if none exists)
const battle: BattleState | null = await loadBattle(
  userId: string,
  docId: string
);

// Save battle session
await saveBattle(
  userId: string,
  docId: string,
  battle: BattleState
);
```

**BattleState Structure:**
```typescript
{
  phase: 1 | 2 | 3;                  // Current battle phase
  acceptedQuestions: BattleQuestion[]; // Questions that passed evaluation
  answers: Record<number, string>;   // User's answers by question index
  results: BattleResult[] | null;    // Scoring results (phase 3 only)
}
```

**Key Behavior:**
- `loadBattle` returns `null` if no session exists (vs. default object)
- `saveBattle` is immediate (not debounced)
- Data isolated by `userId` + `docId` combination

---

## Error Handling

**All services never throw errors.** They handle failures gracefully:

```typescript
// ✅ Safe — no try/catch needed
const doc = await getDocument();
const outline = await loadOutline(userId, docId);
await saveOutline(userId, docId, outline);
```

**Fallback Chain:**
1. Try Supabase (if configured)
2. Fall back to localStorage on error
3. Return safe default if localStorage fails
4. Log all errors to console

---

## Testing

```bash
# Run all tests
npm run test

# Run data services tests only
npm run test:run -- src/test/dataServices.test.ts

# Watch mode
npm run test -- src/test/dataServices.test.ts
```

**Test Coverage:**
- ✅ Basic CRUD operations
- ✅ localStorage fallback
- ✅ Corrupted data handling
- ✅ Quota exceeded errors
- ✅ User/document isolation
- ✅ Complex nested data structures

---

## Common Patterns

### Loading Data on Mount

```typescript
useEffect(() => {
  async function loadData() {
    const doc = await getDocument();
    const outline = await loadOutline(userId, doc.id);
    
    setDocument(doc);
    setOutline(outline);
  }
  
  loadData();
}, [userId]);
```

### Saving on User Input (Debounced)

```typescript
const handleTextChange = async (text: string) => {
  // Update local state immediately
  setExplainText(text);
  
  // Save to database (debounced 300ms)
  await saveOutline(userId, docId, {
    ...outline,
    explainText: text,
  });
};
```

### Saving Battle Progress

```typescript
const handleAnswerSubmit = async (index: number, answer: string) => {
  const updatedBattle = {
    ...battle,
    answers: { ...battle.answers, [index]: answer },
  };
  
  setBattle(updatedBattle);
  await saveBattle(userId, docId, updatedBattle);
};
```

### Checking if Data Exists

```typescript
const battle = await loadBattle(userId, docId);

if (battle === null) {
  // No battle session — start new one
  const newBattle: BattleState = {
    phase: 1,
    acceptedQuestions: [],
    answers: {},
    results: null,
  };
  await saveBattle(userId, docId, newBattle);
} else {
  // Resume existing session
  setBattle(battle);
}
```

---

## Debugging

### Check Current Mode

```typescript
import { isMockMode } from './lib/supabase';

console.log('Mock mode:', isMockMode());
// true = using localStorage + mock data
// false = using Supabase (with localStorage fallback)
```

### Inspect localStorage

```javascript
// In browser console
localStorage.getItem('outline-user-1-doc-1');
localStorage.getItem('battle-user-1-doc-1');

// Clear all data
localStorage.clear();
```

### Monitor Service Logs

All services log to console with prefixes:
```
[documentService] Supabase fetch failed, falling back to mock
[outlineService] localStorage write failed: QuotaExceededError
[battleService] Supabase load failed, falling back to localStorage
```

---

## Performance Tips

### Debouncing is Built-In

`saveOutline` is already debounced (300ms). Don't add your own debouncing:

```typescript
// ❌ Don't do this
const debouncedSave = debounce(saveOutline, 300);

// ✅ Do this
await saveOutline(userId, docId, outline);
```

### Batch State Updates

Update local state first, then save once:

```typescript
// ❌ Multiple saves
await saveOutline(userId, docId, { ...outline, explainText: text });
await saveOutline(userId, docId, { ...outline, explainRound: round });

// ✅ Single save
const updated = { ...outline, explainText: text, explainRound: round };
await saveOutline(userId, docId, updated);
```

### Avoid Unnecessary Loads

Cache data in component state:

```typescript
// ❌ Load on every render
const outline = await loadOutline(userId, docId);

// ✅ Load once on mount
useEffect(() => {
  loadOutline(userId, docId).then(setOutline);
}, [userId, docId]);
```

---

## Troubleshooting

### Data Not Persisting

**Check 1:** Is localStorage enabled?
```javascript
// In browser console
localStorage.setItem('test', 'value');
localStorage.getItem('test'); // Should return 'value'
```

**Check 2:** Are you waiting for debounce?
```typescript
await saveOutline(userId, docId, outline);
await new Promise(r => setTimeout(r, 400)); // Wait for debounce
const loaded = await loadOutline(userId, docId);
```

**Check 3:** Is Supabase configured correctly?
```typescript
import { supabase } from './lib/supabase';
console.log('Supabase client:', supabase);
// Should be object (not null) if configured
```

### QuotaExceededError

localStorage is full (5-10MB limit). Clear old data:

```javascript
// Clear all ASK data
Object.keys(localStorage)
  .filter(key => key.startsWith('outline-') || key.startsWith('battle-'))
  .forEach(key => localStorage.removeItem(key));
```

### Stale Data

Force reload by clearing cache:

```typescript
// Clear specific user/doc
localStorage.removeItem(`outline-${userId}-${docId}`);
localStorage.removeItem(`battle-${userId}-${docId}`);

// Then reload
const outline = await loadOutline(userId, docId);
```

---

## Migration Guide

### From localStorage-only to Supabase

1. Export existing data:
```typescript
const outline = await loadOutline(userId, docId);
console.log(JSON.stringify(outline));
```

2. Add Supabase credentials to `.env`

3. Restart app — services will automatically use Supabase

4. Data in localStorage remains as fallback

### From Supabase to localStorage-only

1. Remove Supabase credentials from `.env`

2. Restart app — services will use localStorage

3. Existing localStorage data is preserved

---

## Next Steps

- Read full architecture docs: `docs/DATA_SERVICES_ARCHITECTURE.md`
- Review type definitions: `src/types.ts`
- Explore mock data: `src/services/mockData.ts`
- Check test examples: `src/test/dataServices.test.ts`

---

## Support

For issues or questions:
1. Check console logs for service-specific errors
2. Verify environment configuration
3. Run tests to isolate the problem
4. Review architecture documentation

**Remember:** Services are designed to never fail. If you're seeing errors in your UI, the issue is likely in how you're handling the returned data, not in the services themselves.
