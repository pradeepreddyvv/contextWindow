# Requirements Document — Scaffold (Provoke)

## Introduction

Scaffold is a document-centric active-learning web application grounded in Advait Sarkar's "Tools for Thought" research and Microsoft's Promptions architecture. Students engage a hardcoded document (React useEffect and Strict Mode) through four pedagogical **lenses** that provoke thinking instead of summarizing. Inline **¿ provocations** challenge students on specific phrases while reading. A student-authored **Outline** accumulates engagement artifacts. A three-phase **Battle Mode** inverts the AI-quiz pattern: students author questions, AI rejects shallow ones, then students answer each other with typed reasoning scored on rigor — not recall.

**Core thesis:** The AI never produces content a student should produce themselves. It only asks questions, flags gaps, and refuses shortcuts.

**Competition frame:** Education — "The Agency Guardrail." AI as scaffolding, not solution.

**Research basis:**
- Advait Sarkar TED talk: "How to Stop AI from Killing Your Critical Thinking"
- Microsoft Research Tools for Thought / Promptions repo (https://github.com/microsoft/Promptions)

**Tech stack:** React + TypeScript (Vite), localStorage persistence, no backend required for MVP.

---

## Glossary

- **Document**: The hardcoded study text (React useEffect and Strict Mode, 3 sections). The AI never rewrites or summarizes it.
- **Lens**: One of four modes of engaging the document — Watch For, Prerequisite Check, Common Misconceptions, Explain It Back.
- **Lens Panel**: The UI area above the document text showing the active lens's AI-generated questions or prompts.
- **Provocation**: An inline AI-generated question tied to a specific phrase in the document, marked with a ¿ symbol.
- **Outline**: The right-panel record of student engagement — populated only by student actions, never by AI.
- **Highlight**: A student-selected phrase in the document text, stored in the Outline with an editable note.
- **Pinned Question**: A lens question the student clicked "Pin" on, stored in the Outline.
- **Engaged Provocation**: A ¿ provocation the student marked "I've thought about this", stored in the Outline.
- **Explain It Back**: The capstone lens — student types free-text understanding, AI fires 1–3 provocations, student revises, repeat.
- **Battle Mode**: Three-phase multiplayer mechanic — Author → Battle → Reveal.
- **Question Author Phase**: Phase 1 of Battle — student must submit 3 AI-accepted questions to enter.
- **Battle Phase**: Phase 2 — student answers all questions in the pool with typed reasoning.
- **Reveal Phase**: Phase 3 — side-by-side answers with AI-scored verdicts.
- **Guardrail**: Rule-based check that blocks any AI output that reveals answers, rewrites student text, or completes student reasoning.
- **Mock Mode**: Operational mode when no API key is present — all AI responses are deterministic hardcoded data.
- **Promptions Pattern**: The ephemeral UI control pattern from Microsoft's Promptions repo — radio buttons and toggles that steer AI output without appending new chat messages.

---

## Requirements

### Requirement 1: Document Display

**User Story:** As a Student, I want to read the study document with specific phrases visually highlighted, so that I know which parts carry inline provocations.

#### Acceptance Criteria

1. THE App SHALL display the hardcoded React useEffect document divided into three labeled sections: (a) "useEffect Basics and the Dependency Array", (b) "Cleanup Functions and Memory Leaks", (c) "Strict Mode and Double-Invocation".
2. THE App SHALL render 2–3 pre-selected phrases per section as visually underlined or highlighted spans that indicate a ¿ provocation is available.
3. WHEN the Student clicks a highlighted phrase, THE App SHALL open an inline provocation card beneath that phrase without navigating away from the document.
4. THE App SHALL display the document text in a readable serif font (Newsreader) at a comfortable line length (max 680px).
5. THE App SHALL render the document in the center column of a three-column layout: Resources sidebar | Document + Lens panel | Outline panel.

---

### Requirement 2: Four Lenses

**User Story:** As a Student, I want to engage the document through four different lenses, so that I can prime my attention, check prerequisites, surface misconceptions, and test my understanding.

#### Acceptance Criteria

1. THE App SHALL display four lens tabs above the document: "What to Watch For", "Prerequisite Check", "Common Misconceptions", "Explain It Back".
2. WHEN the Student selects the "What to Watch For" lens, THE Lens_Service SHALL return 3–5 mechanism-level questions the student should hold in mind while reading — questions that require why/how/what-if reasoning, not recall.
3. WHEN the Student selects the "Prerequisite Check" lens, THE Lens_Service SHALL return 3–5 prerequisite concepts phrased as one-sentence challenges (e.g. "Can you explain X in one sentence?") without teaching the concept.
4. WHEN the Student selects the "Common Misconceptions" lens, THE Lens_Service SHALL return 2–4 counterintuitive claims with a hook back to the text — without fully resolving the misconception.
5. THE App SHALL display each lens question with a "Pin" button that adds it to the Outline.
6. THE Lens_Service SHALL NEVER summarize the document, provide answers, or produce content the student should produce themselves.
7. WHERE Mock_Mode is active, THE Lens_Service SHALL return deterministic hardcoded lens questions for the React useEffect document.

---

### Requirement 3: Explain It Back Lens

**User Story:** As a Student, I want to type my understanding of the document and receive probing questions — not corrections — so that I can discover my own gaps through revision.

#### Acceptance Criteria

1. WHEN the Student selects the "Explain It Back" lens, THE App SHALL display a free-text textarea prompting the student to explain the document in their own words.
2. WHEN the Student submits their explanation, THE Explain_Back_Service SHALL analyze it and return 1–3 provocations targeting: missing key entities, wrong-register verbs, surface-level naming, or missing causal connectors.
3. THE App SHALL display each provocation as a question — never as a correction, rewrite, or grade.
4. WHEN the Student revises their explanation and resubmits, THE Explain_Back_Service SHALL re-analyze the revised text and fire new provocations if gaps remain.
5. WHEN the Student's explanation contains no detectable gaps, THE Explain_Back_Service SHALL return one meta-question (e.g. "If a skeptic challenged this, how would you respond?") instead of no response.
6. THE Explain_Back_Service SHALL NEVER rewrite the student's text, correct it directly, or reveal what the "right" explanation looks like.
7. THE App SHALL track the revision round number and display it to the student (e.g. "Round 2").
8. WHERE Mock_Mode is active, THE Explain_Back_Service SHALL return deterministic hardcoded provocations for the React useEffect topic.

---

### Requirement 4: Inline Provocations (¿ markers)

**User Story:** As a Student, I want to click on marked phrases in the document and receive a probing question — not an explanation — so that I'm pushed deeper into the text.

#### Acceptance Criteria

1. THE App SHALL pre-generate 2–3 ¿ provocations per document section, each tied to a specific phrase in the text.
2. WHEN the Student clicks a ¿-marked phrase, THE App SHALL display an inline provocation card beneath that phrase containing a single question.
3. THE provocation question SHALL target one of: ambiguous language in the phrase, an unexamined claim, or an unstated mechanism.
4. THE inline provocation card SHALL offer two actions: "Dismiss" (closes the card) and "I've thought about this" (marks it engaged and logs it to the Outline).
5. THE App SHALL NEVER provide the answer to a provocation — even if the student submits text asking for it directly.
6. WHEN a provocation is marked engaged, THE App SHALL visually distinguish that phrase from unengaged ones (e.g. checkmark, color change).
7. WHERE Mock_Mode is active, THE App SHALL use hardcoded provocation questions for each pre-selected phrase.

---

### Requirement 5: The Outline Panel

**User Story:** As a Student, I want a right-panel record of everything I've engaged with, so that I can see my own thinking accumulate before entering Battle mode.

#### Acceptance Criteria

1. THE Outline panel SHALL display three sections: "Pinned Questions", "Highlights", "Engaged Provocations".
2. THE Outline SHALL be populated only by student actions — THE App SHALL NEVER write content into the Outline automatically or via AI.
3. WHEN the Student pins a lens question, THE App SHALL add it to the "Pinned Questions" section with the lens name as a label.
4. WHEN the Student clicks a highlighted phrase in the document, THE App SHALL add it to the "Highlights" section with an editable note field.
5. WHEN the Student marks a provocation as "I've thought about this", THE App SHALL add the provocation question to the "Engaged Provocations" section.
6. THE App SHALL display an empty-state message in each section when no items have been added yet.
7. THE App SHALL display an "Enter Battle →" button at the bottom of the Outline panel.
8. THE App SHALL persist the Outline contents to localStorage so they survive a page refresh.

---

### Requirement 6: Battle Mode — Phase 1 (Author)

**User Story:** As a Student, I want to author questions that the AI evaluates before I can enter the battle, so that I'm forced to understand the material deeply enough to write good questions.

#### Acceptance Criteria

1. WHEN the Student clicks "Enter Battle →", THE App SHALL transition to Battle Mode and display a 3-phase progress bar.
2. THE App SHALL display a question authoring textarea and a "Submit Question" button.
3. WHEN the Student submits a question, THE Question_Evaluator_Service SHALL evaluate it against the rubric and return `{ accepted: boolean, message: string }`.
4. THE Question_Evaluator_Service SHALL reject questions that: start with "What is / What are / Define / List / Name" without a scenario; require only memorization; are fewer than 6 words; do not end with "?".
5. THE Question_Evaluator_Service SHALL accept questions that: require explaining a mechanism or causal chain; use Why / How / If X happened / What would happen / compare / contrast.
6. WHEN a question is rejected, THE App SHALL display the rejection message and prompt the student to rewrite — THE App SHALL NOT rewrite the question for the student.
7. WHEN a question is accepted, THE App SHALL display the acceptance message and add the question to the visible question pool.
8. THE Student SHALL be required to have 3 accepted questions before proceeding to Phase 2.
9. THE App SHALL display the accumulating question pool (with author labels) in a sidebar during Phase 1.
10. WHERE Mock_Mode is active, THE Question_Evaluator_Service SHALL return deterministic accept/reject responses based on the question's first word and length.

---

### Requirement 7: Battle Mode — Phase 2 (Battle)

**User Story:** As a Student, I want to answer all questions in the pool with typed reasoning, so that I practice explaining mechanisms rather than recalling facts.

#### Acceptance Criteria

1. WHEN the Student has 3 accepted questions, THE App SHALL transition to Phase 2 and display the first question.
2. THE App SHALL display one question at a time with a typed-answer textarea (minimum 1 sentence required before submission).
3. THE App SHALL display question navigation (e.g. "1 / 3") and a "Next" button.
4. THE App SHALL display a "Submit All" button when the student has answered all questions.
5. THE App SHALL require a minimum of 15 words per answer before enabling the "Next" or "Submit All" button.
6. THE App SHALL display the source document section reference alongside each question.

---

### Requirement 8: Battle Mode — Phase 3 (Reveal)

**User Story:** As a Student, I want to see my answers scored on reasoning rigor alongside peer answers, so that I learn from comparison rather than from being told the right answer.

#### Acceptance Criteria

1. WHEN the Student submits all answers, THE Answer_Scorer_Service SHALL score each answer on reasoning rigor (0–5) using the rubric: +2 causal reasoning, +2 mechanism vocabulary, +1 answer ≥ 15 words.
2. THE App SHALL display a score header showing the student's total score.
3. THE App SHALL display per-question reveal cards showing: the question, the student's answer, 2 mock peer answers, and the AI verdict for each.
4. THE Answer_Scorer_Service SHALL label each answer as "Strong reasoning" (4–5), "Partial credit" (2–3), or "Needs rigor" (0–1).
5. THE Answer_Scorer_Service SHALL NEVER reveal the correct answer — only describe what the answer did or missed.
6. THE App SHALL display a "Play Again" button that resets Battle Mode to Phase 1.
7. WHERE Mock_Mode is active, THE Answer_Scorer_Service SHALL return deterministic scores and verdicts for the React useEffect questions.

---

### Requirement 9: Guardrail — AI Never Answers

**User Story:** As a system operator, I want every AI output to pass through a guardrail that blocks answers, rewrites, and shortcuts, so that the "AI as scaffold" principle is enforced at every interaction point.

#### Acceptance Criteria

1. THE Guardrail_Service SHALL inspect every AI-generated string before it is displayed to the student.
2. IF the AI output contains any of: "the answer is", "correct answer", "final answer", "you should write", "the correct response" — THE Guardrail_Service SHALL block it and return a fallback.
3. IF the AI output rewrites or directly continues the student's submitted text verbatim — THE Guardrail_Service SHALL block it.
4. IF the AI output is a statement rather than a question in a context where a question is required (lens output, provocation, Explain It Back) — THE Guardrail_Service SHALL flag it.
5. WHEN a response is blocked, THE Guardrail_Service SHALL return: `{ passed: false, sanitizedText: fallback, blockedReason: string }`.
6. THE fallback message SHALL be: "I can't give the answer. Here's a smaller provocation: [guiding question]."
7. THE App SHALL log every blocked response with its `blockedReason` to `console.warn`.
8. THE Guardrail_Service SHALL return `{ passed: true, sanitizedText: originalText }` for clean output without modifying it.

---

### Requirement 10: Mock Mode

**User Story:** As a developer or demo presenter, I want the app to run fully without an API key, so that it can be demonstrated in any environment.

#### Acceptance Criteria

1. WHEN no API key is present in the environment, THE App SHALL activate Mock_Mode automatically.
2. WHILE Mock_Mode is active, ALL service calls SHALL return deterministic hardcoded responses — no network requests SHALL be made.
3. THE App SHALL display a visible "Mock Mode" badge in the header.
4. THE App SHALL include hardcoded mock data for: all 4 lens outputs, all ¿ provocation questions, Explain It Back provocations (rounds 1 and 2), question evaluation accept/reject responses, answer scores and verdicts.
5. THE mock data SHALL be sufficient to complete the full demo journey without any deviation.

---

### Requirement 11: Design System and Layout

**User Story:** As a Student, I want the app to feel scholarly and focused — not like a generic SaaS tool — so that the aesthetic reinforces the seriousness of the learning task.

#### Acceptance Criteria

1. THE App SHALL use the following color palette: warm paper background `#F4EFE4`, ink text `#1B1A17`, rust accent `#B54A1E`, and four lens-specific accent colors: forest green (Watch For), indigo (Prerequisite), brick (Misconceptions), bronze (Explain It Back).
2. THE App SHALL use the following fonts: Fraunces (display headings, serif), Newsreader (body reading text, serif), JetBrains Mono (UI labels, all-caps).
3. THE App SHALL implement the three-column study layout: Resources sidebar (left, ~200px) | Document + Lens panel (center, flex) | Outline panel (right, ~280px).
4. THE App SHALL implement the Promptions-inspired ephemeral option controls — radio button groups rendered inline that update AI output without appending new chat messages — for lens selection.
5. THE App SHALL use minimal motion — no decorative animations that distract from reading.
6. THE App SHALL render without horizontal scrolling on viewport widths from 375px to 1440px (collapsing to single-column on mobile).
7. THE App SHALL meet WCAG 2.1 AA color contrast requirements (minimum 4.5:1 for normal text).

---

### Requirement 12: localStorage Persistence

**User Story:** As a Student, I want my outline and progress to survive a page refresh, so that I don't lose my work mid-session.

#### Acceptance Criteria

1. THE App SHALL persist to localStorage: Outline contents (highlights, pinned questions, engaged provocations), Explain It Back text and round number, Battle Mode phase and accepted questions.
2. THE App SHALL load persisted state on startup and restore the student to their last position.
3. localStorage writes SHALL be wrapped in try/catch — if storage is unavailable, THE App SHALL continue in-memory without displaying an error.
4. THE App SHALL provide a "Reset Session" button that clears localStorage and returns to the initial state.
