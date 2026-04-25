# ASK — Active Learning Study Tool

> **"The AI never gives the answer. It only asks better questions."**

ASK is a document-centric active-learning web app built for the Kiro Spark Challenge. Students upload any document (PDF, URL, or paste text), then engage with it through AI-powered lenses that provoke thinking. Battle Mode rewards reasoning rigor over recall.

---

## Features

| Mode | What happens |
|---|---|
| **Document Upload** | Upload a PDF, paste a URL, or paste text to begin studying. |
| **Study Mode** | Read the document through 4 AI lenses (Watch For, Prerequisite Check, Common Misconceptions, Explain It Back). Pin questions and highlights to your Outline. |
| **Solo Battle** | Author 3+ questions (AI rejects shallow ones). Answer with typed reasoning. See your score and peer comparisons. |
| **Multiplayer Battle Rooms** | Host or join a room. AI generates questions from the document. Real-time scoring via Supabase Realtime. |

The AI **never** summarizes, answers, or rewrites student text. Every output is a question or a gap-flag.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Vite |
| Backend | Supabase (Postgres + Auth + Realtime) |
| AI | LLM API |
| Styling | CSS custom properties |
| Testing | Vitest + React Testing Library + fast-check |
| Deploy | Vercel |

---

## Quick Start

```bash
git clone https://github.com/pradeepreddyvv/contextWindow.git
cd contextWindow
npm install
cp .env.example .env.local
# Add your Supabase and API keys to .env.local
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Environment Variables

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ANTHROPIC_API_KEY=your-api-key
```

---

## Project Structure

```
contextWindow/
├── src/
│   ├── App.tsx                 ← Root: auth gate → upload → study/battle
│   ├── types.ts                ← Shared TypeScript interfaces
│   ├── reducer.ts              ← AppState reducer + actions
│   ├── components/
│   │   ├── DocumentUpload.tsx  ← PDF/URL/paste import
│   │   ├── StudyMode.tsx       ← Three-column study layout
│   │   ├── BattleMode.tsx      ← Solo + multiplayer battle
│   │   ├── BattleRoom.tsx      ← Multiplayer room logic
│   │   └── ...                 ← Lens, outline, provocation components
│   ├── services/
│   │   ├── llmService.ts       ← LLM API client
│   │   ├── guardrailService.ts ← Blocks forbidden AI output
│   │   ├── lensService.ts      ← Generates lens questions
│   │   ├── documentParser.ts   ← Parses uploaded text into sections
│   │   └── ...                 ← Scoring, evaluation, persistence
│   └── hooks/
│       └── useAuth.ts          ← Supabase auth
├── .kiro/
│   ├── specs/                  ← Requirements, design, tasks
│   ├── steering/               ← Guardrails, pedagogy, product, UI
│   └── hooks/                  ← Auto-verify guardrail integration
├── .env.example
└── vercel.json
```

---

## Guardrail Rules

Every AI output passes through `guardrailService.checkContent()` before reaching the student.

**Blocked phrases:** "the answer is", "correct answer", "you should write", etc.

**Also blocked:** AI output containing verbatim substrings of student text (>5 words).

**Fallback:** A guiding question replaces any blocked output.

---

## Kiro Integration

| Feature | Location | Purpose |
|---|---|---|
| Spec | `.kiro/specs/provoke/` | Requirements (EARS notation), design, tasks |
| Steering | `.kiro/steering/` | Pedagogy research, guardrails, UI design system |
| Hooks | `.kiro/hooks/` | Auto-verify guardrail integration on file edits |

---

## Build

```bash
npm run build    # Production build → dist/
npm test -- --run  # Run all tests
```

---

## License

MIT
