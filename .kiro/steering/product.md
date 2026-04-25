# Product — Scaffold (Provoke)

## What It Is
Scaffold is a document-centric active-learning tool where students read through AI-powered lenses that provoke thinking, then prove understanding in a battle mode that rewards reasoning rigor over recall.

## One-Line Pitch
An AI study tool that helps students think through reading and exams without giving them the answer.

## Target Users
- University students preparing for reading-based exams (comprehension, short-answer, essay, concept-explanation)
- Students who currently use ChatGPT/Claude to get answers quickly but want to actually learn
- Instructors who want to assign AI-assisted study sessions that don't become answer-extraction sessions

## The Problem
Students use AI to get answers quickly, which can make them weaker learners. Research shows unconstrained GPT-4 reduces exam scores by 17% (Bastani et al., PNAS 2025). Students need guidance, not shortcuts.

## The Solution
Scaffold gives students an AI learning partner with strict architectural constraints. It does not summarize or solve. Instead, it asks better questions, points students back to the source, highlights weak reasoning, and helps them improve their own answers.

## Competition Frame
Education — "The Agency Guardrail." AI as scaffolding, not solution. The app must empower a learner to do something they couldn't do before, without doing it for them.

## Two Modes

### Study Mode (Active Reading)
Three-column layout: Resources | Document + Lenses | Outline

**Four Lenses:**
1. **What to Watch For** — 3-5 mechanism-level questions to hold while reading (why/how/what-if)
2. **Prerequisite Check** — 3-5 prerequisite concepts as one-sentence challenges
3. **Common Misconceptions** — 2-4 counterintuitive claims with hooks to the text
4. **Explain It Back** — Student types understanding, AI fires provocations targeting gaps, student revises

**Inline Provocations (¿ markers):**
- Pre-selected phrases in the document open provocation cards when clicked
- Each provocation targets ambiguous language, unexamined claims, or unstated mechanisms
- Student can dismiss or mark "I've thought about this" (logged to Outline)

**Outline Panel:**
- Populated ONLY by student actions (pins, highlights, engaged provocations)
- AI never writes to the Outline
- Gateway to Battle Mode

### Battle Mode (Assessment)
Three phases: Author → Battle → Reveal

1. **Author Phase** — Student writes 3 questions. AI rejects recall questions ("What is X?"), accepts mechanism questions ("If X broke, what would happen?"). Student must rewrite rejected questions — AI never rewrites for them.
2. **Battle Phase** — Student answers all questions with typed reasoning (minimum 15 words). No multiple choice, no shortcuts.
3. **Reveal Phase** — Side-by-side answers with AI-scored verdicts on reasoning rigor (0-5). Verdict never reveals the correct answer — only describes what the answer did or missed.

## The Demo Beat
"What is useEffect?" → rejected. Student rewrites to "If useEffect's cleanup function were removed, what would happen to event listeners?" → accepted. That rejection IS the product.

## Tech Stack
- Frontend: React + TypeScript + Vite → Vercel
- Backend: Supabase (auth, Postgres, real-time)
- AI: Mock Mode (hardcoded data) for offline demo + real LLM integration when API key provided
- Design: Scholarly aesthetic — paper/ink palette, Fraunces/Newsreader fonts

## Why Kiro
The constraints are not buried in prompts — they are written as `.kiro/specs/` requirements (EARS notation), enforced by `.kiro/hooks/` (guardrail checks on every edit), and steered by `.kiro/steering/` (pedagogy, guardrails, design system). The pedagogy is documented as code.
