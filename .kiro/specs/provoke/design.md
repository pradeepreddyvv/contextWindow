# Design Document — Scaffold (Provoke)

## Overview

Scaffold is a document-centric active-learning web app built with React + TypeScript (Vite) on the frontend (deployed to Vercel) and Supabase on the backend (auth, Postgres database, real-time subscriptions). It adapts Microsoft Research's Tools for Thought / Promptions architecture for student learning. Primary state lives in Supabase with localStorage as offline fallback.

**Research grounding:**
- Advait Sarkar TED talk: AI reduces critical thinking when it answers; "Tools for Thought" preserves it by asking.
- Microsoft Promptions: ephemeral UI controls steer AI output without appending new chat messages. We adapt this pattern for lens selection and option controls.

**Key inversion from the Promptions demo:** The Promptions "Clara" demo helps a professional extract efficiently. Scaffold inverts this — students need to *build* understanding, so every lens is an attention-director and understanding-checker, never a summarizer.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER: logo · "How it works" · [Study / Battle] tabs       │
├──────────┬──────────────────────────────┬───────────────────┤
│ RESOURCES│ MAIN READING                 │ OUTLINE           │
│          │                              │                   │
│ • doc 1  │ Doc title + subtitle         │ [empty state or]  │
│   (React │                              │                   │
│   useEff)│ Lens tabs: 4 lenses across   │ Pinned questions  │
│          │ ─────────────────────────    │ ─ Q1 [mark done]  │
│          │ Active lens panel            │ ─ Q2              │
│          │ (lens questions, pin-able)   │                   │
│          │                              │ Highlights        │
│          │ Document text with inline:   │ ─ "phrase" + note │
│          │ • highlightable phrases      │                   │
│          │ • ¿ provocation markers      │ Engaged provs     │
│          │ • expandable provocation     │                   │
│          │   cards                      │ [→ Enter battle]  │
└──────────┴──────────────────────────────┴───────────────────┘
```

### Battle Mode Layout

```
Phase 1:  [3-phase progress bar]
┌──────────────────────┬──────────────┐
│ Question author UI   │ Pool sidebar │
│ (textarea + AI eval) │              │
└──────────────────────┴──────────────┘

Phase 2:  Single-question view, typed-answer textarea,
          question nav (1 / 3), next / submit-all

Phase 3:  Score header + per-question reveal cards
          (your answer | peer answer | AI verdict)
```

---

## Component Tree

```
App.tsx                          ← global state (useReducer), mode switch
├── Header.tsx                   ← logo, Study/Battle tabs, Mock Mode badge
├── StudyMode.tsx                ← three-column layout wrapper
│   ├── ResourcesSidebar.tsx     ← document list (hardcoded 1 doc for MVP)
│   ├── DocumentPanel.tsx        ← center column
│   │   ├── LensTabs.tsx         ← 4 lens tab buttons (Promptions-style controls)
│   │   ├── LensPanel.tsx        ← active lens output (questions, pin buttons)
│   │   │   └── ExplainItBack.tsx ← special lens: textarea + provocation loop
│   │   └── DocumentReader.tsx   ← document text with ¿ markers + highlights
│   │       └── ProvocationCard.tsx ← inline provocation (dismiss / engaged)
│   └── OutlinePanel.tsx         ← right column
│       ├── PinnedQuestions.tsx
│       ├── Highlights.tsx
│       ├── EngagedProvocations.tsx
│       └── EnterBattleButton.tsx
└── BattleMode.tsx               ← battle wrapper
    ├── BattleProgressBar.tsx    ← 3-phase indicator
    ├── AuthorPhase.tsx          ← Phase 1: question authoring + AI eval
    │   └── QuestionPool.tsx     ← sidebar showing accepted questions
    ├── BattlePhase.tsx          ← Phase 2: answer each question
    └── RevealPhase.tsx          ← Phase 3: side-by-side reveal + scores
```

---

## State Model

All state lives in `AppState` managed by `useReducer` in `App.tsx`. Persisted fields are written to localStorage on every dispatch.

```typescript
// src/types.ts

export type AppMode = 'study' | 'battle';
export type LensType = 'watch' | 'prereq' | 'misc' | 'explain';
export type BattlePhase = 1 | 2 | 3;

export interface AppState {
  mode: AppMode;
  activeLens: LensType;
  selectedDoc: number;           // index into DOCUMENTS array (always 0 for MVP)
  showHelp: boolean;

  // Outline artifacts — populated only by student actions
  highlights: Highlight[];
  pinnedQuestions: PinnedQuestion[];
  resolvedProvocations: string[];  // provocation ids

  // Explain It Back
  explainText: string;
  explainProvocations: string[];
  explainRound: number;

  // Battle
  battlePhase: BattlePhase;
  draftQuestion: string;
  questionStatus: { ok: boolean; msg: string } | null;
  acceptedQuestions: BattleQuestion[];
  myAnswers: { [questionIdx: number]: string };
  currentAnswerIdx: number;
  battleResults: BattleResult[] | null;
}

export interface Highlight {
  id: string;
  text: string;       // the selected phrase
  note: string;       // student-editable
}

export interface PinnedQuestion {
  id: string;
  lensId: LensType;
  text: string;
}

export interface BattleQuestion {
  text: string;
  author: string;     // "You" or mock peer name
}

export interface BattleResult {
  question: BattleQuestion;
  myAnswer: string;
  score: number;      // 0–5
  verdict: {
    label: 'Strong reasoning' | 'Partial credit' | 'Needs rigor';
    color: string;    // CSS color token
    note: string;     // 1-sentence AI verdict
  };
  peerAnswers: { author: string; text: string }[];
}

// Provocation tied to a specific phrase in the document
export interface InlineProvocation {
  id: string;
  phraseText: string;       // the exact phrase in the document
  sectionIndex: number;     // 0, 1, or 2
  question: string;         // the provocation question
}

// Guardrail result
export interface GuardrailResult {
  passed: boolean;
  sanitizedText: string;
  blockedReason?: string;
}
```

---

## Supabase Backend

### Schema

```sql
-- Users: Supabase Auth handles this (email/magic-link or anonymous sessions)

-- Documents (hardcoded for MVP, extensible later)
create table documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  sections jsonb not null,        -- [{heading, body, provocations: [{phraseText, question}]}]
  created_at timestamptz default now()
);

-- Student outline entries (persisted per user per document)
create table outlines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  document_id uuid references documents(id),
  pinned_questions jsonb default '[]',
  highlights jsonb default '[]',
  engaged_provocations text[] default '{}',
  explain_text text default '',
  explain_round int default 0,
  updated_at timestamptz default now()
);

-- Battle sessions
create table battle_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  document_id uuid references documents(id),
  phase int default 1,            -- 1=author, 2=battle, 3=reveal
  accepted_questions jsonb default '[]',
  answers jsonb default '{}',
  results jsonb,
  created_at timestamptz default now()
);

-- Row Level Security: users can only read/write their own rows
alter table outlines enable row level security;
alter table battle_sessions enable row level security;
create policy "Users own their outlines" on outlines for all using (auth.uid() = user_id);
create policy "Users own their battles" on battle_sessions for all using (auth.uid() = user_id);
```

### Supabase Client

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null; // null = Mock Mode fallback
```

### Data Layer Pattern

Every service has a dual path:
1. **Supabase connected**: read/write from Postgres via Supabase client
2. **Mock Mode** (no env vars): use localStorage + hardcoded mock data

This means the app works fully offline for demo/judging without Supabase credentials.

---

## Services

All services are pure functions. In Mock Mode they return hardcoded data. When Supabase is connected, they persist to the database. The interface is designed so a real LLM call can be swapped in by replacing the mock branch.

### `src/services/lensService.ts`

```typescript
generateLensQuestions(
  documentText: string,
  lensType: 'watch' | 'prereq' | 'misc'
): Promise<string[]>
// Returns 3–5 questions. Never answers, never summarizes.
// Mock: returns MOCK_LENS_QUESTIONS[lensType]
```

### `src/services/explainBackService.ts`

```typescript
generateProvocations(
  studentExplanation: string,
  documentContext: string
): Promise<string[]>
// Returns 1–3 provocation questions targeting gaps.
// Never rewrites or corrects. Never reveals the answer.
// Mock: returns MOCK_EXPLAIN_PROVOCATIONS[round % 2]
```

### `src/services/questionEvaluatorService.ts`

```typescript
evaluateQuestion(
  question: string,
  documentContext: string
): Promise<{ accepted: boolean; message: string }>
// Rejects recall questions. Accepts mechanism-reasoning questions.
// Mock: rule-based check on first word + length + ends with "?"
```

### `src/services/answerScorerService.ts`

```typescript
scoreAnswer(
  question: string,
  answer: string,
  documentContext: string
): Promise<{ score: number; label: string; note: string; missedElements?: string[] }>
// Scores 0–5 on reasoning rigor. Never reveals correct answer.
// Mock: returns MOCK_SCORES[questionIdx % 3]
```

### `src/services/guardrailService.ts`

```typescript
checkContent(text: string, studentText?: string): GuardrailResult
// Synchronous, pure function.
// Blocks: forbidden phrases, verbatim student text continuation, statements-not-questions in lens context.
```

### `src/services/mockData.ts`

All hardcoded data for Mock Mode:

```typescript
export const DOCUMENT: { title: string; sections: DocumentSection[] }
// React useEffect and Strict Mode — 3 sections with inline provocation phrases marked

export const MOCK_LENS_QUESTIONS: Record<'watch' | 'prereq' | 'misc', string[]>
// 3–5 questions per lens type

export const MOCK_PROVOCATIONS: InlineProvocation[]
// 2–3 per section, tied to specific phrases

export const MOCK_EXPLAIN_PROVOCATIONS: string[][]
// [round0_provocations, round1_provocations]

export const MOCK_QUESTION_EVAL: { accepted: boolean; message: string }[]
// Deterministic responses for demo questions

export const MOCK_SCORES: { score: number; label: string; note: string }[]
// 3 score entries cycling through Strong / Partial / Needs rigor

export const MOCK_PEER_ANSWERS: { author: string; text: string }[][]
// Per-question peer answers for Reveal phase
```

---

## Data Flow

### Study Mode — Lens Selection

```
Student clicks lens tab
  → dispatch SET_LENS
  → LensPanel calls lensService.generateLensQuestions(doc, lensType)
  → guardrailService.checkContent(result)
  → render questions with Pin buttons
  → Student clicks Pin → dispatch PIN_QUESTION → Outline updates
```

### Study Mode — Inline Provocation

```
Student clicks ¿-marked phrase
  → ProvocationCard opens inline (no navigation)
  → Student clicks "I've thought about this"
  → dispatch ENGAGE_PROVOCATION
  → Outline "Engaged Provocations" section updates
  → phrase visual state changes to "engaged"
```

### Study Mode — Explain It Back

```
Student types explanation → submits
  → explainBackService.generateProvocations(text, doc)
  → guardrailService.checkContent(result)
  → render 1–3 provocation questions
  → dispatch INCREMENT_EXPLAIN_ROUND
  → Student revises → repeat
```

### Battle Mode — Phase 1

```
Student types question → submits
  → questionEvaluatorService.evaluateQuestion(q, doc)
  → guardrailService.checkContent(result.message)
  → if accepted: dispatch ADD_ACCEPTED_QUESTION, show in pool
  → if rejected: show rejection message, student rewrites
  → when acceptedQuestions.length === 3: enable "Enter Battle" → Phase 2
```

### Battle Mode — Phase 2 → 3

```
Student answers each question (min 15 words)
  → dispatch SET_ANSWER
  → Student clicks "Submit All"
  → answerScorerService.scoreAnswer() for each answer
  → guardrailService.checkContent() on each verdict
  → dispatch SET_BATTLE_RESULTS → Phase 3
```

---

## Promptions Pattern Adaptation

The Promptions repo (`/Users/PradeepReddy/Documents/reference/Promptions`) uses `BasicOptions` with `SingleOptionControl`, `MultiOptionControl`, and `BinaryOptionControl` rendered as radio buttons, checkboxes, and toggles. We adapt this pattern for lens selection:

- Each lens tab is a `SingleOptionControl` — selecting it updates the active lens and triggers a new AI call
- The controls update the AI output in-place (same panel, new content) rather than appending a new chat message
- We do NOT import Fluent UI — we implement the same interaction pattern with our own design system (paper/ink palette, Fraunces/Newsreader fonts)

Reference files to study:
- `/Users/PradeepReddy/Documents/reference/Promptions/packages/promptions-ui/src/basicOptions.tsx`
- `/Users/PradeepReddy/Documents/reference/Promptions/packages/promptions-ui/src/types.ts`
- `/Users/PradeepReddy/Documents/reference/Promptions/packages/promptions-llm/src/`

---

## Design System

```css
/* Palette */
--color-paper:    #F4EFE4;   /* background */
--color-ink:      #1B1A17;   /* primary text */
--color-rust:     #B54A1E;   /* accent, CTAs */
--color-lens-watch:   #2D6A4F;  /* forest green */
--color-lens-prereq:  #3D405B;  /* indigo */
--color-lens-misc:    #8B3A3A;  /* brick */
--color-lens-explain: #7B5E2A;  /* bronze */
--color-muted:    #6B6760;   /* secondary text */
--color-border:   #D9D3C7;   /* dividers */

/* Typography */
--font-display: 'Fraunces', Georgia, serif;      /* headings */
--font-body:    'Newsreader', Georgia, serif;    /* document text */
--font-ui:      'JetBrains Mono', monospace;     /* labels, all-caps */

/* Layout */
--sidebar-width:  200px;
--outline-width:  280px;
--doc-max-width:  680px;
```

---

## Correctness Properties

### Property 1: Guardrail blocks forbidden phrases
For any AI output containing "the answer is", "correct answer", "final answer", "you should write", or "the correct response" → `GuardrailResult.passed === false`.

### Property 2: Guardrail passes clean questions
For any string that is phrased as a question, contains no forbidden phrases, and does not verbatim continue student text → `GuardrailResult.passed === true` and `sanitizedText === input`.

### Property 3: Lens output is always questions
For any lens type (watch, prereq, misc), every string in the returned array SHALL end with "?" — no statements allowed.

### Property 4: Explain It Back never rewrites
For any student explanation, the provocations returned by `explainBackService` SHALL NOT contain any substring of the student's original text longer than 5 words.

### Property 5: Question evaluator rejects recall starters
For any question beginning with "What is", "What are", "Define", "List", or "Name" (without a scenario clause) → `evaluateQuestion` returns `{ accepted: false }`.

### Property 6: Answer scorer never reveals correct answer
For any answer, the `note` field in the scorer result SHALL NOT contain the phrase "the correct answer is" or "the right answer".

### Property 7: Outline is student-only
The Outline state (highlights, pinnedQuestions, resolvedProvocations) SHALL only be modified by explicit student action dispatches — never by service call results.

### Property 8: Points/score monotonically non-decreasing
For any sequence of answer submissions in Battle Phase 2, the cumulative score SHALL never decrease between submissions.

### Property 9: Mock mode idempotence
Calling any service function with the same inputs in Mock Mode SHALL return structurally identical results on every call.

### Property 10: Guardrail round-trip integrity
For any text where `passed === true`, `sanitizedText === originalInput` — the guardrail SHALL NOT modify passing content.

---

## Testing Strategy

**Framework:** Vitest + React Testing Library + fast-check (property-based)

**Unit tests:** Each service function tested with specific examples covering happy path, each blocked phrase, edge cases (empty string, whitespace-only, exactly 15 words).

**Property-based tests (fast-check, 100+ iterations each):**
- Property 1: inject forbidden phrase at random position → always blocked
- Property 2: generate clean question strings → always pass, sanitizedText unchanged
- Property 3: generate lens outputs → every item ends with "?"
- Property 5: generate questions starting with recall starters → always rejected
- Property 9: call mock services N times → structurally identical results

**Integration tests:**
- Full study journey: load doc → select lens → pin question → click provocation → engage → outline updates
- Full battle journey: author 3 questions (1 rejected, rewritten, accepted) → answer all → reveal scores
- localStorage round-trip: save state → reload → state restored
- Supabase round-trip: save outline → reload → state restored from DB

---

## API Contracts (Shared Interface for Parallel Work)

These are the contracts between Person A (services/backend), Person B (Study Mode UI), and Person C (Battle Mode UI). All three people code against these interfaces — no one blocks the other.

### Data Services (Person A builds, B and C consume)

```typescript
// src/services/documentService.ts
export async function getDocument(docId?: string): Promise<Document>
// Returns the study document. Supabase: fetches from documents table. Mock: returns DOCUMENT from mockData.

// src/services/outlineService.ts
export async function loadOutline(userId: string, docId: string): Promise<OutlineState>
export async function saveOutline(userId: string, docId: string, outline: OutlineState): Promise<void>
// Supabase: upserts to outlines table. Mock: reads/writes localStorage.

// src/services/battleService.ts
export async function loadBattle(userId: string, docId: string): Promise<BattleState | null>
export async function saveBattle(userId: string, docId: string, battle: BattleState): Promise<void>
// Supabase: upserts to battle_sessions table. Mock: reads/writes localStorage.

// src/lib/supabase.ts
export const supabase: SupabaseClient | null
// null when env vars are missing = Mock Mode
export function isMockMode(): boolean
```

### AI Services (Person A builds, B and C consume)

```typescript
// src/services/lensService.ts
export async function generateLensQuestions(docText: string, lens: LensType): Promise<string[]>

// src/services/explainBackService.ts
export async function generateProvocations(explanation: string, docContext: string, round: number): Promise<string[]>

// src/services/questionEvaluatorService.ts
export async function evaluateQuestion(question: string, docContext: string): Promise<{accepted: boolean; message: string}>

// src/services/answerScorerService.ts
export async function scoreAnswer(question: string, answer: string, docContext: string): Promise<{score: number; label: string; note: string}>

// src/services/guardrailService.ts
export function checkContent(text: string, studentText?: string): GuardrailResult
```

### Auth (Person A builds, App.tsx consumes)

```typescript
// src/hooks/useAuth.ts
export function useAuth(): {
  user: User | null;
  loading: boolean;
  signInAnonymously: () => Promise<void>;
  signOut: () => Promise<void>;
}
// Supabase: uses supabase.auth. Mock: returns a fake user { id: 'mock-user' }.
```

### State Contract (all 3 people share)

```typescript
// src/types.ts — THE SHARED CONTRACT
// Person A writes this first. B and C import from it. No changes without team agreement.
// Contains: AppState, Highlight, PinnedQuestion, BattleQuestion, BattleResult,
//           InlineProvocation, GuardrailResult, Document, OutlineState, BattleState,
//           LensType, BattlePhase, AppMode
```

---

## File Structure

```
contextWindow/
├── src/
│   ├── App.tsx                    ← root, useReducer, mode switch, auth gate
│   ├── types.ts                   ← all TypeScript interfaces (SHARED CONTRACT)
│   ├── reducer.ts                 ← AppState reducer + action types
│   ├── lib/
│   │   ├── supabase.ts            ← Supabase client init (null if no env vars)
│   │   └── database.types.ts      ← Generated Supabase types
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── AuthGate.tsx            ← anonymous auth or email login via Supabase
│   │   ├── StudyMode.tsx
│   │   ├── ResourcesSidebar.tsx
│   │   ├── DocumentPanel.tsx
│   │   ├── LensTabs.tsx           ← Promptions-style option controls
│   │   ├── LensPanel.tsx
│   │   ├── ExplainItBack.tsx
│   │   ├── DocumentReader.tsx
│   │   ├── ProvocationCard.tsx
│   │   ├── OutlinePanel.tsx
│   │   ├── PinnedQuestions.tsx
│   │   ├── Highlights.tsx
│   │   ├── EngagedProvocations.tsx
│   │   ├── BattleMode.tsx
│   │   ├── BattleProgressBar.tsx
│   │   ├── AuthorPhase.tsx
│   │   ├── QuestionPool.tsx
│   │   ├── BattlePhase.tsx
│   │   └── RevealPhase.tsx
│   ├── services/
│   │   ├── lensService.ts
│   │   ├── explainBackService.ts
│   │   ├── questionEvaluatorService.ts
│   │   ├── answerScorerService.ts
│   │   ├── guardrailService.ts
│   │   ├── outlineService.ts       ← CRUD for outlines (Supabase or localStorage)
│   │   ├── battleService.ts        ← CRUD for battle sessions (Supabase or localStorage)
│   │   ├── documentService.ts      ← fetch document (Supabase or mock)
│   │   └── mockData.ts
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   └── useAuth.ts              ← Supabase auth hook
│   └── styles/
│       ├── tokens.css             ← CSS custom properties (palette, fonts)
│       └── global.css
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql  ← DB schema (documents, outlines, battle_sessions)
├── .kiro/
│   ├── specs/provoke/
│   │   ├── requirements.md
│   │   ├── design.md
│   │   └── tasks.md
│   ├── steering/
│   │   ├── guardrails.md
│   │   ├── pedagogy.md
│   │   ├── product.md
│   │   └── ui.md
│   └── hooks/
│       ├── guardrail-check.json
│       └── lens-output-check.json
├── .env.example                    ← VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
├── index.html
├── vite.config.ts
├── tsconfig.json
├── vercel.json
└── README.md
```
