# Implementation Plan: Scaffold (Provoke)

## Overview

Scaffold is a document-centric active-learning web app built with React + TypeScript (Vite) on the frontend and Supabase on the backend. This plan covers the full implementation: shared contracts, services (AI + data + auth), Study Mode UI (4 lenses, document reader, outline), Battle Mode UI (3-phase question authoring and scoring), design system, testing, and deployment.

## Tasks

- [x] 1. Project foundation and shared contracts
  - [x] 1.1 Initialize Vite + React + TypeScript project and install dependencies
    - Set up project with `react-ts` template
    - Install `@supabase/supabase-js`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `fast-check`, `jsdom`
    - _Requirements: 10.1, 11.1_

  - [x] 1.2 Create `src/types.ts` — the shared type contract
    - Define all interfaces: `AppState`, `Document`, `DocumentSection`, `Highlight`, `PinnedQuestion`, `BattleQuestion`, `BattleResult`, `InlineProvocation`, `GuardrailResult`, `OutlineState`, `BattleState`, `LensType`, `BattlePhase`, `AppMode`
    - _Requirements: 1.1, 5.1, 6.1, 7.1, 8.1, 9.1_

  - [x] 1.3 Create `src/services/mockData.ts` — all hardcoded demo data
    - Export `DOCUMENT` (React useEffect, 3 sections with inline provocations), `MOCK_LENS_QUESTIONS`, `MOCK_PROVOCATIONS`, `MOCK_EXPLAIN_PROVOCATIONS`, `MOCK_QUESTION_EVAL`, `MOCK_SCORES`, `MOCK_PEER_ANSWERS`
    - _Requirements: 10.2, 10.4, 10.5_

  - [x] 1.4 Create design system files
    - `src/styles/tokens.css` — CSS custom properties (palette, fonts, layout tokens)
    - `src/styles/global.css` — base styles, button/textarea/label/badge classes
    - Add Google Fonts link in `index.html` (Fraunces, Newsreader, JetBrains Mono)
    - _Requirements: 11.1, 11.2, 11.5_

  - [x] 1.5 Create `src/reducer.ts` — AppState reducer with all action types
    - Actions: `SET_MODE`, `SET_LENS`, `PIN_QUESTION`, `ADD_HIGHLIGHT`, `UPDATE_HIGHLIGHT_NOTE`, `ENGAGE_PROVOCATION`, `SET_EXPLAIN_TEXT`, `SET_EXPLAIN_PROVOCATIONS`, `INCREMENT_EXPLAIN_ROUND`, `SET_DRAFT_QUESTION`, `SET_QUESTION_STATUS`, `ADD_ACCEPTED_QUESTION`, `SET_ANSWER`, `SET_CURRENT_ANSWER_IDX`, `SET_BATTLE_RESULTS`, `SET_BATTLE_PHASE`, `SET_USER`, `RESET_BATTLE`, `RESET_SESSION`
    - _Requirements: 5.2, 12.1, 12.4_

  - [x] 1.6 Create `src/lib/supabase.ts` and `.env.example`
    - Supabase client that returns `null` when env vars are missing (Mock Mode)
    - Export `isMockMode()` helper
    - _Requirements: 10.1_

  - [x] 1.7 Create `supabase/migrations/001_initial_schema.sql`
    - Tables: `documents`, `outlines`, `battle_sessions`
    - Row Level Security policies
    - _Requirements: 12.1_

- [x] 2. Supabase auth and data services
  - [x] 2.1 Create `src/hooks/useAuth.ts`
    - Returns `{ user, loading, signInAnonymously, signOut }`
    - Mock Mode: returns `{ id: 'mock-user' }` immediately
    - Supabase: uses `signInAnonymously()`, listens to `onAuthStateChange`
    - _Requirements: 10.1, 10.2_

  - [x] 2.2 Create `src/components/AuthGate.tsx`
    - Wraps children, auto-signs-in anonymously on mount
    - Mock Mode: renders children immediately
    - _Requirements: 10.1_

  - [x] 2.3 Create `src/services/documentService.ts`
    - `getDocument(docId?)`: Supabase → fetches from `documents` table; Mock → returns `DOCUMENT`
    - _Requirements: 1.1, 10.2_

  - [x] 2.4 Create `src/services/outlineService.ts`
    - `loadOutline(userId, docId)` / `saveOutline(userId, docId, outline)`: Supabase → upsert to `outlines`; Mock → localStorage
    - Debounced saves (300ms)
    - _Requirements: 5.8, 12.1, 12.3_

  - [x] 2.5 Create `src/services/battleService.ts`
    - `loadBattle(userId, docId)` / `saveBattle(userId, docId, battle)`: Supabase → upsert to `battle_sessions`; Mock → localStorage
    - _Requirements: 12.1_

  - [x] 2.6 Create `src/hooks/useLocalStorage.ts`
    - `useLocalStorage<T>(key, defaultValue)` with try/catch fallback
    - _Requirements: 12.3_

  - [x]* 2.7 Write tests for data services (mock mode path)
    - `documentService` returns a document with 3 sections
    - `outlineService` save/load round-trip
    - `battleService` save/load round-trip
    - _Requirements: 10.2, 12.1_

- [x] 3. Guardrail service
  - [x] 3.1 Create `src/services/guardrailService.ts`
    - `checkContent(text, studentText?)` → `GuardrailResult`
    - Block forbidden phrases: "the answer is", "correct answer", "final answer", "you should write", "the correct response"
    - Block verbatim student text continuation (> 5 word substring match)
    - Return `{ passed: true, sanitizedText: text }` for clean content
    - _Requirements: 9.1, 9.2, 9.3, 9.5, 9.6, 9.8_

  - [x]* 3.2 Write unit tests for guardrail service
    - Each forbidden phrase blocked, clean pass, verbatim block, fallback message
    - _Requirements: 9.2, 9.3, 9.8_

  - [x]* 3.3 Write property-based tests for guardrail service
    - **Property 1: Guardrail blocks forbidden phrases**
    - **Property 2: Guardrail passes clean questions**
    - **Property 10: Guardrail round-trip integrity**
    - **Validates: Requirements 9.2, 9.8**

- [x] 4. AI services (lens, explain back, question evaluator, answer scorer)
  - [x] 4.1 Create `src/services/lensService.ts`
    - `generateLensQuestions(docText, lensType)` → `Promise<string[]>`
    - Mock: returns `MOCK_LENS_QUESTIONS[lensType]`, passes through guardrail
    - _Requirements: 2.2, 2.3, 2.4, 2.6, 2.7_

  - [x] 4.2 Create `src/services/explainBackService.ts`
    - `generateProvocations(explanation, docContext, round)` → `Promise<string[]>`
    - Mock: returns `MOCK_EXPLAIN_PROVOCATIONS[round % 2]`, passes through guardrail
    - Empty/whitespace input → returns single prompt
    - _Requirements: 3.2, 3.5, 3.6, 3.8_

  - [x] 4.3 Create `src/services/questionEvaluatorService.ts`
    - `evaluateQuestion(question, docContext)` → `Promise<{accepted, message}>`
    - Mock: rule-based (reject recall starters, < 6 words, no "?")
    - _Requirements: 6.3, 6.4, 6.5, 6.10_

  - [x] 4.4 Create `src/services/answerScorerService.ts`
    - `scoreAnswer(question, answer, docContext)` → `Promise<{score, label, note}>`
    - `scoreAllAnswers(questions, answers, docContext)` → `Promise<BattleResult[]>`
    - Mock: returns `MOCK_SCORES[hash(question) % 3]`
    - _Requirements: 8.1, 8.4, 8.5, 8.7_

  - [x]* 4.5 Write unit tests for all 4 AI services
    - Lens returns questions for each type, explain-back cycles rounds, evaluator rejects/accepts, scorer returns valid scores
    - _Requirements: 2.2, 3.2, 6.4, 8.1_

  - [x]* 4.6 Write property-based tests for AI services
    - **Property 3: Lens output is always questions**
    - **Property 5: Question evaluator rejects recall starters**
    - **Property 6: Answer scorer never reveals correct answer**
    - **Validates: Requirements 2.6, 6.4, 8.5**

- [x] 5. Checkpoint — Ensure all service tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. App shell and header
  - [x] 6.1 Create `src/App.tsx`
    - `useReducer` + `useAuth` + state hydration from localStorage
    - Persist state changes on every dispatch
    - Render Header + (StudyMode | BattleMode) based on mode
    - _Requirements: 10.1, 12.1, 12.2, 12.4_

  - [x] 6.2 Create `src/components/Header.tsx`
    - "Scaffold" logo (Fraunces font)
    - Study / Battle tab switcher
    - Mock Mode badge when `isMockMode()` is true
    - Reset Session button
    - _Requirements: 10.3, 11.1, 12.4_

- [x] 7. Study Mode UI
  - [x] 7.1 Create `src/components/StudyMode.tsx`
    - Three-column CSS Grid: `200px | 1fr | 280px`
    - Left: ResourcesSidebar. Center: LensTabs + LensPanel/ExplainItBack + DocumentReader. Right: OutlinePanel.
    - _Requirements: 1.5, 11.3_

  - [x] 7.2 Create `src/components/ResourcesSidebar.tsx`
    - Hardcoded: "React useEffect & Strict Mode" (active state)
    - Paper background, ink text
    - _Requirements: 1.1_

  - [x] 7.3 Create `src/components/LensTabs.tsx`
    - 4 tabs: "What to Watch For", "Prerequisite Check", "Common Misconceptions", "Explain It Back"
    - Lens-specific accent colors, Promptions-style option controls
    - `role="tablist"` + `aria-selected` for accessibility
    - _Requirements: 2.1, 11.4_

  - [x] 7.4 Create `src/components/LensPanel.tsx`
    - Calls `lensService.generateLensQuestions()` on mount + lens change
    - Renders questions with "Pin" button (dispatches `PIN_QUESTION`)
    - Loading state while service call in-flight
    - _Requirements: 2.2, 2.3, 2.4, 2.5_

  - [x] 7.5 Create `src/components/ExplainItBack.tsx`
    - Textarea for student explanation, submit button (disabled when empty)
    - Calls `explainBackService.generateProvocations()`
    - Renders 1–3 provocation questions (not corrections)
    - Round counter, "Revise" button re-enables textarea
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.7_

  - [x] 7.6 Create `src/components/DocumentReader.tsx`
    - Renders 3 sections from DOCUMENT with Newsreader font, max-width 680px
    - Pre-selected phrases rendered with ¿ marker + wavy underline
    - Click ¿ phrase → opens ProvocationCard inline
    - Engaged provocations show checkmark
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 4.1, 4.2, 4.6_

  - [x] 7.7 Create `src/components/ProvocationCard.tsx`
    - Displays provocation question, "Dismiss" and "I've thought about this" buttons
    - Paper background, rust border-left, Escape key dismisses
    - _Requirements: 4.3, 4.4, 4.5_

  - [x] 7.8 Create `src/components/OutlinePanel.tsx`
    - 3 sections: Pinned Questions (with lens color labels), Highlights (with editable notes), Engaged Provocations
    - Empty-state messages for each section
    - "Enter Battle →" button at bottom
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

- [x] 8. Battle Mode UI
  - [x] 8.1 Create `src/components/BattleMode.tsx`
    - BattleProgressBar + phase switch (AuthorPhase | BattlePhase | RevealPhase)
    - "← Back to Study" link
    - Wires `scoreAllAnswers` for submit-all flow
    - _Requirements: 6.1_

  - [x] 8.2 Create `src/components/BattleProgressBar.tsx`
    - 3 steps: Author → Battle → Reveal
    - Active step: rust accent. Completed: checkmark.
    - _Requirements: 6.1_

  - [x] 8.3 Create `src/components/AuthorPhase.tsx`
    - Textarea + "Submit Question" button
    - Calls `questionEvaluatorService.evaluateQuestion()`
    - Accepted → green message + added to pool; Rejected → red message + rewrite instruction
    - "Enter Battle" enabled when 3 accepted questions
    - _Requirements: 6.2, 6.3, 6.6, 6.7, 6.8_

  - [x] 8.4 Create `src/components/QuestionPool.tsx`
    - Sidebar showing accepted questions + "X / 3" counter
    - _Requirements: 6.9_

  - [x] 8.5 Create `src/components/BattlePhase.tsx`
    - One question at a time + typed-answer textarea
    - Word count ("12 / 15 words minimum"), "Next" disabled until >= 15 words
    - "Submit All" on last question when all answered
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [x] 8.6 Create `src/components/RevealPhase.tsx`
    - Score header: "Your score: X / 15"
    - Per-question cards: question, student answer, AI verdict (label + note), 2 mock peer answers
    - Verdict colors: Strong = green, Partial = bronze, Needs rigor = brick
    - "Play Again" button resets battle
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [x]* 8.7 Write tests for Battle Mode components
    - AuthorPhase: recall rejected, mechanism accepted, pool fills, enter battle at 3
    - BattlePhase: word count, next disabled < 15, submit all calls scorer
    - RevealPhase: score renders, cards render, no correct answer revealed, play again resets
    - _Requirements: 6.4, 6.5, 7.5, 8.5_

- [x] 9. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Kiro steering files and hooks
  - [x] 10.1 Create `.kiro/steering/guardrails.md`
    - Allowed/forbidden AI behaviors, forbidden phrases list, fallback format
    - _Requirements: 9.1, 9.2_

  - [x] 10.2 Create `.kiro/steering/pedagogy.md`
    - Active recall, productive struggle, source-grounded feedback
    - Research citations (Sarkar, Kapur, Bucinca)
    - _Requirements: 9.1_

  - [x] 10.3 Create `.kiro/steering/product.md`
    - Product definition, target users, 4 lenses, Battle Mode, principles
    - _Requirements: 10.1_

  - [x] 10.4 Create `.kiro/steering/ui.md`
    - Design tokens, 3-column layout, Promptions pattern, scholarly aesthetic
    - _Requirements: 11.1, 11.2, 11.3_

  - [x] 10.5 Create `.kiro/hooks/guardrail-check.json` and `.kiro/hooks/lens-output-check.json`
    - postToolUse hooks for guardrail and lens output verification
    - _Requirements: 9.1_

- [x] 11. README and deployment config
  - [x] 11.1 Create `README.md`
    - Project name, thesis, research basis, architecture diagram
    - How to run, how to test, Supabase setup instructions
    - _Requirements: 10.1_

  - [x] 11.2 Create `vercel.json` with SPA rewrite rules
    - _Requirements: 11.6_

- [ ] 12. Mobile responsive layout
  - [ ] 12.1 Add responsive breakpoints to StudyMode
    - Mobile (< 768px): single column, sidebars behind toggle buttons
    - No horizontal scrolling on viewport widths from 375px to 1440px
    - _Requirements: 11.3, 11.6_

- [ ] 13. Final verification and polish
  - [ ] 13.1 Run `npm run build` — verify no TypeScript errors
    - _Requirements: 10.1_

  - [ ] 13.2 Run `npm test -- --run` — verify all tests pass
    - _Requirements: 10.2_

  - [ ] 13.3 Create `DEMO.md` — 3-minute demo script
    - Full end-to-end journey: Study → Battle → Reveal
    - _Requirements: 10.5_

  - [ ] 13.4 Verify full demo journey works end-to-end
    - Study Mode: load doc → select lens → pin question → click provocation → engage → outline updates
    - Battle Mode: author 3 questions → answer all → reveal scores
    - Mock Mode badge visible throughout
    - _Requirements: 10.5_

- [ ] 14. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- The app works fully in Mock Mode without Supabase credentials
