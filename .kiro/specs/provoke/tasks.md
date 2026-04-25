# Implementation Tasks — Scaffold (Provoke)

> **Spec-Driven Development with Kiro**
> All work follows Kiro's Requirements → Design → Tasks flow.
> The shared contracts (`src/types.ts`, `src/services/mockData.ts`, `src/lib/supabase.ts`) are agreed BEFORE branching.
> Each person works on their own branch. Merge order: A first (foundation), then B and C independently.

---

## Pre-work (all 3 people, ~30 min together)

- [ ] P0.1 Initialize Vite + React + TypeScript project: `npm create vite@latest . -- --template react-ts`
- [ ] P0.2 Install shared deps: `npm i @supabase/supabase-js`
- [ ] P0.3 Install dev deps: `npm i -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event fast-check jsdom`
- [ ] P0.4 Create `src/types.ts` — THE SHARED CONTRACT (all interfaces: AppState, Document, DocumentSection, Highlight, PinnedQuestion, BattleQuestion, BattleResult, InlineProvocation, GuardrailResult, OutlineState, BattleState, LensType, BattlePhase, AppMode)
- [ ] P0.5 Create `src/services/mockData.ts` — all hardcoded data (DOCUMENT, MOCK_LENS_QUESTIONS, MOCK_PROVOCATIONS, MOCK_EXPLAIN_PROVOCATIONS, MOCK_QUESTION_EVAL, MOCK_SCORES, MOCK_PEER_ANSWERS)
- [ ] P0.6 Create `src/styles/tokens.css` — CSS custom properties (palette, fonts, layout)
- [ ] P0.7 Add Google Fonts link in `index.html` (Fraunces, Newsreader, JetBrains Mono)
- [ ] P0.8 Create `src/reducer.ts` — AppState shape, all action types, initial state
- [ ] P0.9 Create `src/lib/supabase.ts` — Supabase client (null if no env vars)
- [ ] P0.10 Create `.env.example` with `VITE_SUPABASE_URL=` and `VITE_SUPABASE_ANON_KEY=`
- [ ] P0.11 Create `supabase/migrations/001_initial_schema.sql` — full DB schema from design.md
- [ ] P0.12 Git init, connect to GitHub remote, push initial commit with pre-work + .kiro directory

---

## Person A — Backend + Services + App Shell
**Branch:** `feature/services-and-shell`
**Depends on:** P0 only
**Delivers:** All services (AI + data + auth), Supabase integration, App.tsx, Header, reducer

### Why Person A goes first
Every service returns a `Promise<T>` with a mock fallback. Person B and C can import and call these services immediately — they always return data (mock data when Supabase is not connected). No one is blocked.

---

### A1: Supabase Setup + Auth

- [ ] A1.1 Create Supabase project (via dashboard), get URL + anon key
- [ ] A1.2 Run `supabase/migrations/001_initial_schema.sql` in Supabase SQL editor to create tables + RLS policies
- [ ] A1.3 Enable anonymous auth in Supabase dashboard (Authentication → Providers → Anonymous)
- [ ] A1.4 Create `src/hooks/useAuth.ts`:
  - `useAuth()` returns `{ user, loading, signInAnonymously, signOut }`
  - If `supabase` is null (Mock Mode): returns `{ user: { id: 'mock-user' }, loading: false, signInAnonymously: noop, signOut: noop }`
  - If `supabase` is connected: uses `supabase.auth.signInAnonymously()` on mount, listens to `onAuthStateChange`
- [ ] A1.5 Create `src/components/AuthGate.tsx`:
  - Wraps children — auto-signs-in anonymously on mount
  - Shows a brief loading spinner while auth resolves
  - In Mock Mode: renders children immediately

---

### A2: Data Services (Supabase CRUD)

- [ ] A2.1 Create `src/services/documentService.ts`:
  - `getDocument(docId?)`: Supabase → fetches from `documents` table. Mock → returns `DOCUMENT` from mockData.
  - Seed: insert the hardcoded React useEffect document into Supabase `documents` table

- [ ] A2.2 Create `src/services/outlineService.ts`:
  - `loadOutline(userId, docId)`: Supabase → `select * from outlines where user_id = $1 and document_id = $2`. Mock → read from localStorage key `outline-${docId}`
  - `saveOutline(userId, docId, outline)`: Supabase → upsert to `outlines`. Mock → write to localStorage.
  - Debounce saves (300ms) to avoid hammering the DB on every keystroke

- [ ] A2.3 Create `src/services/battleService.ts`:
  - `loadBattle(userId, docId)`: Supabase → fetch from `battle_sessions`. Mock → localStorage.
  - `saveBattle(userId, docId, battle)`: Supabase → upsert. Mock → localStorage.

- [ ] A2.4 Write tests for all 3 data services (mock mode path):
  - `documentService` returns a document with 3 sections
  - `outlineService` save/load round-trip
  - `battleService` save/load round-trip

---

### A3: Guardrail Service

- [ ] A3.1 Create `src/services/guardrailService.ts`:
  - `checkContent(text, studentText?)` → `GuardrailResult`
  - Block forbidden phrases: "the answer is", "correct answer", "final answer", "you should write", "the correct response"
  - Block verbatim student text continuation (> 5 word substring match)
  - Return `{ passed: true, sanitizedText: text }` for clean content
  - Return `{ passed: false, sanitizedText: fallback, blockedReason }` for blocked

- [ ] A3.2 Write unit tests (each forbidden phrase, clean pass, verbatim block, round-trip integrity)

- [ ] A3.3 Write property-based tests (fast-check):
  - Property 1: inject forbidden phrase → always blocked
  - Property 2: clean question → always passes, sanitizedText unchanged
  - Property 10: passing content round-trip integrity

---

### A4: AI Services (Lens, Explain Back, Question Evaluator, Answer Scorer)

- [ ] A4.1 Create `src/services/lensService.ts`:
  - `generateLensQuestions(docText, lensType)` → `Promise<string[]>`
  - Mock: returns `MOCK_LENS_QUESTIONS[lensType]`
  - Validates every string ends with "?"
  - Export `isMockMode(): boolean`

- [ ] A4.2 Create `src/services/explainBackService.ts`:
  - `generateProvocations(explanation, docContext, round)` → `Promise<string[]>`
  - Mock: returns `MOCK_EXPLAIN_PROVOCATIONS[round % 2]`
  - Empty/whitespace input → returns single prompt

- [ ] A4.3 Create `src/services/questionEvaluatorService.ts`:
  - `evaluateQuestion(question, docContext)` → `Promise<{accepted, message}>`
  - Mock: rule-based (reject recall starters, < 6 words, no "?")

- [ ] A4.4 Create `src/services/answerScorerService.ts`:
  - `scoreAnswer(question, answer, docContext)` → `Promise<{score, label, note}>`
  - Mock: returns `MOCK_SCORES[hash(question) % 3]`

- [ ] A4.5 Write unit tests for all 4 AI services
- [ ] A4.6 Write property-based tests: Property 3 (lens = questions), Property 5 (recall rejected), Property 6 (scorer no answer reveal)

---

### A5: App Shell + State

- [ ] A5.1 Create `src/reducer.ts` with full AppState reducer:
  - Actions: SET_MODE, SET_LENS, PIN_QUESTION, ADD_HIGHLIGHT, UPDATE_HIGHLIGHT_NOTE, ENGAGE_PROVOCATION, SET_EXPLAIN_TEXT, SET_EXPLAIN_PROVOCATIONS, INCREMENT_EXPLAIN_ROUND, SET_DRAFT_QUESTION, SET_QUESTION_STATUS, ADD_ACCEPTED_QUESTION, SET_ANSWER, SET_CURRENT_ANSWER_IDX, SET_BATTLE_RESULTS, SET_BATTLE_PHASE, RESET_SESSION, SET_USER

- [ ] A5.2 Create `src/hooks/useLocalStorage.ts`:
  - `useLocalStorage<T>(key, defaultValue)` → `[T, (val: T) => void]`
  - try/catch fallback to in-memory

- [ ] A5.3 Create `src/App.tsx`:
  - `useReducer` + `useAuth` + state hydration (from Supabase if connected, localStorage if not)
  - Persist state changes to outlineService/battleService
  - Render AuthGate → Header + (StudyMode | BattleMode)

- [ ] A5.4 Create `src/components/Header.tsx`:
  - "Scaffold" logo (Fraunces font)
  - Study / Battle tab switcher
  - Mock Mode badge when `isMockMode()` is true

- [ ] A5.5 Write tests: App renders, mode switching, mock mode badge, reset session

---

## Person B — Study Mode UI
**Branch:** `feature/study-mode`
**Depends on:** P0 pre-work only (imports services as black boxes — they return mock data)
**Delivers:** Full Study Mode — document reading, all 4 lenses, inline provocations, outline panel

### How B works independently
Person B imports from `src/services/*` and `src/types.ts`. All services return mock data even before Person A merges. B can stub `App.tsx` locally with a simple `useReducer` if A5 isn't ready yet.

---

### B1: Study Mode Layout

- [ ] B1.1 Create `src/components/StudyMode.tsx`:
  - Three-column CSS Grid: `200px | 1fr | 280px`
  - Left: ResourcesSidebar. Center: DocumentPanel. Right: OutlinePanel.
  - Mobile (< 768px): single column, sidebars behind toggles

- [ ] B1.2 Create `src/components/ResourcesSidebar.tsx`:
  - Hardcoded: "React useEffect & Strict Mode" (active state)
  - Paper background, ink text

- [ ] B1.3 Create `src/components/DocumentPanel.tsx`:
  - LensTabs at top
  - LensPanel when activeLens !== 'explain'
  - ExplainItBack when activeLens === 'explain'
  - DocumentReader below

---

### B2: Document Reader + Provocations

- [ ] B2.1 Create `src/components/DocumentReader.tsx`:
  - Renders 3 sections from DOCUMENT (mockData)
  - Newsreader font, max-width 680px
  - Pre-selected phrases rendered as `<span>` with ¿ marker + underline
  - Click ¿ phrase → opens ProvocationCard inline
  - Click non-provocation text → dispatches ADD_HIGHLIGHT
  - Engaged provocations show checkmark

- [ ] B2.2 Create `src/components/ProvocationCard.tsx`:
  - Props: provocation, isEngaged, onDismiss, onEngage
  - Displays the provocation question
  - "Dismiss" button, "I've thought about this" button
  - Paper background, rust border-left
  - Escape key dismisses

- [ ] B2.3 Write tests: renders sections, ¿ markers, click opens card, engage logs to outline, dismiss closes

---

### B3: Lens Tabs + Lens Panel (Promptions Pattern)

- [ ] B3.1 Create `src/components/LensTabs.tsx`:
  - 4 tabs: "What to Watch For", "Prerequisite Check", "Common Misconceptions", "Explain It Back"
  - Lens-specific accent colors
  - Click dispatches SET_LENS — Promptions pattern: option controls update output in-place
  - Keyboard accessible (arrow keys)

- [ ] B3.2 Create `src/components/LensPanel.tsx`:
  - Calls `lensService.generateLensQuestions()` on mount + lens change
  - Passes result through `guardrailService.checkContent()`
  - Renders questions with "Pin" button (dispatches PIN_QUESTION)
  - Loading state while service call in-flight

- [ ] B3.3 Write tests: 4 tabs render, click changes lens, questions render, pin works

---

### B4: Explain It Back Lens

- [ ] B4.1 Create `src/components/ExplainItBack.tsx`:
  - Textarea for student explanation
  - Submit button (disabled when empty/whitespace)
  - Calls `explainBackService.generateProvocations()`
  - Renders 1-3 provocation questions (not corrections)
  - Round counter ("Round 1", "Round 2")
  - "Revise" button re-enables textarea

- [ ] B4.2 Write tests: submit disabled when empty, provocations render, round increments, no corrections shown

---

### B5: Outline Panel

- [ ] B5.1 Create `src/components/OutlinePanel.tsx`:
  - 3 sections: Pinned Questions, Highlights, Engaged Provocations
  - Empty-state messages
  - "Enter Battle →" button at bottom

- [ ] B5.2 Create `src/components/PinnedQuestions.tsx`:
  - Each item: lens label (color-coded) + question text
  - "Mark done" checkbox (local visual state)

- [ ] B5.3 Create `src/components/Highlights.tsx`:
  - Each item: highlighted phrase + editable note input
  - Note change dispatches UPDATE_HIGHLIGHT_NOTE

- [ ] B5.4 Create `src/components/EngagedProvocations.tsx`:
  - Renders engaged provocation questions by id lookup

- [ ] B5.5 Write tests: empty states, pin appears, highlight appears, engage appears, "Enter Battle" dispatches SET_MODE

---

## Person C — Battle Mode + Kiro Files + Deploy
**Branch:** `feature/battle-mode`
**Depends on:** P0 pre-work only (imports services as black boxes)
**Delivers:** Full 3-phase Battle Mode, .kiro steering/hooks, README, Vercel deployment

### How C works independently
Same as B — imports services, stubs App.tsx if needed. Battle Mode is a self-contained feature with its own 3-phase state machine.

---

### C1: Battle Mode Shell

- [ ] C1.1 Create `src/components/BattleMode.tsx`:
  - BattleProgressBar + phase switch (AuthorPhase | BattlePhase | RevealPhase)
  - "← Back to Study" link

- [ ] C1.2 Create `src/components/BattleProgressBar.tsx`:
  - 3 steps: Author → Battle → Reveal
  - Active step: rust accent. Completed: checkmark.

---

### C2: Author Phase (Phase 1)

- [ ] C2.1 Create `src/components/AuthorPhase.tsx`:
  - Textarea + "Submit Question" button
  - Calls `questionEvaluatorService.evaluateQuestion()`
  - Accepted → green message + added to pool
  - Rejected → red message + rewrite instruction (never rewrites for student)
  - "Enter Battle" enabled when 3 accepted questions

- [ ] C2.2 Create `src/components/QuestionPool.tsx`:
  - Sidebar showing accepted questions + "X / 3" counter

- [ ] C2.3 Write tests: recall rejected, mechanism accepted, pool fills, enter battle at 3

---

### C3: Battle Phase (Phase 2)

- [ ] C3.1 Create `src/components/BattlePhase.tsx`:
  - One question at a time + typed-answer textarea
  - Word count ("12 / 15 words minimum")
  - "Next" disabled until >= 15 words
  - "Submit All" on last question when all answered
  - Calls `answerScorerService.scoreAnswer()` for each → dispatches SET_BATTLE_RESULTS

- [ ] C3.2 Write tests: word count, next disabled < 15, submit all calls scorer

---

### C4: Reveal Phase (Phase 3)

- [ ] C4.1 Create `src/components/RevealPhase.tsx`:
  - Score header: "Your score: X / 15"
  - Per-question cards: question, student answer, AI verdict (label + note), 2 mock peer answers
  - Verdict colors: Strong = green, Partial = bronze, Needs rigor = brick
  - "Play Again" button resets battle

- [ ] C4.2 Write tests: score renders, cards render, no correct answer revealed, play again resets

---

### C5: Kiro Steering + Hooks

- [ ] C5.1 Create `.kiro/steering/guardrails.md`:
  - Allowed: ask questions, flag gaps, point to source
  - Forbidden: answer, rewrite, summarize, complete student text
  - Forbidden phrases list + fallback format

- [ ] C5.2 Create `.kiro/steering/pedagogy.md`:
  - Active recall, productive struggle, source-grounded feedback
  - Cite Sarkar TED talk, Tools for Thought, Kapur productive failure

- [ ] C5.3 Create `.kiro/steering/product.md`:
  - Product definition, target users, 4 lenses, Battle Mode, principles

- [ ] C5.4 Create `.kiro/steering/ui.md`:
  - Design tokens, 3-column layout, Promptions pattern, scholarly aesthetic

- [ ] C5.5 Create `.kiro/hooks/guardrail-check.json`:
  - postToolUse hook: verify service files pass through guardrailService

- [ ] C5.6 Create `.kiro/hooks/lens-output-check.json`:
  - postToolUse hook: verify lens output strings end with "?"

---

### C6: README + Deploy

- [ ] C6.1 Create `README.md`:
  - Project name, thesis, research basis
  - Problem/solution, Kiro features used
  - How to run: `npm install && npm run dev`
  - How to test: `npm test -- --run`
  - Architecture diagram, Mock Mode explanation
  - Supabase setup instructions (optional — app works without it)

- [ ] C6.2 Create `vercel.json` (SPA rewrite rules)
- [ ] C6.3 Connect repo to Vercel, deploy
- [ ] C6.4 Create `.env.example` with all env vars documented
- [ ] C6.5 Create `DEMO.md` — 3-minute demo script

---

### C7: Demo Polish (after merge)

- [ ] C7.1 Full end-to-end demo journey (Study → Battle → Reveal)
- [ ] C7.2 Mock Mode badge visible throughout
- [ ] C7.3 Desktop layout (1440px) — no horizontal scroll
- [ ] C7.4 Run `npm run build` — no TypeScript errors
- [ ] C7.5 Run `npm test -- --run` — all tests pass

---

## Merge Order

1. **Person A merges first** — services + App shell + Supabase
2. **Person B and C merge independently** — no dependency between them
3. **After merge**: Person C runs C7 (demo polish) on merged main

## Parallel Work Guarantee

The 3-person split works because:
- `src/types.ts` is the shared contract — agreed in P0, no changes without team consent
- `src/services/mockData.ts` is the shared data — agreed in P0
- All services return `Promise<T>` with mock fallback — B and C never block on A
- B and C have zero code overlap (Study Mode vs Battle Mode are separate component trees)
- Supabase schema is created in P0 — A just wires it up, no schema changes during the sprint
