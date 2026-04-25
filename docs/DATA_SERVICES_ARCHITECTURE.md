# Data Services Architecture

## Overview

The Scaffold (Provoke) application implements a robust data persistence layer with three core services that handle document retrieval, outline management, and battle session tracking. Each service follows a **Supabase-first, localStorage-fallback** pattern to ensure the application works seamlessly in both online and offline modes.

## Architecture Pattern

### Dual-Mode Operation

All data services support two operational modes:

1. **Mock Mode** (Development/Offline)
   - Activated when Supabase credentials are not configured
   - Uses localStorage for persistence
   - Falls back to hardcoded mock data when localStorage is unavailable
   - Ideal for local development and offline demos

2. **Production Mode** (Online)
   - Activated when Supabase credentials are present
   - Primary storage: Supabase PostgreSQL database
   - Automatic fallback to localStorage on network errors
   - Graceful degradation ensures uninterrupted user experience

### Mode Detection

```typescript
// src/lib/supabase.ts
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export function isMockMode(): boolean {
  return supabase === null;
}
```

## Service Implementations

### 1. Document Service (`documentService.ts`)

**Purpose:** Fetch source documents for study sessions.

**Database Schema:**
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  sections JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Key Features:**
- Retrieves documents by ID or returns the first available document
- Falls back to mock data (`DOCUMENT`) when Supabase is unavailable
- Includes validation function to verify document structure integrity

**API:**
```typescript
// Fetch a document (by ID or first available)
const doc = await getDocument(docId?: string): Promise<Document>

// Validate document structure
const isValid = validateDocument(doc: Document): boolean
```

**Error Handling:**
- Network errors → returns mock document
- Invalid data → returns mock document
- All errors logged to console with `[documentService]` prefix

---

### 2. Outline Service (`outlineService.ts`)

**Purpose:** Manage user study progress including highlights, pinned questions, engaged provocations, and "Explain It Back" text.

**Database Schema:**
```sql
CREATE TABLE outlines (
  user_id UUID NOT NULL,
  document_id UUID NOT NULL,
  highlights JSONB DEFAULT '[]',
  pinned_questions JSONB DEFAULT '[]',
  engaged_provocations JSONB DEFAULT '[]',
  explain_text TEXT DEFAULT '',
  explain_round INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, document_id)
);
```

**Key Features:**
- **Debounced saves** (300ms) to reduce database writes
- Automatic localStorage fallback on Supabase errors
- User/document isolation via composite keys
- Graceful handling of corrupted localStorage data

**API:**
```typescript
// Load outline for a user/document pair
const outline = await loadOutline(
  userId: string,
  docId: string
): Promise<OutlineState>

// Save outline (debounced)
await saveOutline(
  userId: string,
  docId: string,
  outline: OutlineState
): Promise<void>
```

**localStorage Key Format:**
```
outline-{userId}-{docId}
```

**Error Handling:**
- Supabase errors → falls back to localStorage
- localStorage quota exceeded → logs warning, continues in-memory
- Corrupted JSON → returns default empty outline
- All errors logged with `[outlineService]` prefix

---

### 3. Battle Service (`battleService.ts`)

**Purpose:** Track Battle Mode sessions including authored questions, answers, and scoring results.

**Database Schema:**
```sql
CREATE TABLE battle_sessions (
  user_id UUID NOT NULL,
  document_id UUID NOT NULL,
  phase INTEGER NOT NULL CHECK (phase IN (1, 2, 3)),
  accepted_questions JSONB DEFAULT '[]',
  answers JSONB DEFAULT '{}',
  results JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, document_id)
);
```

**Key Features:**
- Stores complete battle state including phase progression
- Preserves complex nested data (questions, answers, peer comparisons)
- Automatic localStorage fallback
- Returns `null` when no session exists (vs. default object)

**API:**
```typescript
// Load most recent battle session
const battle = await loadBattle(
  userId: string,
  docId: string
): Promise<BattleState | null>

// Save battle session
await saveBattle(
  userId: string,
  docId: string,
  battle: BattleState
): Promise<void>
```

**localStorage Key Format:**
```
battle-{userId}-{docId}
```

**Error Handling:**
- Supabase errors → falls back to localStorage
- localStorage quota exceeded → logs warning, continues in-memory
- Corrupted JSON → returns `null`
- All errors logged with `[battleService]` prefix

---

## Fallback Mechanism

### Decision Flow

```
┌─────────────────────────────────────┐
│ Service Method Called               │
└──────────────┬──────────────────────┘
               │
               ▼
       ┌───────────────┐
       │ isMockMode()? │
       └───┬───────┬───┘
           │       │
          Yes      No
           │       │
           │       ▼
           │   ┌──────────────────┐
           │   │ Try Supabase     │
           │   └────┬─────────┬───┘
           │        │         │
           │     Success   Error
           │        │         │
           │        ▼         ▼
           │   ┌────────┐  ┌──────────────┐
           │   │ Return │  │ Log Warning  │
           │   │ Data   │  └──────┬───────┘
           │   └────────┘         │
           │                      ▼
           │              ┌───────────────────┐
           └─────────────►│ Try localStorage  │
                          └────┬──────────┬───┘
                               │          │
                            Success    Error
                               │          │
                               ▼          ▼
                          ┌────────┐  ┌──────────┐
                          │ Return │  │ Return   │
                          │ Data   │  │ Default  │
                          └────────┘  └──────────┘
```

### Implementation Pattern

All services follow this consistent pattern:

```typescript
export async function loadData(...): Promise<DataType> {
  // Check mock mode first
  if (isMockMode() || !supabase) {
    return loadFromLocalStorage(...);
  }

  try {
    // Attempt Supabase operation
    const { data, error } = await supabase
      .from('table_name')
      .select('*')
      // ... query details

    if (error || !data) {
      return defaultValue;
    }

    return transformData(data);
  } catch (err) {
    // Network error, timeout, etc.
    console.warn('[serviceName] Supabase failed, falling back:', err);
    return loadFromLocalStorage(...);
  }
}

function loadFromLocalStorage(...): DataType {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (err) {
    console.warn('[serviceName] localStorage read failed:', err);
    return defaultValue;
  }
}
```

---

## Testing Strategy

### Test Coverage

The test suite (`src/test/dataServices.test.ts`) verifies:

1. **Basic Functionality**
   - Document retrieval returns valid structure
   - Save/load round-trips preserve data
   - User/document isolation works correctly

2. **Fallback Mechanism**
   - Services work in mock mode (no Supabase)
   - localStorage is used when Supabase unavailable
   - Corrupted localStorage data handled gracefully

3. **Edge Cases**
   - localStorage quota exceeded
   - Invalid JSON in localStorage
   - Missing data returns appropriate defaults
   - Complex nested data structures preserved

4. **Data Validation**
   - Document structure validation
   - Type safety for all data structures

### Running Tests

```bash
# Run all tests
npm run test

# Run data services tests only
npm run test:run -- src/test/dataServices.test.ts

# Run tests in watch mode
npm run test -- src/test/dataServices.test.ts
```

### Test Results

All 19 tests pass, covering:
- 6 document service tests
- 7 outline service tests
- 8 battle service tests

---

## Configuration

### Environment Variables

```env
# .env (optional — app runs in Mock Mode without these)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Database Setup

If using Supabase, run these migrations:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  sections JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Outlines table
CREATE TABLE outlines (
  user_id UUID NOT NULL,
  document_id UUID NOT NULL,
  highlights JSONB DEFAULT '[]',
  pinned_questions JSONB DEFAULT '[]',
  engaged_provocations JSONB DEFAULT '[]',
  explain_text TEXT DEFAULT '',
  explain_round INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, document_id)
);

-- Battle sessions table
CREATE TABLE battle_sessions (
  user_id UUID NOT NULL,
  document_id UUID NOT NULL,
  phase INTEGER NOT NULL CHECK (phase IN (1, 2, 3)),
  accepted_questions JSONB DEFAULT '[]',
  answers JSONB DEFAULT '{}',
  results JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, document_id)
);

-- Indexes for performance
CREATE INDEX idx_outlines_user ON outlines(user_id);
CREATE INDEX idx_outlines_doc ON outlines(document_id);
CREATE INDEX idx_battles_user ON battle_sessions(user_id);
CREATE INDEX idx_battles_doc ON battle_sessions(document_id);
```

---

## Integration with React

### Usage in Components

```typescript
import { getDocument } from './services/documentService';
import { loadOutline, saveOutline } from './services/outlineService';
import { loadBattle, saveBattle } from './services/battleService';

// In a React component or hook
useEffect(() => {
  async function loadData() {
    const doc = await getDocument();
    const outline = await loadOutline(userId, doc.id);
    const battle = await loadBattle(userId, doc.id);
    
    // Update state...
  }
  
  loadData();
}, [userId]);

// Saving data
const handleSave = async () => {
  await saveOutline(userId, docId, outlineState);
  // Debounced — actual save happens 300ms later
};
```

### State Management

Services are designed to work with:
- React `useState` / `useReducer`
- Context API
- Any state management library

They are **framework-agnostic** — pure async functions with no React dependencies.

---

## Performance Considerations

### Debouncing

The outline service implements **300ms debouncing** on saves to prevent excessive database writes during rapid user interactions (e.g., typing in "Explain It Back" textarea).

### Caching

Currently, services do **not** implement caching. Each call fetches fresh data. Future enhancements could add:
- In-memory cache with TTL
- React Query integration
- Optimistic updates

### localStorage Limits

Browser localStorage typically has a **5-10MB limit**. The services handle quota exceeded errors gracefully, but for production use with many documents, consider:
- Implementing data cleanup strategies
- Using IndexedDB for larger datasets
- Periodic localStorage pruning

---

## Error Handling Philosophy

### Graceful Degradation

The services follow a **never-fail** philosophy:
- Network errors → fall back to localStorage
- localStorage errors → continue in-memory
- Corrupted data → return safe defaults
- All errors logged but never thrown to UI

### Logging Strategy

All errors are logged with service-specific prefixes:
```
[documentService] Supabase fetch failed, falling back to mock
[outlineService] localStorage write failed: QuotaExceededError
[battleService] Supabase load failed, falling back to localStorage
```

This makes debugging easier while keeping the console clean in production.

---

## Future Enhancements

### Planned Features

1. **Real-time Sync**
   - Use Supabase real-time subscriptions
   - Sync outline changes across devices
   - Collaborative study sessions

2. **Offline Queue**
   - Queue writes when offline
   - Sync when connection restored
   - Conflict resolution strategies

3. **Data Migration**
   - Migrate localStorage → Supabase on first login
   - Export/import functionality
   - Backup/restore capabilities

4. **Performance Optimization**
   - Implement request caching
   - Batch multiple saves
   - Lazy load document sections

5. **Analytics**
   - Track service performance
   - Monitor fallback frequency
   - Measure user engagement patterns

---

## Troubleshooting

### Common Issues

**Problem:** Data not persisting between sessions
- **Check:** Are Supabase credentials configured?
- **Check:** Is localStorage enabled in browser?
- **Solution:** Verify `.env` file or check browser settings

**Problem:** "QuotaExceededError" in console
- **Cause:** localStorage limit reached (5-10MB)
- **Solution:** Clear old data or implement cleanup strategy

**Problem:** Stale data after Supabase update
- **Cause:** No cache invalidation
- **Solution:** Refresh page or implement cache busting

**Problem:** Tests failing with localStorage errors
- **Cause:** jsdom environment differences
- **Solution:** Use the provided `makeLocalStorageMock()` helper

---

## Contributing

When modifying data services:

1. **Maintain the fallback pattern** — always support both modes
2. **Add tests** for new functionality
3. **Log errors** with service-specific prefixes
4. **Update this documentation** with schema changes
5. **Preserve type safety** — use TypeScript strictly

### Code Style

- Use `async/await` over promises
- Prefer early returns for error cases
- Keep functions small and focused
- Document complex logic with comments
- Follow existing naming conventions

---

## License

This implementation follows the project's MIT license and incorporates patterns from Microsoft Research's Promptions project (also MIT licensed).
