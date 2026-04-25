# Scaffold (Provoke) — AI Study Tool

> **"The AI never gives the answer. It only asks better questions."**

Scaffold is a document-centric active-learning web app built for the Kiro Spark Challenge. Students engage a study document through four AI-powered lenses that provoke thinking, then prove their understanding in a three-phase Battle Mode that rewards reasoning rigor over recall.

---

## What This App Does

| Mode | What happens |
|---|---|
| **Study Mode** | Read a document through 4 AI lenses. Click ¿ markers for inline provocations. Pin questions and highlights to your Outline. |
| **Battle Mode** | Author 3 questions (AI rejects shallow ones). Answer all questions with typed reasoning (min 15 words). See your score and peer answers. |

The AI **never** summarizes, answers, or rewrites student text. Every output is a question or a gap-flag.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Vite |
| Backend | Supabase (Postgres + Auth) |
| Styling | CSS custom properties (no UI framework) |
| Testing | Vitest + React Testing Library + fast-check |
| Deploy | Vercel |

**Mock Mode:** The app runs fully without Supabase credentials. All AI responses are deterministic hardcoded data. A "Mock Mode" badge appears in the header.

---

## Team Split

This project is built by 3 people in parallel. Each person works on their own branch.

| Person | Branch | Delivers |
|---|---|---|
| **Person A** | `feature/services-and-shell` | All services, Supabase, App shell, Header, reducer |
| **Person B** | `feature/study-mode` | Full Study Mode UI (lenses, document reader, outline) |
| **Person C** | `feature/battle-mode` | Full Battle Mode UI, Kiro files, README, deploy |

**Merge order:** A first → then B and C independently.

Person B and C can start immediately — all services return mock data even before A merges.

---

## Prerequisites

- Node.js v18+
- npm v9+
- Git

Optional (for Supabase backend):
- A free [Supabase](https://supabase.com) account

---

## Quick Start (Mock Mode — no Supabase needed)

```bash
# 1. Clone the repo
git clone https://github.com/pradeepreddyvv/contextWindow.git
cd contextWindow

# 2. Initialize the Vite project (if src/ doesn't exist yet)
npm create vite@latest . -- --template react-ts

# 3. Install dependencies
npm install
npm install @supabase/supabase-js
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event fast-check jsdom

# 4. Copy the env example (no values needed for Mock Mode)
cp .env.example .env

# 5. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The app runs in Mock Mode — no API keys required.

---

## Supabase Setup (Optional)

Only needed if you want real persistence across sessions/devices.

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/migrations/001_initial_schema.sql`
3. Go to **Authentication → Providers → Anonymous** and enable it
4. Copy your project URL and anon key into `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

5. Restart the dev server — the Mock Mode badge will disappear.

**📚 Detailed Setup Guides:**
- **[QUICK_START.md](./QUICK_START.md)** - Get up and running in 3 steps
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Complete Supabase configuration guide
- **[SIGN_UP_FIX_SUMMARY.md](./SIGN_UP_FIX_SUMMARY.md)** - Troubleshooting sign-up issues

**🧪 Test Your Setup:**
```bash
npm run test:supabase  # Verify Supabase connection
```

---

## Running Tests

```bash
# Run all tests once (CI mode)
npm test -- --run

# Watch mode (development)
npm test
```

Tests cover:
- Unit tests for all services (guardrail, lens, explain-back, question evaluator, answer scorer)
- Property-based tests with fast-check (100+ iterations each)
- Integration tests for full study and battle journeys
- localStorage round-trip tests

---

## Project Structure

```
contextWindow/
├── src/
│   ├── App.tsx                    ← root, useReducer, mode switch, auth gate
│   ├── types.ts                   ← ALL shared TypeScript interfaces (shared contract)
│   ├── reducer.ts                 ← AppState reducer + all action types
│   ├── lib/
│   │   └── supabase.ts            ← Supabase client (null if no env vars = Mock Mode)
│   ├── components/
│   │   ├── Header.tsx             ← logo, Study/Battle tabs, Mock Mode badge
│   │   ├── AuthGate.tsx           ← anonymous auth wrapper
│   │   ├── StudyMode.tsx          ← three-column layout
│   │   ├── DocumentPanel.tsx      ← center column (lens tabs + document)
│   │   ├── LensTabs.tsx           ← Promptions-style option controls
│   │   ├── LensPanel.tsx          ← active lens questions with Pin buttons
│   │   ├── ExplainItBack.tsx      ← textarea + provocation loop
│   │   ├── DocumentReader.tsx     ← document text with ¿ markers
│   │   ├── ProvocationCard.tsx    ← inline provocation (dismiss / engaged)
│   │   ├── OutlinePanel.tsx       ← right column (pins, highlights, provocations)
│   │   ├── BattleMode.tsx         ← battle wrapper
│   │   ├── AuthorPhase.tsx        ← Phase 1: question authoring
│   │   ├── BattlePhase.tsx        ← Phase 2: answer questions
│   │   └── RevealPhase.tsx        ← Phase 3: scores + peer answers
│   ├── services/
│   │   ├── mockData.ts            ← ALL hardcoded data (shared contract)
│   │   ├── guardrailService.ts    ← blocks forbidden AI output (synchronous)
│   │   ├── lensService.ts         ← generates lens questions
│   │   ├── explainBackService.ts  ← generates provocations from student text
│   │   ├── questionEvaluatorService.ts ← accepts/rejects student questions
│   │   ├── answerScorerService.ts ← scores answers on reasoning rigor
│   │   ├── documentService.ts     ← fetches document (Supabase or mock)
│   │   ├── outlineService.ts      ← saves/loads outline (Supabase or localStorage)
│   │   └── battleService.ts       ← saves/loads battle session
│   ├── hooks/
│   │   ├── useAuth.ts             ← Supabase auth or mock user
│   │   └── useLocalStorage.ts     ← safe localStorage hook
│   └── styles/
│       ├── tokens.css             ← CSS custom properties (palette, fonts, layout)
│       └── global.css
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql ← DB schema (run this in Supabase SQL editor)
├── .kiro/
│   ├── specs/provoke/             ← requirements.md, design.md, tasks.md
│   ├── steering/                  ← guardrails.md, pedagogy.md, product.md, ui.md
│   └── hooks/                     ← guardrail-check.json, lens-output-check.json
├── .env.example
├── index.html
├── vite.config.ts
└── vercel.json
```

---

## Shared Contracts (Read Before Coding)

Two files are the shared foundation — **do not change without team agreement:**

### `src/types.ts`
All TypeScript interfaces: `AppState`, `Highlight`, `PinnedQuestion`, `BattleQuestion`, `BattleResult`, `InlineProvocation`, `GuardrailResult`, `OutlineState`, `BattleState`, `LensType`, `BattlePhase`, `AppMode`.

### `src/services/mockData.ts`
All hardcoded demo data: `DOCUMENT`, `MOCK_LENS_QUESTIONS`, `MOCK_PROVOCATIONS`, `MOCK_EXPLAIN_PROVOCATIONS`, `MOCK_QUESTION_EVAL`, `MOCK_SCORES`, `MOCK_PEER_ANSWERS`.

---

## Person-by-Person Guide

### Person A — Backend + Services + App Shell

**Branch:** `feature/services-and-shell`

Your job is to build everything that B and C depend on. All your services must return mock data immediately so B and C are never blocked.

**Start here:**
1. Complete the Pre-work tasks (P0.1–P0.12) — project init, shared types, mock data, CSS tokens
2. Then work through A1 → A2 → A3 → A4 → A5 in order
3. Merge to `main` before B and C merge

**Key files you own:**
- `src/types.ts` (write first)
- `src/services/mockData.ts` (write second)
- `src/lib/supabase.ts`
- `src/hooks/useAuth.ts`
- `src/services/guardrailService.ts`
- `src/services/lensService.ts`
- `src/services/explainBackService.ts`
- `src/services/questionEvaluatorService.ts`
- `src/services/answerScorerService.ts`
- `src/services/documentService.ts`
- `src/services/outlineService.ts`
- `src/services/battleService.ts`
- `src/reducer.ts`
- `src/App.tsx`
- `src/components/Header.tsx`
- `src/components/AuthGate.tsx`

See full task list: `.kiro/specs/provoke/tasks.md` → sections P0 and A1–A5.

---

### Person B — Study Mode UI

**Branch:** `feature/study-mode`

You build the full Study Mode. Import services from `src/services/*` — they return mock data even before A merges. If `App.tsx` isn't ready, stub it locally with a simple `useReducer`.

**Start here:**
1. Pull the latest `main` (after P0 pre-work is committed)
2. Create your branch: `git checkout -b feature/study-mode`
3. Work through B1 → B2 → B3 → B4 → B5

**Key files you own:**
- `src/components/StudyMode.tsx`
- `src/components/ResourcesSidebar.tsx`
- `src/components/DocumentPanel.tsx`
- `src/components/LensTabs.tsx`
- `src/components/LensPanel.tsx`
- `src/components/ExplainItBack.tsx`
- `src/components/DocumentReader.tsx`
- `src/components/ProvocationCard.tsx`
- `src/components/OutlinePanel.tsx`
- `src/components/PinnedQuestions.tsx`
- `src/components/Highlights.tsx`
- `src/components/EngagedProvocations.tsx`

See full task list: `.kiro/specs/provoke/tasks.md` → sections B1–B5.

---

### Person C — Battle Mode + Deploy

**Branch:** `feature/battle-mode`

You build the full Battle Mode, plus README, Vercel deploy, and Kiro files. Same independence as B — import services as black boxes.

**Start here:**
1. Pull the latest `main` (after P0 pre-work is committed)
2. Create your branch: `git checkout -b feature/battle-mode`
3. Work through C1 → C2 → C3 → C4 → C5 → C6

**Key files you own:**
- `src/components/BattleMode.tsx`
- `src/components/BattleProgressBar.tsx`
- `src/components/AuthorPhase.tsx`
- `src/components/QuestionPool.tsx`
- `src/components/BattlePhase.tsx`
- `src/components/RevealPhase.tsx`
- `vercel.json`
- `DEMO.md`

After A merges, run C7 (demo polish) on merged `main`.

See full task list: `.kiro/specs/provoke/tasks.md` → sections C1–C7.

---

## Design System

### Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-paper` | `#F4EFE4` | Background |
| `--color-ink` | `#1B1A17` | Primary text |
| `--color-rust` | `#B54A1E` | Accent, CTAs |
| `--color-lens-watch` | `#2D6A4F` | "What to Watch For" (forest green) |
| `--color-lens-prereq` | `#3D405B` | "Prerequisite Check" (indigo) |
| `--color-lens-misc` | `#8B3A3A` | "Common Misconceptions" (brick) |
| `--color-lens-explain` | `#7B5E2A` | "Explain It Back" (bronze) |

### Fonts

| Token | Font | Usage |
|---|---|---|
| `--font-display` | Fraunces | Headings, logo |
| `--font-body` | Newsreader | Document reading text |
| `--font-ui` | JetBrains Mono | Labels, tabs, badges (ALL-CAPS) |

All three fonts are loaded from Google Fonts CDN in `index.html`.

### Layout

Study Mode uses a three-column CSS Grid:
```
| 200px (Resources) | flex (Document + Lens) | 280px (Outline) |
```
Mobile (< 768px): single column, sidebars behind toggles.

---

## Guardrail Rules

Every AI output passes through `guardrailService.checkContent()` before reaching the student.

**Blocked phrases (case-insensitive):**
- "the answer is"
- "correct answer"
- "final answer"
- "you should write"
- "the correct response"

**Also blocked:** any AI output that contains a verbatim substring of the student's text longer than 5 words.

**Fallback:** `"I can't give the answer. Here's a smaller provocation: [guiding question]."`

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER: Scaffold logo · [Study / Battle] tabs · Mock badge  │
├──────────┬──────────────────────────────┬───────────────────┤
│ RESOURCES│ DOCUMENT + LENS PANEL        │ OUTLINE           │
│          │                              │                   │
│ • React  │ [Watch For][Prereq][Misc]    │ Pinned Questions  │
│   useEff │ [Explain It Back]            │                   │
│          │ ─────────────────────────    │ Highlights        │
│          │ Lens questions (pin-able)    │                   │
│          │                              │ Engaged Provs     │
│          │ Document text               │                   │
│          │ with ¿ markers              │ [Enter Battle →]  │
└──────────┴──────────────────────────────┴───────────────────┘

Battle Mode:
Phase 1: Author 3 questions → AI accepts/rejects
Phase 2: Answer all questions (min 15 words each)
Phase 3: Scores + peer answers + AI verdicts
```

---

## Kiro Integration

This project uses Kiro's spec-driven development features:

| Feature | Location | Purpose |
|---|---|---|
| Spec | `.kiro/specs/provoke/` | requirements.md, design.md, tasks.md |
| Steering | `.kiro/steering/` | guardrails, pedagogy, product, UI rules |
| Hooks | `.kiro/hooks/` | Auto-verify guardrail integration on file edits |

The pedagogy is documented as code — the constraints aren't buried in prompts, they're enforced by hooks and verified by property-based tests.

---

## Build for Production

```bash
npm run build
```

Output goes to `dist/`. Deploy to Vercel by connecting the GitHub repo — `vercel.json` handles SPA routing.

---

## Contributing

1. Never push directly to `main`
2. Never change `src/types.ts` or `src/services/mockData.ts` without team agreement
3. All services must maintain the mock fallback path
4. Every AI output must pass through `guardrailService.checkContent()` before display
5. Run `npm test -- --run` before opening a PR — all tests must pass
6. Run `npm run build` before opening a PR — no TypeScript errors

---

## License

MIT
