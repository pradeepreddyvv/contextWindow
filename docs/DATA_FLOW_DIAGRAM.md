# Data Services Flow Diagram

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         React Application                           │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │   Study      │  │   Battle     │  │   Outline    │            │
│  │  Component   │  │  Component   │  │  Component   │            │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘            │
│         │                  │                  │                     │
│         └──────────────────┴──────────────────┘                     │
│                            │                                        │
└────────────────────────────┼────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Data Services Layer                            │
│                                                                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐ │
│  │  documentService │  │  outlineService  │  │  battleService   │ │
│  │                  │  │                  │  │                  │ │
│  │  • getDocument() │  │  • loadOutline() │  │  • loadBattle()  │ │
│  │  • validate()    │  │  • saveOutline() │  │  • saveBattle()  │ │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘ │
│           │                     │                      │           │
└───────────┼─────────────────────┼──────────────────────┼───────────┘
            │                     │                      │
            └─────────────────────┴──────────────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │   Mode Detection        │
                    │   (isMockMode?)         │
                    └────────┬────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
               Yes                       No
                │                         │
                ▼                         ▼
    ┌───────────────────┐    ┌───────────────────────┐
    │   Mock Mode       │    │   Production Mode     │
    │   (Development)   │    │   (Supabase)          │
    └─────────┬─────────┘    └─────────┬─────────────┘
              │                         │
              ▼                         ▼
    ┌───────────────────┐    ┌───────────────────────┐
    │  localStorage     │    │  Try Supabase         │
    │  + Mock Data      │    │                       │
    └───────────────────┘    └─────────┬─────────────┘
                                        │
                            ┌───────────┴───────────┐
                            │                       │
                        Success                  Error
                            │                       │
                            ▼                       ▼
                    ┌───────────────┐    ┌──────────────────┐
                    │  Return Data  │    │  Log Warning     │
                    └───────────────┘    └────────┬─────────┘
                                                   │
                                                   ▼
                                        ┌──────────────────┐
                                        │  localStorage    │
                                        │  Fallback        │
                                        └────────┬─────────┘
                                                 │
                                    ┌────────────┴────────────┐
                                    │                         │
                                Success                    Error
                                    │                         │
                                    ▼                         ▼
                            ┌───────────────┐    ┌──────────────────┐
                            │  Return Data  │    │  Return Default  │
                            └───────────────┘    └──────────────────┘
```

## Service-Specific Data Flows

### Document Service Flow

```
User Opens App
      │
      ▼
getDocument(docId?)
      │
      ├─→ isMockMode? ──Yes──→ Return MOCK_DOCUMENT
      │
      └─→ No
          │
          ▼
    Try Supabase
    SELECT * FROM documents
    WHERE id = docId
          │
          ├─→ Success ──→ Transform & Return
          │
          └─→ Error
              │
              ▼
        Log Warning
              │
              ▼
    Return MOCK_DOCUMENT
```

### Outline Service Flow (Load)

```
Component Mounts
      │
      ▼
loadOutline(userId, docId)
      │
      ├─→ isMockMode? ──Yes──→ loadFromLocalStorage()
      │                              │
      │                              ├─→ Success ──→ Return Data
      │                              └─→ Error ──→ Return DEFAULT_OUTLINE
      │
      └─→ No
          │
          ▼
    Try Supabase
    SELECT * FROM outlines
    WHERE user_id = userId
      AND document_id = docId
          │
          ├─→ Success ──→ Transform & Return
          │
          └─→ Error
              │
              ▼
        Log Warning
              │
              ▼
    loadFromLocalStorage()
              │
              ├─→ Success ──→ Return Data
              └─→ Error ──→ Return DEFAULT_OUTLINE
```

### Outline Service Flow (Save)

```
User Types/Interacts
      │
      ▼
saveOutline(userId, docId, outline)
      │
      ▼
Clear Previous Timer
      │
      ▼
Set 300ms Timer ─────────────────┐
                                  │
                    (300ms delay) │
                                  │
                                  ▼
                    ┌─────────────────────┐
                    │ Timer Fires         │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
         isMockMode?                         No
                │                             │
               Yes                            ▼
                │                    Try Supabase
                ▼                    UPSERT INTO outlines
    saveToLocalStorage()                     │
                │                ┌───────────┴───────────┐
                │                │                       │
                ▼            Success                  Error
        localStorage.setItem()   │                       │
                │                ▼                       ▼
                ├─→ Success  Return              Log Warning
                │                                        │
                └─→ Error                                ▼
                    │                        saveToLocalStorage()
                    ▼                                    │
              Log Warning                                ├─→ Success
                                                         └─→ Error
                                                             │
                                                             ▼
                                                       Log Warning
```

### Battle Service Flow

```
User Enters Battle Mode
      │
      ▼
loadBattle(userId, docId)
      │
      ├─→ isMockMode? ──Yes──→ loadFromLocalStorage()
      │                              │
      │                              ├─→ Success ──→ Return Data
      │                              └─→ Error ──→ Return null
      │
      └─→ No
          │
          ▼
    Try Supabase
    SELECT * FROM battle_sessions
    WHERE user_id = userId
      AND document_id = docId
    ORDER BY created_at DESC
    LIMIT 1
          │
          ├─→ Success ──→ Transform & Return
          │
          └─→ Error
              │
              ▼
        Log Warning
              │
              ▼
    loadFromLocalStorage()
              │
              ├─→ Success ──→ Return Data
              └─→ Error ──→ Return null

─────────────────────────────────────────────

User Submits Answer
      │
      ▼
saveBattle(userId, docId, battle)
      │
      ├─→ isMockMode? ──Yes──→ saveToLocalStorage()
      │                              │
      │                              ├─→ Success
      │                              └─→ Error ──→ Log Warning
      │
      └─→ No
          │
          ▼
    Try Supabase
    UPSERT INTO battle_sessions
          │
          ├─→ Success ──→ Return
          │
          └─→ Error
              │
              ▼
        Log Warning
              │
              ▼
    saveToLocalStorage()
              │
              ├─→ Success
              └─→ Error ──→ Log Warning
```

## Error Handling Flow

```
Any Service Method Called
      │
      ▼
Try Primary Storage
      │
      ├─→ Success ──→ Return Data ──→ [END]
      │
      └─→ Error
          │
          ├─→ Network Error
          ├─→ Auth Error
          ├─→ Query Error
          ├─→ Timeout
          │
          ▼
    console.warn('[service] Error:', err)
          │
          ▼
    Try Fallback Storage
          │
          ├─→ Success ──→ Return Data ──→ [END]
          │
          └─→ Error
              │
              ├─→ QuotaExceededError
              ├─→ JSON Parse Error
              ├─→ localStorage Disabled
              │
              ▼
        console.warn('[service] Fallback failed:', err)
              │
              ▼
        Return Safe Default
              │
              ├─→ Document: MOCK_DOCUMENT
              ├─→ Outline: DEFAULT_OUTLINE
              └─→ Battle: null
              │
              ▼
            [END]
```

## localStorage Key Structure

```
localStorage
├── outline-user-1-doc-1
│   └── {
│         "highlights": [...],
│         "pinnedQuestions": [...],
│         "engagedProvocations": [...],
│         "explainText": "...",
│         "explainRound": 2
│       }
│
├── outline-user-1-doc-2
│   └── { ... }
│
├── outline-user-2-doc-1
│   └── { ... }
│
├── battle-user-1-doc-1
│   └── {
│         "phase": 2,
│         "acceptedQuestions": [...],
│         "answers": { "0": "...", "1": "..." },
│         "results": null
│       }
│
└── battle-user-2-doc-1
    └── { ... }
```

## Database Schema Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                        Supabase                             │
│                                                             │
│  ┌──────────────────┐                                      │
│  │   documents      │                                      │
│  ├──────────────────┤                                      │
│  │ id (PK)          │◄─────────┐                          │
│  │ title            │           │                          │
│  │ subtitle         │           │                          │
│  │ sections (JSONB) │           │                          │
│  │ created_at       │           │                          │
│  └──────────────────┘           │                          │
│                                  │                          │
│  ┌──────────────────┐           │  ┌──────────────────┐   │
│  │   outlines       │           │  │ battle_sessions  │   │
│  ├──────────────────┤           │  ├──────────────────┤   │
│  │ user_id (PK)     │           │  │ user_id (PK)     │   │
│  │ document_id (PK) │───────────┘  │ document_id (PK) │───┘
│  │ highlights       │              │ phase            │
│  │ pinned_questions │              │ accepted_qs      │
│  │ engaged_provs    │              │ answers          │
│  │ explain_text     │              │ results          │
│  │ explain_round    │              │ created_at       │
│  │ updated_at       │              └──────────────────┘
│  └──────────────────┘                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Component Integration Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                    React Component                          │
│                                                             │
│  useEffect(() => {                                          │
│    async function loadData() {                              │
│      const doc = await getDocument();                       │
│      const outline = await loadOutline(userId, doc.id);     │
│      const battle = await loadBattle(userId, doc.id);       │
│                                                             │
│      setDocument(doc);                                      │
│      setOutline(outline);                                   │
│      setBattle(battle);                                     │
│    }                                                        │
│    loadData();                                              │
│  }, [userId]);                                              │
│                                                             │
│  const handleSave = async () => {                           │
│    await saveOutline(userId, docId, outline);               │
│    // Debounced — actual save happens 300ms later          │
│  };                                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Services                            │
│                                                             │
│  • Never throw errors                                       │
│  • Always return valid data                                 │
│  • Log all errors to console                                │
│  • Automatic fallback handling                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Performance Characteristics

```
Operation Timeline (Production Mode with Supabase)
═══════════════════════════════════════════════════

getDocument()
├─ Supabase query: ~50-200ms
├─ Transform data: ~1ms
└─ Total: ~51-201ms

loadOutline()
├─ Supabase query: ~50-200ms
├─ Transform data: ~1ms
└─ Total: ~51-201ms

saveOutline() [First Call]
├─ Debounce timer: 300ms
├─ Supabase upsert: ~50-200ms
└─ Total: ~350-500ms

saveOutline() [Subsequent Calls within 300ms]
├─ Cancel previous timer: <1ms
├─ Set new timer: <1ms
└─ Total: ~1ms (actual save happens 300ms after last call)

loadBattle()
├─ Supabase query: ~50-200ms
├─ Transform data: ~1ms
└─ Total: ~51-201ms

saveBattle()
├─ Supabase upsert: ~50-200ms
└─ Total: ~50-200ms

─────────────────────────────────────────────────

Operation Timeline (Mock Mode with localStorage)
═══════════════════════════════════════════════════

getDocument()
└─ Return mock: <1ms

loadOutline()
├─ localStorage.getItem(): ~1ms
├─ JSON.parse(): ~1ms
└─ Total: ~2ms

saveOutline() [First Call]
├─ Debounce timer: 300ms
├─ localStorage.setItem(): ~1ms
└─ Total: ~301ms

loadBattle()
├─ localStorage.getItem(): ~1ms
├─ JSON.parse(): ~1ms
└─ Total: ~2ms

saveBattle()
├─ localStorage.setItem(): ~1ms
└─ Total: ~1ms
```

## Concurrency Handling

```
Multiple saveOutline() Calls
═══════════════════════════════════════════════════

Time: 0ms
User types: "u"
  └─→ saveOutline() called
      └─→ Timer set for 300ms

Time: 50ms
User types: "s"
  └─→ saveOutline() called
      ├─→ Previous timer cancelled
      └─→ New timer set for 300ms

Time: 100ms
User types: "e"
  └─→ saveOutline() called
      ├─→ Previous timer cancelled
      └─→ New timer set for 300ms

Time: 150ms
User types: "E"
  └─→ saveOutline() called
      ├─→ Previous timer cancelled
      └─→ New timer set for 300ms

Time: 450ms (300ms after last call)
  └─→ Timer fires
      └─→ Actual save to database
          └─→ Data: "useE"

Result: Only ONE database write for 4 keystrokes
```

## Legend

```
Symbols Used:
─────────────
│   Vertical connection
├   Branch point
└   End of branch
▼   Flow direction
◄   Reference/relationship
┌─┐ Box/container
═   Timeline/sequence
```

## Notes

1. **All flows are non-blocking** - Services return immediately with valid data
2. **Errors never propagate to UI** - Always handled internally
3. **Debouncing is automatic** - No need to implement in components
4. **Mode detection is transparent** - Components don't need to know which mode
5. **localStorage keys are namespaced** - Prevents collisions between users/documents
