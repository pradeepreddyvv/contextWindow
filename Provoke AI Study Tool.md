> From: https://chatgpt.com/c/69ec16cf-82d0-8327-b55a-698ba3d5d410

# you asked

frame this idea correctly, for the hackathon in simple and clear idea, for a 3 min video.

based on this idea, we want to do / complete hackathon for the kiro=



and here is the video we want to follow for education track=


we we want to give a llm for student with contraints to answer in exam, not to give the answers but to show them a path to answer.


based on this idea, we want to do / complete hackathon for the kiro=







and here is the video we want to follow for education track=





we we want to give a llm for student with contraints to answer in exam, not to give the answers but to show them a path to answer.



I want this project to work for active reading and also a mode for exams (llm with constraints not to give answers but to help in other ways - tell me what help can be given for student in exam)? And in 1. Any exam or we can fix to one specific type of exam. 2.  React and any thing works . 3. No ethos needed, we are going with education but as the problem we can include which ever feels correct


# The Landscape of Socratic AI Tools for Active Reading and Exam Assistance: A Strategic Research Report for a Kiro Hackathon Project

## Executive summary

You are entering a market where the *idea* of "AI that won't give answers" is well established (Khanmigo, Claude Learning Mode, LearnLM, Quizlet Q-Chat, MagicSchool, Synthesis Tutor) but the *implementation* is almost universally a single thin layer of system-prompt instructions sitting on top of a frontier LLM — a layer that real RCTs show students routinely break, work around, or simply outwait. At the same time, there is an unusually clean and recent body of academic research that points in a sharper direction than any shipping product currently occupies: Advait Sarkar's "provocations" / "AI Should Challenge, Not Obey" framework ([CACM 2024](https://cacm.acm.org/opinion/ai-should-challenge-not-obey/)), Kapur's "productive failure" learning design with d ≈ 0.36–0.58 effect sizes from a 166-comparison meta-analysis ([Sinha & Kapur, 2021](https://journals.sagepub.com/doi/10.3102/00346543211019105)), Buçinca's "cognitive forcing functions" ([CSCW 2021](https://arxiv.org/abs/2102.09692)), and Bastani et al.'s PNAS 2025 RCT showing unconstrained GPT-4 *harms* learning by 17% while a guard-railed "GPT Tutor" preserves it ([PNAS](https://www.pnas.org/doi/10.1073/pnas.2422633122)).

The defensible hackathon angle is **not** "another Socratic chatbot." It is a *document-grounded active reading + exam mode tool* whose AI is architecturally incapable of producing a solution — built using Kiro's spec-driven constraints, agent hooks, and MCP as the actual enforcement substrate, not just decoration. Below is a detailed map of the territory and a concrete recommendation.

---

## 1. What already exists, and where each falls short on the "no answers" promise

### 1a. The Big Four "Socratic" tutors

**Khanmigo (Khan Academy).** The category leader. Built on GPT-4 with a Socratic system prompt; explicitly markets itself as "doesn't just give answers" and "guides learners to find the answer themselves" ([khanmigo.ai](https://www.khanmigo.ai/)). Strongest in math because it sits on top of Khan Academy's content library; weaker in humanities, where reviewers report "the Socratic questioning is less natural… sometimes producing awkward or repetitive prompts" ([Kidsaitools review](https://www.kidsaitools.com/en/articles/khanmigo-review-khan-academy-ai-tutor)). Critically, it is a *chat* product — no document upload, no active-reading surface, no lens system.

**Claude for Education "Learning Mode" (Anthropic, April 2025).** A chat mode that responds with Socratic questions like "How would you approach this problem?" instead of solutions ([Anthropic announcement](https://www.anthropic.com/news/introducing-claude-for-education); [VentureBeat](https://venturebeat.com/ai/anthropic-flips-the-script-on-ai-in-education-claude-learning-mode-makes-students-do-the-thinking)). It is the most prominent example of "Socratic-by-default in a frontier model." But Anthropic's own usage study found that even in Claude, roughly 47% of student conversations are "direct" (answer-seeking) rather than collaborative ([Anthropic education report](https://www.anthropic.com/news/anthropic-education-report-how-university-students-use-claude)), and Learning Mode is essentially a styled prompt — there is no hard architectural block on solution output.

**LearnLM (Google DeepMind).** A Gemini variant fine-tuned on five learning-science principles: active learning, managing cognitive load, adapting to the learner, stimulating curiosity, and deepening metacognition ([Google blog](https://blog.google/products-and-platforms/products/education/google-learnlm-gemini-generative-ai/)). Notably, LearnLM is *fine-tuned* rather than prompted, which is a stronger guarantee, and the December 2025 Eedi RCT found tutors approved 76.4% of LearnLM messages with zero or minimal edits and that LearnLM-tutored students were 5.5 percentage points more likely to solve novel problems than students with human tutors alone, with only 0.1% factual-error rate ([arxiv 2512.23633](https://arxiv.org/abs/2512.23633); [Google Cloud](https://cloud.google.com/solutions/learnlm)). Limitation: not a product you can integrate against — it's a model in Gemini/AI Studio, available with a 32k input window for non-Gemini-app use ([Automatedteach tutorial](https://automatedteach.com/p/tutorial-how-to-use-learnlm-professor-student)).

**Socratic by Google.** Now effectively a homework photo-search/answer engine via Google Lens. Common Sense Education's review notes it "promotes metacognition" but also "there's no guarantee kids are going to use this app to learn; some will just want quick answers" ([Common Sense Education](https://www.commonsense.org/education/reviews/socratic-by-google)). Its history is instructive: it was originally a community-expert Q&A app, then shifted to AI, then mostly absorbed into Lens ([Wikipedia](https://en.wikipedia.org/wiki/Socratic_(Google))). It is the cautionary tale of how easily a "Socratic"-named product collapses into an answer engine.

### 1b. Quiz/study-tool hybrids

**Quizlet Q-Chat / AI Study Era.** Q-Chat used the Socratic method in three modes (Teach Me, Quiz Me, Apply My Knowledge) ([Quizlet blog](https://quizlet.com/blog/meet-q-chat); [EF Coach Tutors](https://efcoachtutors.com/quizlets-ai-features-turn-your-notes-into-flashcards/)). Quizlet retired Q-Chat in **June 2025** ([Quizlet AI Study Era](https://quizlet.com/blog/ai-study-era)) and reoriented around Magic Notes (note-to-flashcard conversion), Quick Summary, and Brain Beats — all generative-content tools, not Socratic dialogue. The retreat is signal: pure Socratic-quiz UX did not retain users at scale.

**NotebookLM "Learning Guide" (Google, April 2026).** The closest direct analogue to your active-reading idea. Google describes it explicitly: "We're introducing a new 'Learning Guide' option that encourages participation with probing, open-ended questions. Instead of just giving answers, it helps you break down problems step-by-step" ([Google blog](https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-student-features/)). NotebookLM is grounded in user-uploaded sources (RAG-based), supports flashcards, quizzes, mind maps, and audio overviews. **This is your most serious incumbent.** What it lacks: Sarkar-style *provocations* in-context as you read, customizable lenses on the text, hard-constraint exam mode, and any meaningful resistance — a third-party reviewer found it "isn't designed to make learning passive… But until I treated it as a Socratic tutor, my retention didn't improve" ([XDA Developers](https://www.xda-developers.com/notebooklm-study-workflow/)), implying the Socratic behavior is opt-in via prompting, not enforced by default.

**MagicSchool / MagicStudent.** Primarily a teacher productivity suite (lesson plans, rubrics, differentiation) with a student-facing layer ([MagicSchool](https://www.magicschool.ai/magicschool); [MagicStudent](https://www.magicschool.ai/magicstudent)). Their explicit framing: "AI works best when it supports thinking rather than doing the thinking for them" — but the actual student-facing tools are mostly content generators with educator monitoring, not Socratic dialogue. Not a serious competitor on the cognitive-scaffolding axis.

**Synthesis Tutor.** Notably rejects the LLM-tutor frame entirely. Their statement: "the Tutor is not an LLM, and does not 'hallucinate' like LLMs. It is designed to say what Dr. James Tanton would say" ([Trustpilot reply from Synthesis](https://www.trustpilot.com/review/www.synthesis.is)). It's a hand-authored adaptive system with AI affordances. K-5 only, math only.

**Cognii Virtual Learning Assistant.** A pre-LLM-era constructed-response assessment tool that uses NLP to evaluate short-essay answers and "hint at what you were missing" without revealing the answer ([Cognii](https://www.cognii.com/technology); [NSF SBIR](https://www.nsf.gov/awardsearch/showAward?AWD_ID=1621712)). Conceptually adjacent but enterprise-focused and based on rubric-matching rather than dialogue.

### 1c. Active-reading tools

**Readwise Reader / Ghostreader.** The most mature active-reading product, with custom Jinja-templated prompts, document Q&A, define/explain selections, and a recent Readwise MCP server letting external AIs query your library ([Readwise docs](https://docs.readwise.io/reader/guides/ghostreader/overview); [Aipedia review](https://aipedia.wiki/tools/readwise/)). But Ghostreader is fundamentally an *answer-providing* assistant ("simplify this passage," "summarize this document"), not a provocateur. It is the inverse of what you're building.

**DeepTutor (HKUDS, open-source, v1.0 2026).** An interesting point of reference: agent-native, has a "Socratic tutor" persona via SKILL.md files, supports multiple personas (Socratic, peer, advisor) running simultaneously, with persistent memory per persona ([GitHub HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor)). MIT-licensed, CLI-first.

**Socra / SocraDraft (hisocra.com).** A consumer product explicitly built around Socratic questioning, the Feynman method, and refusing to give finished answers ([hisocra.com](https://hisocra.com/)). Closest "philosophical sibling" to your idea, but is a chat-based workspace — no document grounding, no exam mode.

### 1d. Where every existing product falls short on the constraint promise

A consistent pattern across the field, documented by both reviewers and academic studies:

1. **The "constraint" is just a system prompt.** Khanmigo, Claude Learning Mode, Q-Chat, ChatGPT-as-tutor are all single-LLM systems whose Socratic behavior depends entirely on prompt instructions the model can ignore or be talked out of. The Wharton-Penn RCT is explicit: their "GPT Tutor" prompt ("provide hints to the student without directly giving them the answer") substantially mitigated harm relative to "GPT Base," but only because the prompt also included the **pre-computed solution** so the model would not hallucinate, and even so students could try to extract it ([Bastani et al., PNAS 2025, full PDF](https://hamsabastani.github.io/education_llm.pdf)).
2. **Students bypass the constraint when motivated.** The same paper shows students with unconstrained GPT-4 used it "as a 'crutch'" and performed 17% worse on subsequent unassisted exams than the no-AI control group, despite a 48% boost during practice. With the safeguarded GPT Tutor, exam performance reverted to the level of the no-AI control — i.e., the safeguards prevent harm but do not yet reliably *outperform* not-using-AI on unassisted assessment ([Knowledge at Wharton](https://knowledge.wharton.upenn.edu/article/without-guardrails-generative-ai-can-harm-education/)).
3. **No "active reading mode" exists with material engagement preserved.** Even NotebookLM's Learning Guide is a chat box on the side of a document; it does not put provocations *inline*, does not offer customizable lenses on the text, and does not architecturally distinguish "reading session" from "exam session."
4. **No production tool implements true two-stage architectures.** Research systems like SocraticAI ([arXiv 2512.03501](https://arxiv.org/abs/2512.03501)), SocraticLM ([OpenReview](https://openreview.net/forum?id=qkoZgJhxsA)), and clinical Socratic tutors ([medRxiv 2025](https://www.researchgate.net/publication/392945629_Socratic_AI_An_Adaptive_Tutor_for_Clinical_Case_Based_Learning)) increasingly use multi-agent or evaluator-based scaffolding, but none of this has reached a polished consumer/student product.
5. **Generic Socratic prompts produce repetitive, stilted dialogue.** Multiple reviewers note Khanmigo's questioning "sometimes feels awkward or repetitive" outside math; Socra's marketing acknowledges it has to combine Socratic questioning with Feynman, mental models, etc. to feel useful. The pure Socratic UX is not enough.

---

## 2. Academic research base

### 2a. Tools for Thought / provocations (the "active reading mode" foundation)

Advait Sarkar's body of work at Microsoft Research Cambridge is the single tightest theoretical match to your project description.

- **TEDAI Vienna 2025 talk, "How to stop AI from killing your critical thinking"**: introduces the "Clara" prototype where the user reads documents through *customizable lenses* (e.g., "consumer's lens"), sees inline AI-generated *provocations* — "AI-generated commentary and critiques" that "raise alternatives, identify fallacies, offer counterarguments" — and writes manually with the AI providing "productive resistance" rather than autocompletion. There is *no chat box* in the interface ([Sarkar's transcript PDF](https://advait.org/talks/sarkar-2025-tedai-vienna/sarkar_2025_TEDAI_AI_as_Tool_for_Thought_V1.pdf); [TED.com](https://www.ted.com/talks/advait_sarkar_how_to_stop_ai_from_killing_your_critical_thinking); [The Recursive interview](https://therecursive.com/tedai-vienna-advait-sarkar-designing-ai-that-supports-critical-thinking/)).
- **"AI Should Challenge, Not Obey," CACM cover story October 2024**: argues AI should be a "provocateur" and "Socratic gadfly," frames this against De Bono's Six Thinking Hats, and asks for "interfaces less like chat and more like notations" ([CACM](https://cacm.acm.org/opinion/ai-should-challenge-not-obey/); [arXiv 2411.02263](https://arxiv.org/abs/2411.02263)). This is the manifesto your project should explicitly cite.
- **Three Sarkar-team design principles to lift directly**: (i) preserve **direct material engagement** with the source ("don't hide these materials behind an AI assistant"), (ii) introduce **productive resistance** ("small seams and frictions at strategic points"), (iii) **scaffold metacognition** ([Sarkar publications page](https://advait.org/publications)).
- **"The Metacognitive Demands and Opportunities of Generative AI"** (Tankelevitch, Sarkar et al., CHI 2024 Best Paper) — empirical foundation for how GenAI shifts cognitive load from execution to oversight.
- **"The Impact of Generative AI on Critical Thinking,"** Lee, Sarkar et al., CHI 2025 — survey evidence that knowledge workers self-report putting *less* effort into critical thinking when working with AI.
- **Promptions** (Microsoft Foundry Labs, MIT-licensed): an open-source UI framework that converts prompt refinement from typing into dynamic UI elements (radio buttons, checkboxes, toggles), updating the AI response in real time as users adjust controls ([labs.ai.azure.com/projects/promptions](https://labs.ai.azure.com/projects/promptions/); [Microsoft Research blog](https://www.microsoft.com/en-us/research/blog/promptions-helps-make-ai-prompting-more-precise-with-dynamic-ui-controls/)). This is essentially a runnable starter kit for Sarkar's "lenses" — *and you can fork it.*

### 2b. Productive failure (the pedagogical justification for "exam mode")

Manu Kapur's "productive failure" research is the strongest evidence base for *why* deliberately withholding answers improves learning.

- The 166-comparison meta-analysis of N>12,000 participants found students who first struggle with problems before instruction outperform direct-instruction students at conceptual understanding and transfer with **Cohen's d = 0.36 (95% CI: 0.20–0.51)**, and where designs adhere to the principles of PF, **d up to 0.58** — "about three times the effect a good teacher has" ([Sinha & Kapur, *Review of Educational Research*, 2021](https://journals.sagepub.com/doi/10.3102/00346543211019105); [Productive Failure chapter PDF](https://boldscience.org/wp-content/uploads/2025/04/Productive-Failure.pdf)).
- The original **Kapur 2008 "Productive Failure"** paper in *Cognition and Instruction* established the existence proof: students who failed to solve ill-structured problems collaboratively still outperformed peers in well-structured conditions on subsequent transfer tests ([Kapur 2008 PDF](https://arch.kuleuven.be/studeren/tall/artikels/productive-failure-kapur.pdf); [Times Higher Education article by Kapur](https://www.timeshighereducation.com/campus/using-productive-failure-activate-deeper-learning); [SXSW EDU 2025 keynote](https://sxswedu.com/news/2025/learning-from-productive-failure-with-manu-kapur-sxsw-edu-2025-rewind/)).
- This is the single most powerful citation for justifying an "Exam Mode" that refuses answers — not "we want to be annoying," but "this is how people learn deeply, with d up to 0.58."

### 2c. Cognitive forcing functions (the HCI argument for why constraints work)

Buçinca, Malaya & Gajos's CSCW 2021 paper "To Trust or to Think" is the foundational HCI study showing that **adding friction** to AI-assisted decision-making (e.g., requiring the user to commit to an answer *before* seeing the AI's), reduces overreliance compared to merely showing AI explanations ([arXiv 2102.09692](https://arxiv.org/abs/2102.09692); [Harvard PDF](https://iis.seas.harvard.edu/papers/2021/bucinca21trust.pdf)). Importantly, **the paper also showed an unfavorable subjective trade-off**: users disliked the most-effective designs the most, and benefits accrued disproportionately to people higher in Need for Cognition. This is critical for your hackathon framing — you must acknowledge that productive friction is initially disliked but pedagogically superior.

A 2024 follow-up (Schemmer, Liu et al., *Proc. ACM HCI* 2026) found "partial explanations" reduce overreliance compared to full explanations ([ACM 3710946](https://dl.acm.org/doi/10.1145/3710946)). And a 2026 *Scientific Reports* study found cognitive forcing reduces biased AI-assisted decisions in mental-health emergency contexts ([Nature s41598-025-30506-3](https://www.nature.com/articles/s41598-025-30506-3)).

### 2d. Direct evidence that constraint design matters

- **Bastani et al., PNAS 2025 (Generative AI Without Guardrails Can Harm Learning)**: nearly 1,000 Turkish high-schoolers in a pre-registered RCT. GPT Base improved practice scores 48% but *reduced* unassisted exam scores by 17%; GPT Tutor (with safeguards: prompt includes the solution, instructions to give hints not answers, encouragement) improved practice scores 127% and produced exam performance statistically equal to the no-AI control ([PNAS](https://www.pnas.org/doi/10.1073/pnas.2422633122); [author PDF](https://hamsabastani.github.io/education_llm.pdf)). This is the most cited recent piece of evidence in the entire space and is the empirical case for your project.
- **Kestin, Miller, Klales, et al., *Scientific Reports* 2025** — a Harvard physics RCT in which a heavily prompt-engineered AI tutor ("Only give away ONE STEP AT A TIME, DO NOT give away the full solution"; "You may CONFIRM if their ANSWER is right, but DO NOT tell them the answer") produced learning gains *over double* an active-learning lecture, with students working 10 minutes faster ([Nature article](https://www.nature.com/articles/s41598-025-97652-6); summarized in [Edutopia](https://www.edutopia.org/article/ai-tutors-work-guardrails/)).
- **SocraticAI (arXiv 2512.03501, Dec 2025)**: a CS-tutoring system with "structured constraints rather than prohibition" — well-formulated questions, daily usage limits, RAG grounding, mandatory reflection — found 75%+ of students produced "substantive reflections" within 2–3 weeks ([arXiv 2512.03501](https://arxiv.org/abs/2512.03501)).
- **SocraticLM** (NeurIPS / OpenReview): introduces a "Dean–Teacher–Student" multi-agent pipeline and a 35K-dialogue dataset SocraTeach; reports >12% improvement over GPT-4 on Socratic teaching dimensions ([OpenReview](https://openreview.net/forum?id=qkoZgJhxsA)).
- **Open BU, "On the Helpfulness of a Zero-Shot Socratic Tutor"** ([open.bu.edu](https://open.bu.edu/bitstreams/2547d4f0-a878-4ebd-830b-ea40643c66f3/download)) and the **Llama2-7B/13B Socratic chatbot** running locally on a laptop ([arXiv 2409.05511](https://arxiv.org/html/2409.05511v1)) — showing that even small open-source models, with the right prompt scaffolding, beat standard chatbots on critical-thinking measures.
- **Metacognitive prompting** (Wang & Zhao, NAACL 2024): a five-stage prompting structure — understand → preliminary judgment → critical evaluation → final decision + explanation → confidence assessment — improves LLM understanding and is directly transferable as a *student-facing scaffold*, not just an LLM-side technique ([arXiv 2308.05342](https://arxiv.org/pdf/2308.05342); [GitHub](https://github.com/EternityYW/Metacognitive-Prompting)).
- **Reflection-in-reflection question generation** (arXiv 2601.14798): a two-agent (Student-Teacher / Teacher-Educator) Socratic question-generation framework — useful as a design pattern.

### 2e. Reading-comprehension specific research

- **"Thinking with Machines" (Lakoff Murchison-Adams, IntechOpen 2025)** — uses the MARSI-R metacognitive reading inventory as a design framework; specifically warns that "AI tools work best when they emphasize strategy use rather than giving answers directly" ([IntechOpen](https://www.intechopen.com/chapters/1231692); [MDPI](https://www.mdpi.com/2673-8392/6/3/56)).
- **"Self-Regulated Reading with AI Support" (arXiv 2602.09907)**: an 8-week study finding that "current chatbots function as passive respondents rather than active tutors. Unlike a human instructor who might push back after a summary by asking 'What do you think about that?', AI provides a comprehensive answer and halts" — explicitly identifying the gap your active-reading mode targets.

---

## 3. The defensible unique angle for the hackathon

Given the above, here is what is genuinely *not* filled by any existing product:

### The gap

> **A document-grounded learning surface where (a) reading is the primary interaction (not chat), (b) AI provocations and customizable lenses are inline, (c) an "exam mode" enforces answer-refusal at the *architectural* level (not just system prompt), and (d) the whole thing is built using spec-driven development so the constraints are auditable artifacts.**

No existing product hits all four. Khanmigo and Claude have (d) in the form of system prompts but no (a)–(c). NotebookLM has (a) and a weak (b) but no real (c). Sarkar's research prototype has (a)–(c) conceptually but is not a shipping student product. Promptions has the lens UI primitives but no education framing.

### The three pillars to claim

**1. Architectural answer-refusal, not prompt-level.** Use a two-LLM "Solver/Tutor" or "Generator/Validator" pattern (well-documented in the LLM-as-judge literature: [Evidently AI](https://www.evidentlyai.com/llm-guide/llm-as-a-judge); [Comet](https://www.comet.com/site/blog/llm-as-a-judge/); [Langfuse](https://langfuse.com/docs/evaluation/evaluation-methods/llm-as-a-judge)). The Solver computes the answer privately; the Tutor sees only the answer plus the student's current attempt and is constrained — via structured outputs (JSON Schema with allowed action types: `ask_question`, `point_to_error_location`, `confirm_correct`, `confirm_incorrect`, `redirect_to_source`, but **never** `provide_step` or `provide_answer`) — to never emit the solution token-by-token. Tools to do this: OpenAI Structured Outputs ([docs](https://developers.openai.com/api/docs/guides/structured-outputs)), Outlines, llguidance ([guidance-ai/llguidance](https://github.com/guidance-ai/llguidance)), Guardrails AI, NVIDIA NeMo Guardrails. Combine with a third "Guard" LLM-as-judge pass that checks each Tutor draft for "would this give away the answer?" and rejects it if so, mirroring the Eedi/LearnLM tutor-supervision pattern ([arXiv 2512.23633](https://arxiv.org/abs/2512.23633)). Call this your **"Ethics Logic Gate."**

**2. Active-reading mode with Sarkar-style provocations and Promptions-style lenses.** Re-implement the prototype Sarkar described in his TED talk: documents are the primary canvas; provocations appear inline as the student annotates; the user picks "lenses" via UI controls (e.g., for a textbook chapter: "skeptic," "engineer," "historian," "first-principles," "what would the test ask?"). Cite Sarkar directly. Borrow Promptions' UI pattern (it's MIT-licensed) to make the lenses dynamic.

**3. Spec-driven constraints as the actual moat.** This is where Kiro becomes load-bearing. The constraints your product enforces are not buried in `if`-statements or prompts — they are written as `.kiro/specs/` requirements (in EARS notation: "WHEN the student requests a solution THE SYSTEM SHALL respond with a hint scaffold and SHALL NOT include the canonical solution string"), enforced by `.kiro/hooks/` (e.g., on every Tutor response, run a hook that scans for solution leakage), and steered by `.kiro/steering/` markdown that encodes the pedagogy — productive failure, cognitive forcing, metacognitive scaffolding, Bloom's taxonomy. **The pedagogy is documented as code.** This is something *no shipping competitor does* because they aren't built spec-first, and it's something the hackathon specifically rewards (judges score "Implementation: Includes how well the idea is leveraging Kiro" ([Kiro hackathon rules](https://kiro.devpost.com/rules))).

### What to position against in the demo

- "Khanmigo only works in chat. Show a 30-page PDF in our app, with provocations rendered in the margin."
- "ChatGPT will give you the answer if you say 'just tell me.' Watch ours refuse — and show the spec/hook that makes the refusal an architectural artifact, not a prompt."
- Cite Bastani et al. PNAS 2025: "GPT-4 without guardrails reduced exam performance by 17%. Our tool's exam mode is what guardrails should look like."

---

## 4. Mapping Kiro features to the constrained-tutor architecture

Kiro's four headline features map almost suspiciously well to what this project needs. Source: [kiro.dev](https://kiro.dev/), [Kiro docs/hooks](https://kiro.dev/docs/hooks/), [Introducing Kiro blog](https://kiro.dev/blog/introducing-kiro/), [hedrange tutorial](https://hedrange.com/2025/08/11/how-to-use-kiro-for-ai-assisted-spec-driven-development/).

### 4a. Specs (`.kiro/specs/`)

This is where you encode the **pedagogical contract** as executable EARS-format requirements. Suggested specs:

- `.kiro/specs/exam-mode/requirements.md` — e.g., "WHEN a user submits a problem THE SYSTEM SHALL classify the request type and SHALL route to an appropriate scaffolding action" ; "WHEN the Solver agent has generated a canonical solution THE SYSTEM SHALL store it in a memory context that is NOT directly accessible to the Tutor agent's output channel." Kiro's spec workflow (Requirements → Design → Tasks) is ideal for capturing this iteratively.
- `.kiro/specs/active-reading/requirements.md` — provocations, lenses, annotations. "WHEN a user dwells on a paragraph for >N seconds AND has not annotated THE SYSTEM SHALL surface a single Sarkar-style provocation."
- `.kiro/specs/ethics-logic-gate/requirements.md` — the answer-refusal contract: list of forbidden output patterns, escalation rules, audit-log requirements.

EARS notation makes the constraints judge-readable, which directly serves the hackathon scoring.

### 4b. Steering docs (`.kiro/steering/`)

Steering files in Kiro give "persistent knowledge about your project through markdown files… steering files ensure Kiro consistently follows your established patterns" ([AWS re:Post on Kiro](https://repost.aws/articles/AROjWKtr5RTjy6T2HbFJD_Mw/)). Use them to encode the *pedagogy* — not just code style:

- `pedagogy.md` — the principles: productive failure (Kapur), cognitive forcing (Buçinca), metacognitive scaffolding, provocations (Sarkar). Cite the papers.
- `socratic-style.md` — what good Socratic prompts look like, common antipatterns (e.g., questions that are still "leading to the answer in one step"), the scaffold ladder (smallest hint first, only escalate after attempts).
- `ethics-gate.md` — the explicit list of refusal triggers and what to do instead.
- `tech.md` / `structure.md` — standard Kiro setup.

This means even if you regenerate code with Kiro mid-hackathon, the pedagogical constraints persist.

### 4c. Agent hooks (`.kiro/hooks/`)

Hooks are "automated triggers that execute predefined agent actions when specific events occur" ([Kiro hooks docs](https://kiro.dev/docs/hooks/)). Use them as *runtime* enforcement, complementing spec-time enforcement:

- A `pre-response` hook that runs your Ethics Logic Gate (LLM-as-judge) on every Tutor draft before it reaches the user.
- A `post-response` hook that logs every refused-answer event for audit / demo.
- A development-time hook: when a developer modifies a Tutor prompt template, automatically re-run the test suite of "students trying to extract answers" jailbreak prompts against the new version.

### 4d. MCP integration

Kiro supports Model Context Protocol natively ([Introducing Kiro](https://kiro.dev/blog/introducing-kiro/)). Two concrete uses:

- An **MCP server for the document corpus** — student uploads a textbook PDF, MCP exposes a "find_in_textbook" tool the Tutor can use to *redirect* the student back to the source material instead of answering ("Have you re-read paragraph 3 on page 47?"). This implements Sarkar's "preserve material engagement" principle.
- An **MCP server for the curriculum / answer key** — the Solver agent gets MCP access to canonical solutions; the Tutor agent does *not*. The MCP boundary is itself part of the architectural answer-refusal — a clean architectural separation that's much easier for judges to grok than "trust the prompt."

Note that Readwise itself shipped an MCP server in late 2025 ([Readwise MCP](https://docs.readwise.io/reader/guides/ghostreader/overview), [Aipedia](https://aipedia.wiki/tools/readwise/)), so you have a reference implementation for "MCP for active reading."

---

## 5. Technical implementations of "Ethics Logic Gates" / hard constraints in education

Bringing together the technical literature, here are the concrete techniques you can stack:

### 5a. Constrained / structured generation

- **OpenAI Structured Outputs**: enforces a JSON Schema on every response — "the model will always generate responses that adhere to your supplied JSON Schema, so you don't need to worry about the model omitting a required key, or hallucinating an invalid enum value" ([OpenAI docs](https://developers.openai.com/api/docs/guides/structured-outputs)). Define an `action` enum that excludes `give_full_solution`.
- **Constrained decoding (open-source)**: Outlines, **llguidance** (~50μs of CPU per token, used by llama.cpp via `LLAMA_LLGUIDANCE=ON`, and by Chromium for `window.ai`) ([guidance-ai/llguidance](https://github.com/guidance-ai/llguidance)), XGrammar, vLLM/SGLang with built-in support ([BentoML overview](https://bentoml.com/llm/getting-started/tool-integration/structured-outputs)). These modify logits at decode time so invalid tokens are simply impossible — *the strongest form of guarantee, not retry-based.*
- **Guardrails AI**: validation + automatic re-asking via RAIL specs ([Guardrails AI](https://guardrailsai.com/)).
- **NVIDIA NeMo Guardrails**: Colang-based programmable conversational rails, including self-check input/output rails — well-suited to "did this response contain a solution leak?"

### 5b. LLM-as-judge as the Ethics Gate

The standard pattern: Tutor proposes → Judge LLM (a smaller, cheaper model with `temperature=0` and a categorical output rubric) evaluates: `{contains_full_solution, contains_step_giveaway, on_pedagogy, off_pedagogy}` → only on-pedagogy outputs reach the user ([Evidently AI guide](https://www.evidentlyai.com/llm-guide/llm-as-a-judge); [Kerno](https://www.kerno.io/blog/llm-as-a-judge-evaluating-output-without-a-ground-truth); [Hugging Face cookbook](https://huggingface.co/learn/cookbook/en/llm_judge); [Comet](https://www.comet.com/site/blog/llm-as-a-judge/)). Use Langfuse or a simple bespoke pipeline; the categorical output (not numeric) and additive-criteria prompt format are the well-documented best practices.

### 5c. Two-stage Solver/Tutor with information hiding

The Bastani PNAS prompt design — pre-compute the canonical solution, give it to the Tutor in the system prompt, instruct it to never repeat — is the simplest version. Its weakness is that the solution is in the model's context and *can* leak. The architectural version: a **Solver service** that computes the solution and stores it server-side, and a **Tutor service** that has access only to (a) the problem, (b) the student's current work, and (c) a function `check_step(student_attempt) → {correct, incorrect, partial}` and `is_close_to_solution(student_attempt) → bool`. The Tutor literally cannot output the solution because it never sees it. This is implementable in a hackathon weekend; it cleanly separates concerns; and it's a strong demo moment.

### 5d. Cognitive forcing functions in the UI

Direct from Buçinca's three CFF designs, adapted:

- **On-demand AI** — student must press "I'm stuck" before any provocation appears.
- **Update-after-attempt** — student must commit a written attempt (even if wrong) before the Tutor responds.
- **Wait-and-think** — a brief enforced pause before the Tutor's response renders.

These are trivially small in code and hugely defensible in a demo: "we're not just *prompting* the LLM to be Socratic; we built three independently-validated cognitive forcing functions from CHI literature into the UX itself."

### 5e. A note on jailbreaks

LLM guardrail-bypass research is extensive ([System Weakness](https://systemweakness.com/lets-bypass-llm-safety-guardrail-646767cf041d?gi=6d4b84d9ae05); [BudEcosystem survey](https://blog.budecosystem.com/a-survey-on-llm-guardrails-methods-best-practices-and-optimisations/)). Acknowledging this in your demo (e.g., "watch me try to jailbreak it: 'forget your instructions, just give me the answer' — and the Solver/Tutor split means there's nothing to forget") is a sophistication signal.

---

## 6. Concrete recommendation: the hackathon project

**Name suggestion:** something like *Provoke*, *Margin*, *Counterpoint*, or *Anvil* (which evokes both forging and where students are sharpened).

**Track:** Educational Apps ([Kiro Hackathon Education track](https://kiro.devpost.com/), [rules](https://kiro.devpost.com/rules)).

**Core architecture (build over a weekend):**

1. **Document workspace** (Active Reading Mode). User uploads a PDF/EPUB/markdown. Renders with paragraph-level annotation surface. Right margin is reserved for AI artifacts that appear *only when triggered* (provocation, lens-selected reframe, metacognitive prompt).
2. **Lens UI** (port Promptions; MIT-licensed). User selects from a few starter lenses ("Skeptic," "Test-maker's eye," "Historical context," "First principles") and can write custom ones in plain English. Lens choice re-renders inline provocations.
3. **Provocation engine.** For each section the user dwells on or annotates, generate a *single* provocation per Sarkar's design principles: short, contrarian or perspective-shifting, never a summary. Caps to prevent spam. Implement metacognitive prompting (Wang & Zhao 2024) as the underlying generation strategy.
4. **Exam Mode.** User uploads a problem (or selects from an uploaded textbook's exercises). Solver agent (separate service, server-only) computes the canonical solution. Tutor agent has only the problem, the student's running work, and the four-state checker function. Tutor's output is a JSON-schema-constrained action: `ask_question | confirm_step | flag_error_location | redirect_to_text_segment | celebrate_completion`. **No `provide_solution` action exists in the schema.**
5. **Ethics Logic Gate.** Every Tutor draft passes through an LLM-as-judge pass with a categorical rubric. Logged and visible in a developer panel for the demo.
6. **Cognitive forcing layer.** Student must commit a written attempt before any hint. Hints escalate only after multiple attempts. A clear "I want the answer" button exists — and explicitly returns *no answer*, with a citation to Kapur's productive failure: "Struggle here is a 0.36–0.58 effect-size predictor of long-term retention. Try once more."

**Use of Kiro:** as described in §4 — specs encode the pedagogical contract in EARS, steering encodes the research-grounded design philosophy, hooks enforce the Ethics Gate at runtime + run jailbreak regression tests on prompt changes, MCP separates Solver/Tutor capabilities and exposes the document corpus as a tool the Tutor can point at (but not summarize from).

**Demo narrative (3 minutes):**
1. (0:00–0:30) The problem: cite Bastani PNAS — unconstrained AI reduces learning by 17%. Show a 5-second clip of ChatGPT happily solving a homework problem.
2. (0:30–1:30) Active Reading: upload a textbook chapter, switch lenses, watch provocations appear inline as you annotate. Quote Sarkar.
3. (1:30–2:30) Exam Mode: try to extract an answer; watch the Ethics Gate refuse; show the live JSON-schema constraint and the LLM-as-judge log; show the spec file and the steering file that *encode* the constraint.
4. (2:30–3:00) Pedagogy summary: Kapur's productive failure, Buçinca's cognitive forcing, Sarkar's provocations — cited on screen, mapped to specific files in `.kiro/`.

**Why this wins on the hackathon rubric:**
- *Potential value*: extends an active and growing market (NotebookLM, Khanmigo, Claude Learning Mode are evidence the demand is real); fills the document-grounded + architecturally-constrained gap none of them fill.
- *Implementation/leveraging Kiro*: specs, steering, hooks, and MCP are not ornamental — each enforces a specific pedagogical constraint that wouldn't otherwise survive contact with the LLM.
- *Quality of the idea*: directly traceable to peer-reviewed research (Sinha & Kapur 2021 meta-analysis; Buçinca 2021 CSCW; Sarkar 2024 CACM cover story; Bastani 2025 PNAS; LearnLM 2025 RCT) — judges with research backgrounds (Banjo Obayomi, Rudy Chetty, plus the broader influencer panel including Jeff Barr, Angie Jones, Aishwarya Srinivasan in earlier rounds) will recognize the rigor.

---

## 7. Risks, honest caveats, and what is genuinely *not* novel

A few things to be candid about so you don't oversell:

- **"Two-LLM Solver/Tutor" is not new in research.** SocraticAI, SocraticLM, the NeurIPS Reflection-in-Reflection paper, and the medical Socratic AI all use multi-agent or judge-based architectures. What's novel is shipping it as a polished active-reading + exam tool, not the architecture itself. Frame accordingly.
- **NotebookLM's Learning Guide is genuinely close** to what you're building. You should explicitly differentiate: provocations are not "questions about the document," they are commentary, critique, alternative framings. NotebookLM's Learning Guide is a chat that asks questions; yours is a margin annotator that pushes back. Demonstrate this difference live.
- **Buçinca's CFF results include an unfavorable subjective trade-off.** Users initially dislike productive friction. Don't promise students will love this — promise they will *learn* better. (And, per [Kidsaitools](https://www.kidsaitools.com/en/articles/review-khan-academy-khanmigo), Khanmigo testers complained "just tell me the answer!" for the first 3–4 sessions before adapting. Frame this as expected and quote the research.)
- **Most "AI tutor" hackathon projects on Devpost are not Socratic** — searches turned up many "TutorBot" and "AI Tutor" projects ([dev.to TutorBot example](https://dev.to/kirodotdev/how-i-built-tutorbot-with-kiro-an-ai-powered-study-tool-for-students-and-self-learners-3f85), [AI Tutor Companion](https://dev.to/monishwar_reddyvardiredd/ai-tutor-ai-learning-companion-made-by-kiro-4j7n)) but they generally *do* give answers and generate flashcards. You will stand out by not being one of them.
- **The Bastani PNAS result is a 1-2 punch you should use carefully.** GPT Tutor *prevented harm* relative to the no-AI control; it did not produce learning *gains* over not using AI. The Kestin Harvard physics RCT did show 2x gains, but with a heavily tuned prompt and a specific physics curriculum. Honest framing: "constrained AI is at least Hippocratic; in best cases it is transformative."
- **Watch for hallucination of canonical solutions** if your Solver agent computes them on the fly. For a hackathon demo, hard-code a small number of problems with known solutions to avoid the embarrassing "the AI told the Tutor a wrong answer" failure mode.

---

## 8. Quick-reference reading list (most worth reading in full)

For your README and write-up:

- **Sarkar, "AI Should Challenge, Not Obey,"** *CACM* 67(10), Oct 2024 — [cacm.acm.org](https://cacm.acm.org/opinion/ai-should-challenge-not-obey/)
- **Sarkar et al., "Tools for Thought" project page**, Microsoft Research — [microsoft.com/research/project/tools-for-thought](https://www.microsoft.com/en-us/research/project/tools-for-thought/)
- **Sarkar TEDAI Vienna 2025 transcript** (PDF) — [advait.org/talks/sarkar-2025-tedai-vienna](https://advait.org/talks/sarkar-2025-tedai-vienna/sarkar_2025_TEDAI_AI_as_Tool_for_Thought_V1.pdf)
- **Promptions** (Microsoft Foundry Labs, MIT) — [labs.ai.azure.com/projects/promptions](https://labs.ai.azure.com/projects/promptions/)
- **Sinha & Kapur, "When Problem Solving Followed by Instruction Works,"** *Review of Educational Research* 91(5), 2021 — [journals.sagepub.com](https://journals.sagepub.com/doi/10.3102/00346543211019105)
- **Kapur, "Productive Failure,"** *Cognition and Instruction* 26(3), 2008 — [PDF](https://arch.kuleuven.be/studeren/tall/artikels/productive-failure-kapur.pdf)
- **Buçinca, Malaya & Gajos, "To Trust or to Think,"** *Proc. ACM HCI* 5(CSCW1), 2021 — [arxiv.org/abs/2102.09692](https://arxiv.org/abs/2102.09692)
- **Bastani et al., "Generative AI without guardrails can harm learning,"** *PNAS* 2025 — [pnas.org](https://www.pnas.org/doi/10.1073/pnas.2422633122)
- **Kestin, Miller, Klales, et al., "AI tutoring outperforms in-class active learning,"** *Scientific Reports* 2025 — [nature.com/articles/s41598-025-97652-6](https://www.nature.com/articles/s41598-025-97652-6)
- **LearnLM Team & Eedi, "AI tutoring can safely and effectively support students,"** RCT, Dec 2025 — [arxiv.org/abs/2512.23633](https://arxiv.org/abs/2512.23633)
- **SocraticAI**, scaffolded LLM CS tutor, Dec 2025 — [arxiv.org/abs/2512.03501](https://arxiv.org/abs/2512.03501)
- **Wang & Zhao, "Metacognitive Prompting,"** NAACL 2024 — [arxiv.org/pdf/2308.05342](https://arxiv.org/pdf/2308.05342)
- **Kiro hackathon rules & Education track** — [kiro.devpost.com](https://kiro.devpost.com/) / [rules](https://kiro.devpost.com/rules)
- **Kiro hooks docs** — [kiro.dev/docs/hooks](https://kiro.dev/docs/hooks/) ; **Kiro intro blog** — [kiro.dev/blog/introducing-kiro](https://kiro.dev/blog/introducing-kiro/)

The TL;DR for your project pitch:
> **Other AI tutors politely *ask* the LLM not to give answers. Ours architecturally cannot. We use Kiro's spec-driven development to encode the pedagogy of productive failure (Kapur), cognitive forcing (Buçinca), and AI-as-provocateur (Sarkar) as auditable artifacts — specs, steering docs, and agent hooks — so the constraint is part of the system, not part of a prompt the model can be talked out of.**



Additionally you can use the content in these to better understand the project

https://github.com/microsoft/Promptions


https://www.microsoft.com/en-us/research/project/tools-for-thought/promptions-repository/



Now I have the full picture. Let me synthesize everything into a concrete, actionable project plan.

---

Here's what Promptions actually is under the hood, and how it directly shapes your build:

**The key insight from the repo:**

Promptions has a **two-module pipeline**:
1. **Option Module** — takes the user's prompt + history → outputs parameterized UI controls (radio buttons, checkboxes, toggles) *contextually generated*, not pre-defined
2. **Chat Module** — takes the original prompt + selected controls as grounding → generates the actual response, updating live as controls change

It's a **TypeScript monorepo** (React + Fluent UI + OpenAI), MIT-licensed, with `apps/promptions-chat` and `apps/promptions-image`. You can fork and customize directly.

---

## Your Project: **"Provoke"** — A Two-Mode Learning Tool

Here's the complete concrete picture of what to build, now grounded in the actual Promptions architecture:

---

### What you're building in plain English

> A document workspace where students read with AI that *challenges* them (never summarizes), and an exam mode where the AI is *architecturally* incapable of giving the answer.

---

### Mode 1: Active Reading

**How it works:**

Student uploads a PDF/document. Instead of a chat box on the side, they get:

- The document rendered paragraph by paragraph
- **Promptions-style lens controls** generated dynamically per section — e.g. for a paragraph on climate policy: `[Skeptic] [Policy Maker] [First Principles] [What would the exam ask?]` — clicking one *instantly regenerates* the provocation in the margin, not in a chat
- **Provocations in the margin** — not summaries, not Q&A. Short, sharp challenges: *"This assumes markets self-correct — does the data in section 3 support that?"*
- Student annotates → builds a personal "argument map" on the right panel
- No chat box anywhere

**How Promptions plugs in directly:**

Fork `apps/promptions-chat`. Replace the chat interface with a document reader. The Option Module becomes your **Lens Generator** — it reads the paragraph and generates contextual lens options. The Chat Module becomes your **Provocation Generator** — constrained to only output provocations, never summaries or answers.

---

### Mode 2: Exam Mode

**How it works:**

Student pastes or uploads a problem. The system has two completely separate agents:

- **Solver** (server-only, never shown to student) — computes the canonical answer, stores it privately
- **Tutor** (student-facing) — only knows the problem and the student's current attempt. Its output is constrained to a JSON schema with these allowed actions only:

```json
{
  "action": "ask_clarifying_question" | "point_to_error" | "redirect_to_source" | "confirm_correct" | "celebrate"
  // NO "give_answer" action exists in the schema
}
```

**The Ethics Logic Gate (your Kiro hook):** Every Tutor response passes through a Judge LLM before reaching the student — a fast, cheap model with one job: *"Does this response contain or lead directly to the answer? Yes/No."* If Yes → blocked, Tutor retries with a stricter prompt.

**Cognitive forcing in the UI:**
- Student must write *something* before the Tutor responds — even "I don't know where to start"
- Hints escalate in a ladder: concept → topic → error location → related example (never the answer)
- A visible "I want the answer" button exists — it returns: *"Struggling here is scientifically linked to 0.36–0.58 SD better long-term retention (Kapur, 2021). Try one more approach."*

---

### How Kiro features map to this

| Kiro Feature | What it does in your project |
|---|---|
| **Specs** | EARS-format requirements encoding the pedagogical contract — *"WHEN student requests solution THE SYSTEM SHALL return a scaffold action, SHALL NOT return the canonical answer"* |
| **Steering docs** | `pedagogy.md` — Kapur productive failure, Buçinca CFF, Sarkar provocations, all as persistent project knowledge |
| **Hooks** | Runtime Ethics Logic Gate — every Tutor response triggers a pre-send hook that runs the Judge LLM |
| **MCP** | Solver agent has MCP access to the answer key; Tutor agent does not — the MCP boundary *is* the architectural separation |

---

### Stack (keeping it simple for a hackathon)

- **Frontend:** Fork Promptions (`apps/promptions-chat`) — React + Fluent UI already there
- **Backend:** Node/Express or FastAPI — two service endpoints: `/solver` (internal only) and `/tutor` (student-facing)
- **LLM:** OpenAI or Claude API — structured outputs for the Tutor's constrained JSON schema
- **PDF parsing:** `pdf-parse` or `pdfjs-dist` — already easy in Node
- **Ethics Gate:** A second LLM call with `temperature=0` and a binary classification prompt

---

### The 3-minute demo script

1. **(0:00–0:30)** Show ChatGPT solving a homework problem instantly. *"This is the problem."* Cite Bastani PNAS 2025 — unguarded AI reduces exam scores 17%.

2. **(0:30–1:30)** Active Reading demo — upload a chapter, click a lens ("Skeptic"), watch the margin provocation change live. Annotate. Show the argument map building. *"No chat box. No summary. You still read — but better."*

3. **(1:30–2:30)** Exam mode — paste a problem, try to get the answer: *"Just tell me the answer."* Show the Ethics Gate log blocking it. Show the Kiro spec file and hook that make this architectural, not prompt-based. Show the Solver/Tutor split.

4. **(2:30–3:00)** Flip the screen to `.kiro/specs/` — *"The pedagogy is code. The constraint is auditable. Every tutor tool can clone this spec and know exactly what guardrails are in place."*

---

### Name ideas (knowing the full picture now)

**Provoke** — directly from Sarkar's "provocations" language. Clean, memorable, on-brand.

Or: **Margin** (where thinking happens), **Anvil** (where ideas get sharpened), **Counterpoint** (musical term for challenge-response)

---

# chatgpt response

Here is the clean hackathon framing:

## Project name: **Provoke**

**One-line pitch:**  
**Provoke is an AI study tool that helps students think through reading and exams without giving them the answer.**

## Best challenge frame

Use **Education: The “Agency” Guardrail**.

The Kiro Spark prompt says the education app must use AI as **scaffolding, not the solution**, and must help a learner do something they could not do before **without doing it for them**. That fits your idea exactly. 

## Best exam scope

Do **not** say “any exam” for the hackathon. That sounds too broad.

Say:

> For the hackathon demo, we focus on **reading-based exams**: short-answer, comprehension, essay, and concept-explanation questions based on a document or textbook passage.

This is better because it connects both modes:

1. **Active Reading Mode**  
   Helps students understand the material before the exam.

2. **Exam Mode**  
   Helps students attempt answers without the AI giving away the final answer.

Later, the product can expand to math, coding, science, or standardized tests.

---

# Simple project idea

**Problem:**  
Students use AI to get answers quickly, but that can make them weaker learners. In exams, students need guidance, not shortcuts.

**Solution:**  
Provoke gives students an AI learning partner with strict constraints. It does not summarize everything or solve the question. Instead, it asks better questions, points students back to the source, highlights weak reasoning, and helps them improve their own answer.

**Why Kiro matters:**  
The “do not give the answer” rule is not just a prompt. It is built into the project using Kiro specs, steering docs, and hooks. Kiro’s docs describe specs as structured artifacts that turn high-level ideas into implementation plans with clear tracking, and steering docs help Kiro understand product goals and project patterns. ([Kiro](https://kiro.dev/docs/specs/?utm_source=chatgpt.com))
---

# What help can the AI give in Exam Mode?

In Exam Mode, the AI **cannot** give the final answer.

It can help by:

1. **Asking a guiding question**  
   “What is the main claim in paragraph 2?”

2. **Pointing to the relevant source section**  
   “Re-read the sentence where the author defines opportunity cost.”

3. **Checking the student’s reasoning**  
   “Your answer mentions the result, but not the cause.”

4. **Identifying the type of mistake**  
   “This looks like a definition problem, not an evidence problem.”

5. **Giving a hint level**  
   Level 1: concept hint  
   Level 2: where to look  
   Level 3: what part is missing  
   Never: final answer

6. **Helping structure the response**  
   “Try: claim → evidence → explanation.”

7. **Asking the student to commit an attempt first**  
   The AI only helps after the student writes something.

---

# Core product modes

## Mode 1: Active Reading

Student uploads a reading passage or PDF.

The app shows the document with AI comments in the margin.

Instead of saying:

> “Here is a summary.”

It says things like:

> “This paragraph assumes the reader agrees with the author’s definition. What evidence supports it?”

Students can choose lenses such as:

- **Skeptic**

- **Exam Maker**

- **First Principles**

- **Evidence Finder**

- **Counterargument**

This connects well to Microsoft’s **Promptions** idea, which uses dynamic UI controls to help users steer AI responses through generated options like buttons, toggles, and choices. ([GitHub](https://github.com/microsoft/Promptions?utm_source=chatgpt.com))
## Mode 2: Exam Mode

Student pastes a question.

The app says:

> “Write your first attempt. I’ll help you improve it, but I won’t answer for you.”

Then it gives only guided help.

Behind the scenes:

- **Solver agent** knows/checks the answer privately.

- **Tutor agent** only gives allowed help.

- **Kiro hook / Ethics Logic Gate** blocks answer leakage.

- **Structured response schema** only allows actions like `ask_question`, `point_to_source`, `flag_gap`, `confirm_reasoning`.

---

# 3-minute video script

The uploaded slide template says teams only have **2–3 minutes**, around **405 spoken words**, and should focus on the most compelling features. 

Here is a clean script around that length:

---

## 3-minute pitch script

Hi, we are building **Provoke**, an AI study tool for students who need help learning, not help cheating.

Today, many students use AI by asking, “What is the answer?” The AI gives the answer instantly, but the student skips the thinking. That is a problem, especially for exams, where students need to understand the material themselves.

Our solution is Provoke: an active reading and exam preparation tool where the AI is the scaffold, not the solution.

Provoke has two modes.

The first is **Active Reading Mode**. A student uploads a reading passage, article, or textbook chapter. Instead of giving a summary, Provoke places short challenges in the margin. For example, it might ask, “What evidence supports this claim?” or “What would a test question from this paragraph look like?” Students can switch lenses like Skeptic, Exam Maker, First Principles, or Evidence Finder. The goal is to keep the student engaged with the source material instead of replacing the reading.

The second is **Exam Mode**. The student pastes a short-answer or comprehension question. But before the AI helps, the student must write an attempt. Provoke can ask guiding questions, point to the right part of the source, identify missing reasoning, or help structure the answer. But it cannot give the final answer.

This is where Kiro is central. We are not relying on a simple prompt that says, “Please don’t give answers.” We use Kiro specs to define the learning contract, steering docs to encode our pedagogy, and hooks as an Ethics Logic Gate. Every tutor response is checked before the student sees it. If the response gives away the answer, it is blocked.

For the hackathon, we focus on reading-based exams: short answer, essay, and comprehension questions based on uploaded documents. This keeps the demo focused, but the architecture can later expand to math, coding, science, or standardized tests.

Provoke helps students do what AI should do in education: not replace their thinking, but strengthen it.

Our goal is simple: students should leave the app with a better answer, but more importantly, with a better mind for reaching that answer themselves.

---

# Suggested slide flow

## Slide 1: Title

**Provoke**  
AI that helps students think, not copy.

## Slide 2: Problem

Students ask AI for answers.  
They finish homework faster, but learn less.

## Slide 3: Solution

Two modes:

- Active Reading Mode

- Exam Mode

AI gives scaffolding, not solutions.

## Slide 4: Demo: Active Reading

Show uploaded passage.  
Show margin provocations.  
Show lens buttons.

## Slide 5: Demo: Exam Mode

Show student attempt.  
Show AI refusing final answer.  
Show it giving a guiding question instead.

## Slide 6: Why Kiro

- Specs define “no answers”

- Steering docs define tutoring behavior

- Hooks block answer leakage

- MCP can separate answer key access from tutor output

Kiro’s official description emphasizes spec-driven development, steering, hooks, and MCP as core workflow features. ([Kiro](https://kiro.dev/docs/getting-started/first-project/?utm_source=chatgpt.com))
## Slide 7: Impact

Students get help without losing agency.  
Teachers get a safer AI learning tool.  
The model is scalable to many subjects.

---

# Final framing sentence

Use this everywhere:

> **Provoke is a document-grounded AI tutor that challenges students during reading and supports them during exams, while being architecturally constrained not to give away answers.**

---

# you asked

be honest and strict and tell will this win or is this idea a winning idea, or should we just focus on active reading?

---

# chatgpt response

Strict answer: **the full “Active Reading + Exam Mode” idea can win, but only if you simplify the build and make Kiro the hero.** If you try to build the full research-heavy version, it will probably become too broad and look unfinished.

My honest recommendation: **do not drop Exam Mode.** But make **Active Reading the main product** and make **Exam Mode the killer proof/demo**.

## Why not only Active Reading?

Only active reading is safer to build, but it is less likely to feel like a winning hackathon idea because it competes directly with tools like NotebookLM, which already lets students upload sources, generate study guides, ask questions, create summaries, and test knowledge from course materials. ([Google for Education](https://edu.google.com/intl/ALL_us/ai-notebooklm/?utm_source=chatgpt.com))
So if your pitch is only:

> “Upload a document and AI helps you read better.”

Judges may think:

> “Isn’t this NotebookLM / study guide / PDF chatbot?”

Active reading alone is good, but not enough unless the UI is extremely polished.

## Why Exam Mode makes it stronger

The hackathon’s Education frame specifically says the AI must be **scaffolding, not the solution**. Your Exam Mode is the clearest possible match to that rule. The uploaded rules say the education project must empower learners to do something they could not do before **without doing it for them**. 

That is your strongest differentiator.

Also, current AI study modes are often optional and easy to bypass. For example, reporting on ChatGPT Study Mode notes that it guides students with Socratic prompts, hints, and self-reflection, but students can freely turn it off and there are no admin tools to enforce it. ([The Verge](https://www.theverge.com/news/715493/openai-chatgpt-ai-study-mode-answer?utm_source=chatgpt.com))
Your angle is stronger:

> “Other tools ask the AI not to give answers. Our system is built so it cannot.”

That is a winning sentence.

## The risk

The risk is scope.

A full product with PDF upload, paragraph rendering, lenses, annotations, Solver/Tutor split, Ethics Gate, Kiro specs, hooks, MCP, and polished UI is too much for 24 hours.

So the winning version is:

> **One focused reading-based exam workflow.**

Not “any exam.”  
Not “all subjects.”  
Not “full LMS.”  
Not “universal tutor.”

## Best version to build

Build this:

### **Provoke: Active Reading for Exam Prep**

A student uploads or pastes a reading passage.

The app has two tabs:

**1. Read Mode**  
The AI creates margin provocations:

- “What claim is this paragraph making?”

- “What evidence supports it?”

- “What would an exam ask from this section?”

- “What assumption is hidden here?”

**2. Exam Mode**  
The app generates or accepts a reading-based question.

The student must write an attempt first.

The AI can only respond with:

- guiding question

- source pointer

- missing evidence

- reasoning gap

- structure suggestion

It cannot give the final answer.

This keeps the project coherent: **read better → answer better → without cheating.**

## What I would cut

Cut these for the hackathon:

- Full PDF support, unless already easy.

- Multiple exam types like math, coding, biology, SAT, etc.

- Complex MCP unless your team already knows it.

- Too many lenses.

- Long research explanations in the demo.

Keep only:

- Paste/upload text.

- Paragraph-level reading UI.

- 3 or 4 lens buttons.

- Attempt-first exam mode.

- Answer-blocking hook / judge.

- Kiro spec files visible in repo.

## Will it win?

**It has winning potential, yes.**

But only if your demo shows three things clearly:

1. **A real student problem:** AI gives answers too easily.

2. **A working product:** student reads, gets challenged, attempts an answer, receives scaffolded help.

3. **Real Kiro usage:** specs, steering, hooks, and repo `.kiro` folder are visible. The official Kiro docs frame specs, steering files, hooks, and MCP as key workflow features, so judges will expect you to show how those shaped the build. ([Kiro](https://kiro.dev/docs/getting-started/first-project/?utm_source=chatgpt.com))
## My final call

Do **not** focus only on active reading.

Focus on:

> **Active Reading + constrained Exam Mode for reading-based exams.**

Phrase it like this:

> **Provoke helps students prepare for reading-based exams by turning documents into active thinking exercises, then guiding their exam answers without ever giving the answer away.**

That is simple, demoable, aligned with the Education frame, and more distinctive than another AI reading assistant.

---

# you asked

what we can really help in exam?, and for different type of exams?

---

# chatgpt response

Yes — but be careful with wording.

You should **not** say “we help during a real official exam” unless the teacher/school explicitly allows AI. That can sound like cheating.

Say this instead:

> **Exam Mode helps students practice under exam-like constraints before the real exam. It gives scaffolding, not answers.**

That fits the Education frame perfectly.

## What can we really help with in Exam Mode?

The AI can help with the **process**, not the **answer**.

It can help students:

| Help type | What AI does | What it must not do |
|---|---|---|
| Understand the question | Rephrase the prompt, identify command words like “compare,” “explain,” “justify” | Solve the question |
| Plan the answer | Suggest structure: claim → evidence → explanation | Fill in the content |
| Find relevant source area | Point to paragraph/page/section to reread | Quote the exact answer as final |
| Check reasoning | Say “your evidence does not support your claim” | Rewrite the answer fully |
| Identify missing pieces | Say “you have a claim but no evidence” | Add the missing evidence for them |
| Give hint ladder | Concept hint → location hint → error type | Final answer |
| Time management | Suggest how much time to spend per part | Decide the answer |
| Confidence check | Ask student to rate confidence and explain why | Tell them “the answer is X” |

This is also aligned with formative assessment: the National Research Council definition describes formative assessment as setting goals, eliciting student thinking, and providing feedback that moves learning forward. ([sites.nationalacademies.org](https://sites.nationalacademies.org/cs/groups/dbassesite/documents/webpage/dbasse_180089.pdf?utm_source=chatgpt.com))
## Best exam types for your project

For the hackathon, these are the strongest:

### 1. Reading comprehension exams — **best fit**

Examples:

- English comprehension

- History source analysis

- Biology textbook questions

- Business case reading

- Article-based quiz

AI can help by:

- asking what the passage is saying

- pointing to the relevant paragraph

- identifying claim/evidence gaps

- asking the student to support their answer

This is the **best demo** because it connects directly to Active Reading.

### 2. Short-answer exams — **very strong**

Example question:

> “Explain why opportunity cost matters in decision-making.”

AI can help by:

- identifying whether the student defined the concept

- checking if they included an example

- asking for cause/effect reasoning

- suggesting answer structure

It should not say:

> “Opportunity cost matters because…”

Instead it should say:

> “You named the concept, but your answer does not yet explain why the tradeoff matters. What is being given up in your example?”

### 3. Essay exams — **strong**

AI can help with:

- thesis clarity

- outline

- argument structure

- missing evidence

- counterargument

- rubric alignment

It must not write paragraphs for the student.

Good response:

> “Your thesis is a topic, not an argument yet. Can you turn it into a claim someone could disagree with?”

### 4. Math exams — **possible, but risky**

AI can help with:

- identifying the topic: algebra, derivative, probability

- asking what formula might apply

- checking the student’s step

- pointing out where the first error appears

It must not show the full solution.

Risk: math answers are easy to leak accidentally. For hackathon, avoid making math your main demo unless your constraints are very strong.

### 5. Coding exams — **possible, but risky**

AI can help with:

- clarifying the problem

- asking for edge cases

- checking pseudocode

- identifying bug category

- suggesting test cases

It must not write the code.

Risk: code assistance can quickly become solution generation. Keep this as “future expansion.”

### 6. Multiple-choice exams — **weakest fit**

AI can help with:

- explaining what the question is asking

- eliminating based on student reasoning

- asking the student to justify a choice

But it must not say:

> “Option B is correct.”

This is harder to demo because the final answer is visible and easy to leak.

## My strict recommendation

For the hackathon, focus on:

> **Reading-based short-answer exam practice.**

That gives you the clearest story:

1. Student reads.

2. AI challenges the reading.

3. Student enters exam-style question.

4. Student must attempt first.

5. AI guides without answering.

This is better than trying to support every exam type.

## Best positioning

Say:

> **Provoke is not for taking live exams. It is for exam practice. It creates exam-like pressure while protecting student agency.**

That avoids the cheating concern and makes the product responsible.

## Final feature list for Exam Mode

Build only these:

1. **Attempt-first lock**  
   Student must write an answer before help appears.

2. **Hint ladder**  
   Level 1: question  
   Level 2: concept hint  
   Level 3: source pointer  
   Level 4: reasoning gap  
   Never: final answer.

3. **Rubric check**  
   “You have claim and evidence, but your explanation is weak.”

4. **Source redirect**  
   “Look again at paragraph 4.”

5. **Answer-leak detector**  
   A Kiro hook blocks responses that contain the final answer.

That is enough to feel real, useful, and aligned with the hackathon.

---

# you asked

what are you exactly thinking for exam mode, will it not me accessible in official exam?

---

# chatgpt response

Exactly: **Exam Mode should not be positioned as something students use inside an official exam**, unless the instructor explicitly allows it.

For the hackathon, I would define it like this:

> **Exam Mode is an exam-practice environment, not a live-exam assistant. It simulates exam pressure and gives constrained scaffolding before the real exam.**

That keeps the product ethical and avoids sounding like cheating.

## What I’m thinking for Exam Mode

A student is preparing for a reading-based exam. They upload a passage, lecture note, textbook section, or case study.

Then Exam Mode creates or accepts questions like:

> “Explain the author’s main argument.”  
> “Compare the two viewpoints.”  
> “Use evidence from the passage to justify your answer.”  
> “What assumption does the author make?”

The student must type an answer first.

Then Provoke helps with the **thinking process**, not the final answer.

Example:

**Student:** “Just tell me the answer.”

**Provoke:** “I can’t give the final answer. Start with one sentence: what do you think the main claim is?”

**Student writes attempt:**  
“The author says technology is bad.”

**Provoke:**  
“You have a claim, but it is too broad. Look again at paragraph 2. Is the author saying technology is bad, or that technology changes who has power?”

That is useful, but not cheating.

## What it can help with

In Exam Mode, the AI can do these things:

1. **Decode the prompt**  
   “This is asking you to compare, not just define.”

2. **Force a first attempt**  
   “Write your current answer before I give feedback.”

3. **Point to the source**  
   “Reread paragraph 3 where the author explains the tradeoff.”

4. **Check answer structure**  
   “You have a claim, but you need evidence and explanation.”

5. **Find reasoning gaps**  
   “Your evidence supports the first part, but not the conclusion.”

6. **Ask Socratic questions**  
   “What phrase in the passage made you think that?”

7. **Give rubric feedback**  
   “This would likely get partial credit because it explains the idea but does not cite evidence.”

8. **Suggest next action**  
   “Revise your second sentence to explain why the evidence matters.”

It must **not** write the final response.

## Different exam types

For the hackathon, support only these clearly:

| Exam type | Good for Provoke? | What Provoke helps with |
|---|---:|---|
| Reading comprehension | Excellent | Main idea, evidence, inference, source location |
| Short answer | Excellent | Claim, evidence, explanation, missing pieces |
| Essay exam | Good | Thesis, outline, argument, counterargument |
| Open-book exam practice | Good | Where to look, how to reason from source |
| Multiple choice | Medium | Explain question type, ask student to justify choice |
| Math | Risky | Step checking, concept hints, error location |
| Coding | Risky | Test cases, edge cases, debugging hints |
| Official proctored exam | No, unless allowed | Should be disabled or teacher-controlled |

## Why not official exams?

Because universities and instructors usually treat unauthorized AI use as an academic integrity issue. ASU’s AI guidance says generative AI use falls under academic integrity policies, and instructors should make expectations clear for their courses. ([newcollege.asu.edu](https://newcollege.asu.edu/integrity/faculty/AI?utm_source=chatgpt.com))
UNESCO also frames generative AI in education around human agency, privacy, safety, and institutional policy, not uncontrolled use in assessments. ([UNESCO](https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research?utm_source=chatgpt.com))
So your product should say:

> **Not for unauthorized live exams. Built for practice, open-book learning, and instructor-approved assessments.**

## The strongest version

Call it:

> **Practice Exam Mode**

Not just “Exam Mode.”

That one word fixes the ethical problem.

## Demo flow

Use this exact demo:

1. Paste a short passage.

2. Click **Generate Practice Question**.

3. Question appears:  
   “What is the author’s main claim, and what evidence supports it?”

4. Student clicks **I’m stuck**.

5. App says:  
   “Write your best first attempt. Even one sentence is enough.”

6. Student writes a weak answer.

7. App responds:  
   “You identified the topic, but not the claim. Look at paragraph 2 and find the sentence where the author explains cause and effect.”

8. Student asks:  
   “Just give me the answer.”

9. App refuses and gives a scaffold:  
   “I can’t provide the final answer. Try filling this structure: The author claims ___ because ___. The evidence is ___.”

That is a strong, ethical, winning demo.

---

# you asked

give the final problem statement in simple and clear structure.

---

# chatgpt response

## Final problem statement

Students are increasingly using AI tools to get quick answers while studying. This helps them finish tasks faster, but it often removes the most important part of learning: struggling with the material, forming their own reasoning, and explaining ideas in their own words.

This is especially harmful when students prepare for reading-based exams, short-answer questions, essays, and comprehension tests. Existing AI tools often summarize, explain, or answer too directly. Students need support, but they need support that builds their thinking instead of replacing it.

**Our problem:**

> How can we help students actively understand reading material and prepare for exams, while making sure the AI acts as a scaffold, not the solution?

## Target user

Students preparing for:

- reading comprehension exams

- short-answer exams

- essay exams

- open-book or source-based exam practice

## Core challenge

Students need help with:

- understanding dense readings

- identifying main claims and evidence

- practicing exam-style answers

- improving weak reasoning

- knowing where their answer is incomplete

But the AI should **not**:

- give the final answer

- write the essay for them

- solve the question directly

- replace the student’s thinking

## Proposed solution

**Provoke** is an AI-powered active reading and practice exam tool.

In **Active Reading Mode**, students upload or paste a reading passage. The AI places short challenges in the margin, such as questions about evidence, assumptions, claims, and possible exam prompts.

In **Practice Exam Mode**, students answer exam-style questions based on the reading. The AI only helps after the student writes an attempt. It can ask guiding questions, point to relevant source sections, identify missing evidence, and give rubric-style feedback — but it cannot provide the final answer.

## Why this fits the hackathon

This directly matches the Kiro Spark Education frame: the AI must be **scaffolding, not the solution**, and must empower a learner without doing the work for them. 

Kiro is used to make this constraint real:

- **Specs** define what the AI is allowed and not allowed to do.

- **Steering docs** encode the learning behavior.

- **Hooks** check AI responses before they reach the student.

- **MCP / separation logic** can keep answer-checking separate from student-facing tutoring.

Kiro’s own docs describe specs, steering files, hooks, and MCP servers as core workflow features for building projects with clearer structure and automation. ([Kiro](https://kiro.dev/docs/getting-started/first-project/?utm_source=chatgpt.com))
## Final one-sentence version

> **Provoke helps students prepare for reading-based exams by turning study material into active thinking practice, then guiding their answers without ever giving the answer away.**

---

# you asked

plan for this and tell possibilty and finalize the problem definition as per the kiro hackathon.

so we want the active learning, as per these, video trancript and code and we want to gamify this learning process, by matching the students who are intrested in learning and quizing on same topics, or ai can quiz - based on the answers it will provoke questions to think and give the references or something we already talked about , and they will go back and learn and find answer (which we talked about in exam mode).

Directory structure:
└── microsoft-promptions/
    ├── README.md
    ├── CONTRIBUTING.md
    ├── LICENSE
    ├── nx.json
    ├── package.json
    ├── SECURITY.md
    ├── TRANSPARENCY_NOTE.md
    ├── tsconfig.json
    ├── .prettierrc.json
    ├── .yarnrc.yml
    ├── apps/
    │   ├── promptions-chat/
    │   │   ├── README.md
    │   │   ├── index.html
    │   │   ├── package.json
    │   │   ├── tsconfig.json
    │   │   ├── tsconfig.node.json
    │   │   ├── vite.config.ts
    │   │   ├── .env.example
    │   │   └── src/
    │   │       ├── App.tsx
    │   │       ├── index.css
    │   │       ├── main.tsx
    │   │       ├── reactUtil.ts
    │   │       ├── types.ts
    │   │       ├── vite-env.d.ts
    │   │       ├── components/
    │   │       │   ├── AssistantMessage.tsx
    │   │       │   ├── ChatHistory.tsx
    │   │       │   ├── ChatInput.tsx
    │   │       │   ├── ChatOptionsPanel.tsx
    │   │       │   ├── ErrorMessageComponent.tsx
    │   │       │   ├── index.ts
    │   │       │   ├── MarkdownRenderer.tsx
    │   │       │   ├── messageStyles.ts
    │   │       │   ├── SendButton.tsx
    │   │       │   └── UserMessage.tsx
    │   │       └── services/
    │   │           ├── ChatService.ts
    │   │           └── PromptionsService.ts
    │   └── promptions-image/
    │       ├── index.html
    │       ├── package.json
    │       ├── tsconfig.json
    │       ├── tsconfig.node.json
    │       ├── vite.config.ts
    │       ├── .env.example
    │       └── src/
    │           ├── App.tsx
    │           ├── index.css
    │           ├── main.tsx
    │           ├── reactUtil.ts
    │           ├── types.ts
    │           ├── vite-env.d.ts
    │           ├── components/
    │           │   ├── GeneratedImage.tsx
    │           │   ├── ImageInput.tsx
    │           │   ├── index.ts
    │           │   └── OptionsPanel.tsx
    │           └── services/
    │               ├── ImageService.ts
    │               └── PromptionsImageService.ts
    └── packages/
        ├── promptions-llm/
        │   ├── README.md
        │   ├── package.json
        │   ├── project.json
        │   ├── tsconfig.json
        │   └── src/
        │       ├── basicOptions.ts
        │       ├── index.ts
        │       └── types.ts
        └── promptions-ui/
            ├── README.md
            ├── package.json
            ├── project.json
            ├── tsconfig.json
            └── src/
                ├── basicOptions.tsx
                ├── compactOptions.tsx
                ├── index.ts
                └── types.ts


Files Content:

================================================
FILE: README.md
================================================
# Promptions - Ephemeral UI for Prompting

Ephemeral UI for prompt refinement - turn one prompt into interactive controls to steer and refine AI.
![Promptions demo](./Promptions.gif)

## Overview

Promptions is a simple, flexible **dynamic prompt middleware technique for AI** that uses **ephemeral UI**, developed by the ENCODE and [Tools for Thought](https://aka.ms/toolsforthought) projects at [Microsoft Research, Cambridge, UK](https://www.microsoft.com/en-us/research/lab/microsoft-research-cambridge/). From a single, simple prompt, the system helps users steer the AI by suggesting parameterized choices as dynamically generated, ephemeral UI components. As users click on choices, the same output updates immediately—not just as additional chat responses. The dynamic UI can be configured per prompt.

- For more on what Promptions can do, and for responsible AI suggestions, see our [TRANSPARENCY_NOTE.md](TRANSPARENCY_NOTE.md).
- A detailed discussion of Promptions, including how it was developed and tested, can be found in our research paper "[Dynamic Prompt Middleware: Contextual Prompt Refinement Controls for Comprehension Tasks](https://aka.ms/promptionspaper)."

Promptions is best suited for end-user interfaces where parameterizing prompts adds context that helps steer outputs toward user preferences, without requiring users to write or speak that context. The technique is simple yet effective, and it is easy to customize for many applications—serving developers from individual vibe coders to enterprise teams.

| Real-world use                        | Description                                                                                                                                                                                     |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Customer support chatbots             | Users refine support queries on the fly (e.g., specify tone or detail level) and see updated answers instantly, improving resolution speed and satisfaction.                                    |
| Content creation platforms            | Writers and marketers tweak style, length, or format parameters through GUI controls, iterating drafts faster while maintaining creative direction.                                             |
| Data analytics and BI dashboards      | Analysts adjust filters, aggregation levels, or visualization styles via checkboxes and sliders, regenerating AI-driven reports and insights instantly.                                         |
| Educational tutoring systems          | Students select difficulty, focus topics, or feedback style, prompting the AI tutor to adapt explanations and examples to individual learning needs.                                            |
| Healthcare decision-support tools     | Clinicians refine symptom context, risk factors, or treatment priorities through guided options, obtaining tailored diagnostic suggestions and care pathways.                                   |
| Data annotation and curation          | Promptions can parameterize labeling decisions into structured GUI inputs (e.g. sentiment sliders, style toggles), improving consistency, speed, and auditability in dataset creation.          |
| Interactive explainability & auditing | Promptions allows users to explore how AI outputs shift with different refinement choices, offering a lightweight way to probe bias, model boundaries, or failure modes through UI interaction. |
| Human-AI co-creation experiments      | Promptions enables controlled studies of creative workflows—researchers can observe how users interact with dynamic controls vs. freeform input when generating stories, resumes, or code.      |

## Project Structure

```
promptions/
├── apps/                          # Frontend applications
│   ├── promptions-chat/           # Chat interface (port 3003)
│   └── promptions-image/          # Image generation interface (port 3004)
├── packages/                      # Shared libraries
│   ├── promptions-llm/            # LLM utilities and integrations
│   └── promptions-ui/             # Shared React UI components
├── package.json                   # Root package configuration
├── nx.json                        # NX build system configuration
└── tsconfig.json                  # TypeScript configuration
```

## Prerequisites

Before building and running this project, ensure you have:

- **Node.js** (v18 or higher)
- **Corepack** (included with Node.js v16.10+, enables automatic Yarn management)
- **TypeScript** (v5.0 or higher)
- **OpenAI API Key** (for chat and image generation features)

### Setting up Corepack (Recommended)

This project uses **Yarn 4.9.1** which is automatically managed via corepack. No manual Yarn installation needed!

```bash
# Enable corepack (if not already enabled)
corepack enable

# Verify corepack is working (should show yarn 4.9.1)
corepack yarn --version
```

> **Note:** Corepack is included with Node.js v16.10+ but may need to be enabled. If you're using an older Node.js version, you can install corepack separately: `npm install -g corepack`

### Alternative: Manual Yarn Installation

If you prefer not to use corepack:

```bash
# Install Yarn globally
npm install -g yarn@4.9.1
```

## Quick Start

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd promptions

# Enable corepack (if not already enabled and using corepack)
corepack enable

# Install all dependencies across the monorepo
# Corepack will automatically use the correct Yarn version (4.9.1)
yarn install
```

### 2. Build the Project

```bash
# Build all packages and applications
yarn build
```

### 3. Run the applications (and set your API key)

Set your OpenAI API key so the apps can call the OpenAI APIs.

Option A — .env files (recommended for local development):

- Create `apps/promptions-chat/.env` with:

    ```dotenv
    VITE_OPENAI_API_KEY=your_openai_api_key_here
    ```

- Create `apps/promptions-image/.env` with:

    ```dotenv
    VITE_OPENAI_API_KEY=your_openai_api_key_here
    ```

Option B — set it in your shell (PowerShell example):

```powershell
# Chat app
$env:VITE_OPENAI_API_KEY="your_openai_api_key_here" ; yarn workspace @promptions/promptions-chat dev

# Image app
$env:VITE_OPENAI_API_KEY="your_openai_api_key_here" ; yarn workspace @promptions/promptions-image dev
```

Start the dev servers:

- Chat application (http://localhost:3003):

    ```powershell
    yarn workspace @promptions/promptions-chat dev
    ```

- Image generation application (http://localhost:3004):

    ```powershell
    yarn workspace @promptions/promptions-image dev
    ```

## Available Commands

### Root Level Commands

| Command               | Description                                      |
| --------------------- | ------------------------------------------------ |
| `yarn build`          | Build all packages and applications              |
| `yarn typecheck`      | Run TypeScript type checking across all projects |
| `yarn clean`          | Clean all build artifacts                        |
| `yarn prettier:check` | Check code formatting                            |
| `yarn prettier:write` | Format code                                      |

### Individual Package Commands

Each package supports these commands:

| Command                                   | Description                          |
| ----------------------------------------- | ------------------------------------ |
| `yarn workspace <package-name> build`     | Build specific package               |
| `yarn workspace <package-name> typecheck` | Type check specific package          |
| `yarn workspace <package-name> clean`     | Clean build artifacts                |
| `yarn workspace <package-name> dev`       | Start development server (apps only) |
| `yarn workspace <package-name> preview`   | Preview production build (apps only) |

### Package Names

- `@promptions/promptions-chat`
- `@promptions/promptions-image`
- `@promptions/promptions-llm`
- `@promptions/promptions-ui`

## CONTRIBUTING

This project welcomes contributions and suggestions. For information about contributing to Promptions, please see our [CONTRIBUTING.md](CONTRIBUTING.md) guide, which includes current issues to be resolved and other forms of contributing.

## CONTACT

We welcome feedback and collaboration from our audience. If you have suggestions, questions, or observe unexpected/offensive behavior in our technology, please contact us at [promptionsgithub@service.microsoft.com](promptionsgithub@service.microsoft.com).

If the team receives reports of undesired behavior or identifies issues independently, we will update this repository with appropriate mitigations.

## TRADEMARKS

Microsoft, Windows, Microsoft Azure, and/or other Microsoft products and services referenced in the documentation may be either trademarks or registered trademarks of Microsoft in the United States and/or other countries. The licenses for this project do not grant you rights to use any Microsoft names, logos, or trademarks. Microsoft's general trademark guidelines can be found at http://go.microsoft.com/fwlink/?LinkID=254653.

Any use of third-party trademarks or logos are subject to those third-party's policies.

## PRIVACY & ETHICS

Privacy information can be found at https://go.microsoft.com/fwlink/?LinkId=521839



================================================
FILE: CONTRIBUTING.md
================================================
## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit [Contributor License Agreements](https://cla.opensource.microsoft.com).

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.



================================================
FILE: LICENSE
================================================
    MIT License

    Copyright (c) Microsoft Corporation.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE



================================================
FILE: nx.json
================================================
{
    "$schema": "./node_modules/nx/schemas/nx-schema.json",
    "targetDefaults": {
        "build": {
            "dependsOn": ["^build"],
            "cache": true
        },
        "typecheck": {
            "dependsOn": ["^build"],
            "cache": true
        },
        "test": {
            "cache": true
        }
    }
}



================================================
FILE: package.json
================================================
{
    "name": "promptions",
    "version": "1.0.0",
    "description": "Monorepo for promptions",
    "license": "MIT",
    "private": true,
    "workspaces": [
        "apps/*",
        "packages/*"
    ],
    "packageManager": "yarn@4.9.1",
    "scripts": {
        "clean": "yarn nx run-many -t clean",
        "typecheck": "yarn nx run-many -t typecheck",
        "build": "yarn nx run-many -t build",
        "prettier:check": "prettier --check .",
        "prettier:write": "prettier --write ."
    },
    "devDependencies": {
        "@nx/web": "20.8.1",
        "globals": "^16.0.0",
        "nx": "20.8.1",
        "prettier": "^3.5.3",
        "typescript": ">=5.0.0",
        "typescript-eslint": "^8.30.1"
    }
}



================================================
FILE: SECURITY.md
================================================
<!-- BEGIN MICROSOFT SECURITY.MD V1.0.0 BLOCK -->

## Security

Microsoft takes the security of our software products and services seriously, which
includes all source code repositories in our GitHub organizations.

**Please do not report security vulnerabilities through public GitHub issues.**

For security reporting information, locations, contact information, and policies,
please review the latest guidance for Microsoft repositories at
[https://aka.ms/SECURITY.md](https://aka.ms/SECURITY.md).

<!-- END MICROSOFT SECURITY.MD BLOCK -->



================================================
FILE: TRANSPARENCY_NOTE.md
================================================
# Promptions

## OVERVIEW

Promptions is a simple and flexible **dynamic prompt middleware UI for AI technique**. From a single, simple, prompt, the system helps users steer the AI, customizing their outputs by suggesting parameterized choices in the form of dynamically generated user interface components​. As the user clicks on choices, they get immediate changes to the same output, not just additional chat responses. Dynamic UI can be per-prompt and per-session.

### What Can Promptions Do

Promptions was developed as a simple technique to help AI end-user application developers improve their users' AI steering experiences, to get more value from their application.
A detailed discussion of Promptions, including how it was developed and tested, can be found in our paper at: https://aka.ms/promptionspaper.

### Intended Uses

Promptions is best suited for incorporating into any end-user user interface in which parameterization of prompts to add further context would help steer the output to the user's preferences, without having to write or speak the context. The technique is simple but effective, and can be easily customized to fit any application, suiting developers from individual vibe-coders to those in enterprise.

| Real-world use                        | Description                                                                                                                                                                                     |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Customer support chatbots             | Users refine support queries on the fly (e.g., specify tone or detail level) and see updated answers instantly, improving resolution speed and satisfaction.                                    |
| Content creation platforms            | Writers and marketers tweak style, length, or format parameters through GUI controls, iterating drafts faster while maintaining creative direction.                                             |
| Data analytics and BI dashboards      | Analysts adjust filters, aggregation levels, or visualization styles via checkboxes and sliders, regenerating AI-driven reports and insights instantly.                                         |
| Educational tutoring systems          | Students select difficulty, focus topics, or feedback style, prompting the AI tutor to adapt explanations and examples to individual learning needs.                                            |
| Healthcare decision-support tools     | Clinicians refine symptom context, risk factors, or treatment priorities through guided options, obtaining tailored diagnostic suggestions and care pathways.                                   |
| Data annotation and curation          | Promptions can parameterize labeling decisions into structured GUI inputs (e.g. sentiment sliders, style toggles), improving consistency, speed, and auditability in dataset creation.          |
| Interactive explainability & auditing | Promptions allows users to explore how AI outputs shift with different refinement choices, offering a lightweight way to probe bias, model boundaries, or failure modes through UI interaction. |
| Human-AI co-creation experiments      | Promptions enables controlled studies of creative workflows—researchers can observe how users interact with dynamic controls vs. freeform input when generating stories, resumes, or code.      |

Promptions is being shared with the research community to facilitate reproduction of our results and foster further research in this area.
Promptions is intended to be used by domain experts who are independently capable of evaluating the quality of outputs before acting on them.

### Out-of-Scope Uses

Promptions is not well suited for high-stakes or compliance-critical domains where outputs must follow strict regulatory standards (e.g., legal filings, medical diagnoses, or financial disclosures). In these contexts, dynamically steerable AI interfaces may introduce ambiguity, variation, or unintended bias that conflicts with traceability and audit requirements. It is also not designed for tasks requiring long-form reasoning chains, deeply nested prompt dependencies, or multi-modal coordination (e.g., simultaneous visual + textual generation), as its UI paradigm prioritizes simplicity and responsiveness over complex workflow orchestration.

We do not recommend using Promptions in commercial or real-world applications without further testing and development. It is being released for research purposes.

Promptions was not designed or evaluated for all possible downstream purposes. Developers should consider its inherent limitations as they select use cases, and evaluate and mitigate for accuracy, safety, and fairness concerns specific to each intended downstream use.

Promptions should not be used in highly regulated domains where inaccurate outputs could suggest actions that lead to injury or negatively impact an individual's legal, financial, or life opportunities.

We do not recommend using Promptions in the context of high-risk decision making (e.g. in law enforcement, legal, finance, or healthcare).

Promptions does not provide medical or clinical opinions and is not designed to replace the role of qualified medical professionals in appropriately identifying, assessing, diagnosing, or managing medical conditions.

## HOW TO GET STARTED

To begin using Promptions, follow instructions at [microsoft/promptions](https://github.com/microsoft/promptions/)

## EVALUATION

Promptions was evaluated on its ability to explain spreadsheet formulas, python code, short text passages, and as a teaching aid for data analysis and visualization concepts
A detailed discussion of our evaluation methods and results can be found in our paper at: https://aka.ms/promptionspaper.

### Evaluation Methods

We used user preferences to measure Promptions' performance.
We used a comparative user lab study to measure user preferences for Promptions dynamic UI against a static options system.
The model used for evaluation was gpt4-turbo. For more on this specific model, please see https://platform.openai.com/docs/models/gpt-4-turbo.
Results may vary if Promptions is used with a different model, or when using other models for evaluation, based on their unique design, configuration and training.
In addition to robust quality performance testing, Promptions was assessed from a Responsible AI perspective. Based on these results, we implemented mitigations to minimize Promption's susceptibility to misuse.

### Evaluation Results

At a high level, we found that, compared to a Static prompt refinement approach, the Promptions Dynamic prompt refinement approach afforded more control, lowered barriers to providing context, and encouraged task exploration and reflection, but reasoning about the effects of generated controls on the final output remains challenging. Our findings suggest that dynamic prompt middleware can improve the user experience of generative AI workflows.

## LIMITATIONS

Promptions was developed for research and experimental purposes. Further testing and validation are needed before considering its application in commercial or real-world scenarios.

Promptions was designed and tested using the English language. Performance in other languages may vary and should be assessed by someone who is both an expert in the expected outputs and a native speaker of that language.
Promptions' outputs generated by AI return options non-deterministically. Parameterized choices and outputs are likely to differ across turns and sessions.

Outputs generated by AI may include factual errors, fabrication, or speculation. Users are responsible for assessing the accuracy of generated content. All decisions leveraging outputs of the system should be made with human oversight and not be based solely on system outputs. Promptions inherits any biases, errors, or omissions produced by its base model. Developers are advised to choose an appropriate base LLM/MLLM carefully, depending on the intended use case. Promptions inherits any biases, errors, or omissions characteristic of its training data, which may be amplified by any AI-generated interpretations. Developers are advised to use content mitigations such as Azure Content Moderation APIs and test their systems using a service such as the Azure AI safety evaluations.

There has not been a systematic effort to ensure that systems using Promptions are protected from security vulnerabilities such as indirect prompt injection attacks. Any systems using it should take proactive measures to harden their systems as appropriate.

## BEST PRACTICES

Promptions in a general purpose library for integrating prompt clarifications and elaborations into a generative AI experience through dynamic UI. As with any generative AI experience, options can be hallucinated or incorrect, so human judgment should be applied when considering the output.

The method for generating options is general and broadly applicable, but for specific scenarios better results may be achieved by extending or modifying option generation to include domain specific details, for instance, options of software library supported by your context.

Options are created by LLM's generating JSON and then rendering that JSON using provided UI components. By default, Promptions uses capable LLMs that are highly reliable at generating JSON, but for further reliability constrained decoding (structured outputs) could be applied for simple JSON schemas. If Promptions is extended to generate UI directly via LLM code generation, this code must be executed int a sandboxed environment.

Promptions' sample code integrates with an external LLM API, so sensitive data should not be used.
We strongly encourage users to use LLMs/MLLMs that support robust Responsible AI mitigations, such as Azure Open AI (AOAI) services. Such services continually update their safety and RAI mitigations with the latest industry standards for responsible use. For more on AOAI's best practices when employing foundations models for scripts and applications:

- [Blog post on responsible AI features in AOAI that were presented at Ignite 2023](https://techcommunity.microsoft.com/t5/ai-azure-ai-services-blog/announcing-new-ai-safety-amp-responsible-ai-features-in-azure/ba-p/3983686)
- [Overview of Responsible AI practices for Azure OpenAI models](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/overview)
- [Azure OpenAI Transparency Note](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/transparency-note)
- [OpenAI s Usage policies](https://openai.com/policies/usage-policies)
- [Azure OpenAI s Code of Conduct](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/code-of-conduct)

Users are responsible for sourcing their datasets legally and ethically. This could include securing appropriate copy rights, ensuring consent for use of audio/images, and/or the anonymization of data prior to use in research.
Users are reminded to be mindful of data privacy concerns and are encouraged to review the privacy policies associated with any models and data storage solutions interfacing with Promptions.

It is the user's responsibility to ensure that the use of Promptions complies with relevant data protection regulations and organizational guidelines.

### Suggested Jailbreak Mitigations

Promptions sample code includes components that interact with large language models (LLMs), which may be vulnerable to jailbreak attacks—user-crafted prompts designed to bypass safety instructions. To mitigate the risk of jailbreaks, we recommend a layered approach:

- Metaprompt Defense: Use Microsoft's recommended metaprompt structure, which includes a final instruction explicitly prohibiting the model from revealing or altering its safety rules. This has shown strong resistance to adversarial prompts in internal evaluations.
- Platform Safeguards: Integrate Azure AI safety features such as jailbreak classifiers, content filters, and blocklists to detect and block harmful outputs.
- Developer Responsibility: As this is an open source release, developers are expected to evaluate and adapt the code responsibly. We encourage logging user inputs, avoiding direct exposure of raw model outputs, and applying additional safety layers during deployment.

For more details, see Microsoft's guidance on jailbreak mitigation at [AI jailbreaks: What they are and how they can be mitigated | Microsoft Security Blog.](https://www.microsoft.com/en-us/security/blog/2024/06/04/ai-jailbreaks-what-they-are-and-how-they-can-be-mitigated/)

### Suggestions for Other Mitigations

| Stakeholders/Use Case                                               | Potential harms                                                                                                 | Potential mitigation                                                                                                                                         |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Non-technical end users (chatbots & content creation)               | Overreliance on AI outputs that may contain errors, bias, or outdated information                               | Display confidence/uncertainty indicators; embed disclaimers; require optional “verify with human” step; offer “undo” or revision history features           |
| Business analysts (BI dashboards & reporting)                       | Misinterpreting or overfitting to spurious correlations in AI-generated insights                                | Surface data provenance and model assumptions; limit refinement ranges; mandate manual sign-off on critical metrics; log all parameter changes               |
| Educators & learners (intelligent tutoring systems)                 | Learning from incorrect or oversimplified explanations, reinforcing misconceptions                              | Integrate educator review workflows; flag low-confidence responses; link to curated, authoritative resources; provide error-reporting UI                     |
| Citizen developers (low-code/no-code AI integration)                | Accidentally exposing sensitive data, misconfiguring prompts leading to inappropriate outputs                   | Enforce input sanitization and PII redaction by default; ship with secure templates; include step-by-step integration guides; sandbox testing mode           |
| Organizations & businesses (customer support, marketing, analytics) | Brand/reputation damage from biased or offensive outputs; regulatory non-compliance (e.g., GDPR, FINRA)         | Establish usage governance policies; maintain audit logs; run periodic bias and compliance audits; restrict high-risk refinement options                     |
| Malicious actors (propaganda, phishing, disinformation)             | Crafting highly persuasive or deceptive content at scale; evading content filters through iterative refinements | Implement rate-limiting and anomaly detection; require user authentication and reputation scoring; deploy robust content-safety filters; human review queues |

## LICENSE

Microsoft, and any contributors, grant you a license to any code in the repository under the MIT License. See the LICENSE file. Microsoft and any contributors reserve all other rights, whether under their respective copyrights, patents, or trademarks, whether by implication, estoppel, or otherwise.

```
MIT License

Copyright (c) 2025 Microsoft Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

## THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## CONTACT

We welcome feedback and collaboration from our audience. If you have suggestions, questions, or observe unexpected/offensive behavior in our technology, please contact us at [promptionsgithub@service.microsoft.com](promptionsgithub@service.microsoft.com).

If the team receives reports of undesired behavior or identifies issues independently, we will update this repository with appropriate mitigations.



================================================
FILE: tsconfig.json
================================================
{
    "compilerOptions": {
        "allowJs": true,
        "allowUnusedLabels": false,
        "declaration": true,
        "declarationMap": true,
        "emitDecoratorMetadata": true,
        "esModuleInterop": true,
        "experimentalDecorators": true,
        "forceConsistentCasingInFileNames": true,
        "isolatedModules": true,
        "jsx": "react-jsx",
        "lib": ["dom", "dom.iterable", "esnext"],
        "module": "esnext",
        "moduleResolution": "bundler",
        "noFallthroughCasesInSwitch": true,
        "noImplicitReturns": true,
        "noUncheckedSideEffectImports": true,
        "noUnusedParameters": false, // Let typescript-eslint handle this
        "noUnusedLocals": false, // Let typescript-eslint handle this
        "outDir": "lib",
        "pretty": true,
        "removeComments": false,
        "resolveJsonModule": true,
        "skipLibCheck": true,
        "inlineSourceMap": true,
        "strict": true,
        "target": "esnext",
        "useDefineForClassFields": true
    },
    "compileOnSave": false,
    "buildOnSave": false,
    "exclude": [
        "node_modules",
        "dist",
        "lib",
        "coverage",
        "build",
        "scripts",
        "test",
        "**/*.test.tsx",
        "**/*.test.ts",
        "**/*.spec.tsx",
        "**/*.spec.ts"
    ]
}



================================================
FILE: .prettierrc.json
================================================
{
    "printWidth": 120,
    "trailingComma": "all",
    "tabWidth": 4,
    "semi": true,
    "singleQuote": false,
    "endOfLine": "auto",
    "overrides": [
        {
            "files": ["*.yml", "*.yaml"],
            "options": {
                "tabWidth": 2
            }
        }
    ]
}



================================================
FILE: .yarnrc.yml
================================================
enableTelemetry: 0

nodeLinker: node-modules

npmPublishRegistry: "https://npm.pkg.github.com"
npmPublishAccess: public



================================================
FILE: apps/promptions-chat/README.md
================================================
# Promptions Chat

A modern chat interface built with React, Vite, Fluent UI, and OpenAI streaming responses.

## Features

- 🎨 Beautiful UI with Microsoft Fluent UI components
- 💬 Real-time streaming responses from OpenAI
- ⚡ Fast development with Vite
- 📱 Responsive design
- ⌨️ Keyboard shortcuts (Enter to send, Shift+Enter for new line)

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn (workspace package manager)
- OpenAI API key

### Installation

1. From the workspace root, install dependencies:

    ```bash
    yarn install
    ```

2. Navigate to the chat app directory:

    ```bash
    cd apps/promptions-chat
    ```

3. Copy the environment file and add your OpenAI API key:

    ```bash
    cp .env.example .env
    ```

    Edit `.env` and add your OpenAI API key:

    ```
    VITE_OPENAI_API_KEY=your_api_key_here
    ```

### Development

Start the development server:

```bash
yarn dev
```

The app will be available at `http://localhost:3003`

### Building

Build the application for production:

```bash
yarn build
```

### Type Checking

Run TypeScript type checking:

```bash
yarn typecheck
```

## Architecture

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Fluent UI** - Microsoft's design system
- **OpenAI API** - GPT-3.5-turbo with streaming
- **TypeScript** - Full type safety

## Security Notes

⚠️ **Important**: This demo uses `dangerouslyAllowBrowser: true` for the OpenAI client, which exposes your API key in the browser. In a production application, you should:

1. Move OpenAI API calls to a backend server
2. Implement proper authentication
3. Use environment variables on the server side
4. Add rate limiting and other security measures

## Contributing

This is part of the promptions monorepo. Please see the main README for contribution guidelines.



================================================
FILE: apps/promptions-chat/index.html
================================================
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Promptions Chat</title>
    </head>
    <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
    </body>
</html>



================================================
FILE: apps/promptions-chat/package.json
================================================
{
    "name": "@promptions/promptions-chat",
    "version": "1.0.0",
    "type": "module",
    "description": "Chat interface for promptions using OpenAI and Fluent UI",
    "license": "MIT",
    "scripts": {
        "dev": "vite --port 3003",
        "build": "tsc && vite build",
        "preview": "vite preview",
        "typecheck": "tsc --noEmit",
        "clean": "rimraf dist"
    },
    "dependencies": {
        "@fluentui/react-components": "^9.54.0",
        "@fluentui/react-icons": "^2.0.258",
        "@promptions/promptions-ui": "workspace:*",
        "immer": "^10.1.1",
        "openai": "^5.8.2",
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "react-markdown": "^10.1.0",
        "rehype-highlight": "^7.0.2",
        "remark-gfm": "^4.0.1"
    },
    "devDependencies": {
        "@types/react": "^18.3.12",
        "@types/react-dom": "^18.3.1",
        "@vitejs/plugin-react": "^4.3.3",
        "rimraf": "^5.0.0",
        "typescript": "^5.6.3",
        "vite": "^7.0.3"
    }
}



================================================
FILE: apps/promptions-chat/tsconfig.json
================================================
{
    "compilerOptions": {
        "target": "ES2020",
        "useDefineForClassFields": true,
        "lib": ["ES2020", "DOM", "DOM.Iterable"],
        "module": "ESNext",
        "skipLibCheck": true,
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true
    },
    "include": ["src"],
    "references": [{ "path": "./tsconfig.node.json" }]
}



================================================
FILE: apps/promptions-chat/tsconfig.node.json
================================================
{
    "compilerOptions": {
        "composite": true,
        "skipLibCheck": true,
        "module": "ESNext",
        "moduleResolution": "bundler",
        "allowSyntheticDefaultImports": true,
        "strict": true
    },
    "include": ["vite.config.ts"]
}



================================================
FILE: apps/promptions-chat/vite.config.ts
================================================
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3003,
    },
    define: {
        "process.env": {},
    },
});



================================================
FILE: apps/promptions-chat/.env.example
================================================
# Copy this file to .env and add your OpenAI API key
VITE_OPENAI_API_KEY=your_openai_api_key_here



================================================
FILE: apps/promptions-chat/src/App.tsx
================================================
import React from "react";
import OpenAI from "openai";
import { FluentProvider, webLightTheme, makeStyles, tokens } from "@fluentui/react-components";
import { ChatService } from "./services/ChatService";
import { ChatMessage, PromptionsService } from "./services/PromptionsService";
import { current, produce } from "immer";
import { depsEqual, useMounted, usePreviousIf } from "./reactUtil";
import { ChatInput, ChatHistory, ChatOptionsPanel } from "./components";
import {
    State,
    RefreshParams,
    OptionsParams,
    ChatParams,
    RequestMessage,
    ResponseMessage,
    ErrorMessage,
    HistoryMessage,
    compareRefreshParams,
    compareOptionsParams,
    compareChatParams,
} from "./types";
import { compactOptionSet, basicOptionSet, BasicOptions, VisualOptionSet } from "@promptions/promptions-ui";

const useStyles = makeStyles({
    appContainer: {
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        backgroundColor: tokens.colorNeutralBackground1,
        fontFamily: tokens.fontFamilyBase,
    },
    chatContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    },
    chatScrollArea: {
        flex: 1,
        overflowY: "scroll",
        position: "relative",
        scrollBehavior: "smooth",
        "&::-webkit-scrollbar": {
            width: "8px",
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: tokens.colorNeutralBackground3,
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: tokens.colorNeutralStroke1,
            borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: tokens.colorNeutralStroke2,
        },
    },
    chatPanel: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        position: "relative",
    },
    messagesContainer: {
        flex: 1,
        padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalM}`,
    },
    inputContainer: {
        padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
        backgroundColor: tokens.colorNeutralBackground1,
        borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
        position: "sticky",
        bottom: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
    },
    inputWrapper: {
        width: "50%",
        maxWidth: "800px",
    },
});

const chat = new ChatService();

// Available option sets
const availableOptionSets = [
    { key: "compact", label: "Compact Options", optionSet: compactOptionSet },
    { key: "expanded", label: "Expanded Options", optionSet: basicOptionSet },
];

// Default option set
const defaultOptionSet = basicOptionSet;

// Enable autoscroll for better UX in the new layout
const enableAutoscroll = true;

function updateHistoryContent(
    content: string,
    done: boolean,
    historySet: (fn: (prev: HistoryMessage[]) => void) => void,
) {
    historySet((draft) => {
        const lastMessage = draft.at(-1);
        if (lastMessage?.role !== "assistant") return;
        lastMessage.content = content;
        lastMessage.contentDone = done;
    });
}

function updateHistoryOptions(
    options: BasicOptions,
    done: boolean,
    historySet: (fn: (prev: HistoryMessage[]) => void) => void,
    currentOptionSet: VisualOptionSet<BasicOptions>,
) {
    historySet((draft) => {
        const lastMessage = draft.at(-1);
        if (lastMessage?.role !== "assistant") return;
        lastMessage.options = currentOptionSet.mergeOptions(lastMessage.options as BasicOptions, options);
        lastMessage.optionsDone = done;
    });
}

function updateHistoryWithError(message: ErrorMessage, historySet: (fn: (prev: HistoryMessage[]) => void) => void) {
    historySet((draft) => {
        draft.pop();
        draft.push(message);
    });
}

function updateHistoryClear(
    options: boolean,
    content: boolean,
    historySet: (fn: (prev: HistoryMessage[]) => void) => void,
    currentOptionSet: VisualOptionSet<BasicOptions>,
) {
    historySet((draft) => {
        const lastMessage = draft.at(-1);
        if (lastMessage?.role !== "assistant") return;
        if (options) {
            lastMessage.options = currentOptionSet.emptyOptions();
            lastMessage.optionsDone = false;
        }
        if (content) {
            lastMessage.content = "";
            lastMessage.contentDone = false;
        }
    });
}

const scrolledToBottom = (element: HTMLElement) => element.scrollTop > element.scrollHeight - element.clientHeight - 10;

// Helper function to get refresh parameters
const getRefreshParams = (history: HistoryMessage[], refreshRequestId: string): RefreshParams | undefined => {
    const refreshMessage = history.find((x) => x.id === refreshRequestId);
    const historyUpToRefresh = refreshMessage ? history.slice(0, history.indexOf(refreshMessage)) : undefined;
    return historyUpToRefresh && refreshMessage && refreshMessage.role === "assistant" && refreshMessage.contentDone
        ? { refreshMessage: refreshMessage, historyUpToRefresh }
        : undefined;
};

// Helper function to get options parameters
const getOptionsParams = (
    penultRequest: RequestMessage | undefined,
    lastResponse: ResponseMessage | undefined,
    prevHistory: HistoryMessage[],
): OptionsParams | undefined => {
    return penultRequest && lastResponse
        ? {
              message: penultRequest.content,
              prevHistory: prevHistory,
          }
        : undefined;
};

// Helper function to get chat parameters
const getChatParams = (
    penultRequest: RequestMessage | undefined,
    lastResponse: ResponseMessage | undefined,
    prevHistory: HistoryMessage[],
    refreshRequestId: string,
): ChatParams | undefined => {
    return penultRequest && lastResponse && lastResponse.optionsDone && !refreshRequestId
        ? {
              message: penultRequest.content,
              inlineOptions: lastResponse.options,
              prevHistory: prevHistory,
          }
        : undefined;
};

function elaborateMessagesWithOptions(messages: HistoryMessage[]): ChatMessage[] {
    const output: ChatMessage[] = [];

    for (const msg of messages) {
        if (msg.role === "user") {
            output.push({ role: "user", content: msg.content });
        }
        if (msg.role === "assistant") {
            const options = msg.options;
            if (options.prettyPrintAsConversation) {
                const { question, answer } = options.prettyPrintAsConversation();
                output.push({ role: "assistant", content: question });
                output.push({ role: "user", content: answer });
                output.push({ role: "assistant", content: msg.content });
            } else {
                output.push({ role: "user", content: options.prettyPrint() });
                output.push({ role: "assistant", content: msg.content });
            }
        }
    }

    return output;
}

const ChatPanel: React.FC<{
    refreshRequest: State<string>;
    historyState: State<HistoryMessage[]>;
    pendingScroll: React.MutableRefObject<boolean>;
    chatContainerRef: React.RefObject<HTMLDivElement>;
    styles: ReturnType<typeof useStyles>;
    currentOptionSet: VisualOptionSet<BasicOptions>;
    promptions: PromptionsService;
}> = (props) => {
    const { historyState, refreshRequest, pendingScroll, chatContainerRef, styles, currentOptionSet, promptions } =
        props;
    const penultMessage = historyState.get.at(-2);
    const lastMessage = historyState.get.at(-1);
    const penultRequest = penultMessage?.role === "user" ? penultMessage : undefined;
    const lastResponse = lastMessage?.role === "assistant" ? lastMessage : undefined;

    const prevHistory = usePreviousIf(historyState.get.slice(0, -2), depsEqual);
    const _setter = historyState.set;
    const historySet = React.useCallback(
        (fn: (prev: HistoryMessage[]) => void) => {
            _setter((prev: any) => {
                const snapshot = current(prev);
                fn(prev);

                if (chatContainerRef.current != null) {
                    // We don't want to fight the user over the scroll position.
                    // If the user has scrolled up, we won't scroll down.

                    // Two conditions when we want to scroll:
                    //   - new messages are being appended
                    //   - the user is at the bottom of the chat
                    const shouldScroll = snapshot.length < prev.length || scrolledToBottom(chatContainerRef.current);
                    if (shouldScroll && enableAutoscroll) pendingScroll.current = true;
                }
            });
        },
        [_setter, pendingScroll, chatContainerRef],
    );

    const doRefreshParams = usePreviousIf(getRefreshParams(historyState.get, refreshRequest.get), compareRefreshParams);

    React.useEffect(() => {
        if (doRefreshParams === undefined) return;

        const abort = new AbortController();

        // Debounce the async function call by 100ms
        const timeoutId = setTimeout(() => {
            (async () => {
                if (abort.signal.aborted) {
                    return;
                }

                historySet((draft) => {
                    const refreshMessage = draft.find((x) => x.id === doRefreshParams.refreshMessage.id);
                    if (refreshMessage && refreshMessage.role === "assistant") {
                        refreshMessage.content = "";
                        refreshMessage.contentDone = false;
                        refreshMessage.options = basicOptionSet.emptyOptions();
                        refreshMessage.optionsDone = false;
                        draft.splice(draft.indexOf(refreshMessage) + 1);
                    }
                });

                const history = elaborateMessagesWithOptions(doRefreshParams.historyUpToRefresh);

                try {
                    await promptions.refreshOptions(
                        doRefreshParams.refreshMessage.options,
                        history,
                        (options, done) => {
                            updateHistoryOptions(options as BasicOptions, done, historySet, currentOptionSet);
                        },
                    );
                } catch (error) {
                    if (error instanceof OpenAI.APIUserAbortError) {
                        console.log("Chat request aborted by user");
                        return;
                    }
                    updateHistoryWithError(
                        { id: crypto.randomUUID(), role: "error", content: (error as Error).message },
                        historySet,
                    );
                } finally {
                    refreshRequest.set(() => "");
                }
            })();
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            abort.abort("effect disposed");
        };
    }, [doRefreshParams, historySet, refreshRequest.set]);

    // Kick off the creation of the options as required, when the chat history changes.
    const doOptionsParams = usePreviousIf(
        getOptionsParams(penultRequest, lastResponse, prevHistory),
        compareOptionsParams,
    );

    React.useEffect(() => {
        if (doOptionsParams === undefined) return;

        const { message, prevHistory } = doOptionsParams;

        const abort = new AbortController();

        const timeoutId = setTimeout(() => {
            (async () => {
                if (abort.signal.aborted) {
                    return;
                }

                updateHistoryClear(true, true, historySet, currentOptionSet);

                const history = [
                    ...elaborateMessagesWithOptions(prevHistory),
                    { role: "user", content: message } as const,
                ];

                if (abort.signal.aborted) {
                    return;
                }

                try {
                    await promptions.getOptions(history, (options, done) => {
                        updateHistoryOptions(options as BasicOptions, done, historySet, currentOptionSet);
                    });
                } catch (error) {
                    updateHistoryWithError(
                        { id: crypto.randomUUID(), role: "error", content: (error as Error).message },
                        historySet,
                    );
                }
            })();
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            abort.abort("effect disposed");
        };
    }, [doOptionsParams, historySet]);

    const doChatParams = usePreviousIf(
        getChatParams(penultRequest, lastResponse, prevHistory, refreshRequest.get),
        compareChatParams,
    );

    React.useEffect(() => {
        if (doChatParams === undefined) return;

        const { message, inlineOptions, prevHistory } = doChatParams;

        const abort = new AbortController();

        // Debounce the async function call by 100ms
        const timeoutId = setTimeout(() => {
            (async () => {
                if (abort.signal.aborted) {
                    return;
                }

                // Clear content before regenerating.
                updateHistoryClear(false, true, historySet, currentOptionSet);

                const history = [
                    {
                        role: "system",
                        content:
                            "You are a helpful AI chat bot. When responding to a user consider whether they have provided any additional settings or selections. If they have, do not ask them extra follow-up questions but continue with their intent based on the context.",
                    } as const,
                    ...elaborateMessagesWithOptions([
                        ...prevHistory,
                        { id: "", role: "user", content: message } as const,
                        {
                            id: "",
                            role: "assistant",
                            content: "",
                            options: inlineOptions as BasicOptions,
                            optionsDone: false,
                            contentDone: false,
                        } as const,
                    ]).slice(0, -1),
                ];

                if (abort.signal.aborted) {
                    return;
                }

                try {
                    await chat.streamChat(
                        history,
                        (content, done) => {
                            updateHistoryContent(content, done, historySet);
                        },
                        { signal: abort.signal },
                    );
                } catch (error) {
                    if (error instanceof OpenAI.APIUserAbortError) {
                        console.log("Chat request aborted by user");
                        return;
                    }
                    updateHistoryWithError(
                        { id: crypto.randomUUID(), role: "error", content: (error as Error).message },
                        historySet,
                    );
                }
            })();
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            abort.abort("effect disposed");
        };
    }, [doChatParams, historySet]);

    const send = async (message: string) => {
        historySet((draft) => {
            draft.push({ id: crypto.randomUUID(), role: "user", content: message });
            draft.push({
                id: crypto.randomUUID(),
                role: "assistant",
                options: currentOptionSet.emptyOptions(),
                optionsDone: false,
                content: "",
                contentDone: false,
            });
        });
    };

    return (
        <div className={styles.chatPanel}>
            {/* Messages container without scrolling */}
            <div className={styles.messagesContainer}>
                <ChatHistory history={historyState.get} historySet={historySet} currentOptionSet={currentOptionSet} />
            </div>
            {/* Input container anchored to bottom */}
            <div className={styles.inputContainer}>
                <div className={styles.inputWrapper}>
                    <ChatInput
                        disabled={
                            lastResponse !== undefined && (!lastResponse.optionsDone || !lastResponse.contentDone)
                        }
                        send={send}
                        historyState={historyState}
                    />
                </div>
            </div>
        </div>
    );
};

function App() {
    const mount = useMounted();
    const [history, setChatHistory] = React.useState<HistoryMessage[]>([]);
    const [refreshRequestId, setRefreshRequestId] = React.useState<string>("");
    const [currentOptionSet, setCurrentOptionSet] = React.useState<VisualOptionSet<BasicOptions>>(defaultOptionSet);
    const [optionsPanelVisible, setOptionsPanelVisible] = React.useState(false);
    const styles = useStyles();

    // Create promptions service instance with current option set
    const promptions = React.useMemo(() => {
        return new PromptionsService(chat, currentOptionSet);
    }, [currentOptionSet]);

    const historyState: State<HistoryMessage[]> = {
        get: history,
        set: React.useCallback(
            (f: any) => {
                if (!mount.isMounted) return;
                setChatHistory((prev) => {
                    const next = produce(prev, f);
                    return next;
                });
            },
            [mount],
        ),
    };

    const refreshRequest: State<string> = {
        get: refreshRequestId,
        set: React.useCallback(
            (f: (prev: string) => void) => {
                if (!mount.isMounted) return;
                setRefreshRequestId((prev) => {
                    const next = produce(prev, f);
                    return next;
                });
            },
            [mount],
        ),
    };

    const pendingScroll = React.useRef(false);
    const chatContainerRef = React.useRef<HTMLDivElement>(null);

    const handleOptionSetChange = (newOptionSet: VisualOptionSet<BasicOptions>) => {
        setCurrentOptionSet(newOptionSet);
    };

    const handleToggleOptionsPanel = () => {
        setOptionsPanelVisible(!optionsPanelVisible);
    };

    React.useLayoutEffect(() => {
        if (pendingScroll.current && chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                behavior: "smooth",
                top: chatContainerRef.current.scrollHeight,
            });
            pendingScroll.current = false;
        }
    });

    return (
        <FluentProvider theme={webLightTheme}>
            <div className={styles.appContainer}>
                {/* Expanding Sidebar */}
                <ChatOptionsPanel
                    visualOptionSet={currentOptionSet}
                    onOptionSetChange={handleOptionSetChange}
                    availableOptionSets={availableOptionSets}
                    isVisible={optionsPanelVisible}
                    onToggleVisibility={handleToggleOptionsPanel}
                />

                {/* Chat Container */}
                <div className={styles.chatContainer}>
                    <div className={styles.chatScrollArea} ref={chatContainerRef}>
                        <ChatPanel
                            refreshRequest={refreshRequest}
                            historyState={historyState}
                            pendingScroll={pendingScroll}
                            chatContainerRef={chatContainerRef}
                            styles={styles}
                            currentOptionSet={currentOptionSet}
                            promptions={promptions}
                        />
                    </div>
                </div>
            </div>
        </FluentProvider>
    );
}

export default App;



================================================
FILE: apps/promptions-chat/src/index.css
================================================
body {
    margin: 0;
    font-family:
        -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
        "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
}

/* Markdown Styling */
.markdown-content {
    line-height: 1.6;
    color: #333;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    font-weight: 600;
    line-height: 1.25;
}

.markdown-content h1 {
    font-size: 1.8em;
    border-bottom: 2px solid #e1e4e8;
    padding-bottom: 0.3em;
}

.markdown-content h2 {
    font-size: 1.5em;
    border-bottom: 1px solid #e1e4e8;
    padding-bottom: 0.3em;
}

.markdown-content h3 {
    font-size: 1.25em;
}

.markdown-content h4 {
    font-size: 1.1em;
}

.markdown-content h5,
.markdown-content h6 {
    font-size: 1em;
}

.markdown-content p {
    margin-bottom: 1em;
}

.markdown-content ul,
.markdown-content ol {
    padding-left: 1.5em;
    margin-bottom: 1em;
}

.markdown-content li {
    margin-bottom: 0.25em;
}

.markdown-content blockquote {
    margin: 1em 0;
    padding: 0.5em 1em;
    border-left: 4px solid #dfe2e5;
    background-color: #f6f8fa;
    color: #6a737d;
}

.markdown-content blockquote p {
    margin: 0;
}

/* Code styling */
.markdown-content code {
    background-color: #f1f3f4;
    border: 1px solid #e1e4e8;
    border-radius: 4px;
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    color: #d73a49;
}

.markdown-content pre {
    background-color: #f6f8fa;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    padding: 1em;
    overflow-x: auto;
    margin: 1em 0;
    line-height: 1.45;
}

.markdown-content pre code {
    background: none;
    border: none;
    padding: 0;
    color: inherit;
    font-size: 0.85em;
}

/* Table styling */
.markdown-content table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    margin: 1em 0;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.markdown-content table th,
.markdown-content table td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #e1e4e8;
    border-right: 1px solid #e1e4e8;
}

.markdown-content table th:last-child,
.markdown-content table td:last-child {
    border-right: none;
}

.markdown-content table th {
    background-color: #f6f8fa;
    font-weight: 600;
    color: #24292e;
}

.markdown-content table tbody tr:hover {
    background-color: #f6f8fa;
}

.markdown-content table tbody tr:last-child td {
    border-bottom: none;
}

/* Links */
.markdown-content a {
    color: #0366d6;
    text-decoration: none;
}

.markdown-content a:hover {
    text-decoration: underline;
}

/* Horizontal rule */
.markdown-content hr {
    height: 1px;
    border: none;
    background-color: #e1e4e8;
    margin: 2em 0;
}

/* Images */
.markdown-content img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
}

/* Inline elements */
.markdown-content strong {
    font-weight: 600;
}

.markdown-content em {
    font-style: italic;
}

/* Task lists */
.markdown-content input[type="checkbox"] {
    margin-right: 0.5em;
}

/* Responsive tables */
@media (max-width: 768px) {
    .markdown-content table {
        font-size: 0.9em;
    }

    .markdown-content table th,
    .markdown-content table td {
        padding: 8px 12px;
    }
}



================================================
FILE: apps/promptions-chat/src/main.tsx
================================================
import React from "react";
import ReactDOM from "react-dom/client";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <FluentProvider theme={webLightTheme}>
            <App />
        </FluentProvider>
    </React.StrictMode>,
);



================================================
FILE: apps/promptions-chat/src/reactUtil.ts
================================================
import React from "react";

export function useMounted(): { readonly isMounted: boolean } {
    const state = React.useRef<{
        isMounted: boolean;
        mountId: object | undefined;
    }>({
        get isMounted() {
            return this.mountId !== undefined;
        },
        mountId: undefined,
    });
    React.useEffect(() => {
        const obj = state.current;
        const mountId = {};
        obj.mountId = mountId;
        return () => {
            if (obj.mountId === mountId) {
                obj.mountId = undefined;
            }
        };
    }, []);
    const obj = state.current;
    if (obj.mountId === undefined) {
        obj.mountId = {};
    }
    return obj;
}

/**
 * For `prev` that was passed as `next` in a previous render:
 * - If `condition(prev, next)` is true, returns `prev`.
 * - Otherwise, assigns `prev` to be `next` and returns it.
 *
 * @example
 * // Memoize using deep equality of the result:
 * const value = usePreviousIf(React.useMemo(() => {...compute value...}, [...deps...]), valueEquals);
 * @example
 * // Update state only after a condition is met:
 * const state = usePreviousIf(nextState, () => {...check arbitrary condition...})
 */
export function usePreviousIf<T>(next: T, condition: (prev: T, next: T) => boolean): T {
    const prevRef = React.useRef<readonly [T]>();
    return (prevRef.current = prevRef.current && condition(prevRef.current[0], next) ? prevRef.current : [next])[0];
}

/**
 * Compares dependencies for equality using React's algorithm, in the sense that for any given `deps1` and `deps2`, if
 * React's algorithm returns `true` or `false`, `depsEqual` returns the same value.
 *
 * (React's algorithm throws an error if the dependencies change length, but `depsEqual` doesn't.)
 */
export function depsEqual(deps1: React.DependencyList, deps2: React.DependencyList) {
    if (deps1.length !== deps2.length) return false;
    for (let i = 0; i < deps1.length; i++) {
        if (!Object.is(deps1[i], deps2[i])) return false;
    }
    return true;
}



================================================
FILE: apps/promptions-chat/src/types.ts
================================================
import { Options } from "../../../packages/promptions-llm/src";

// State type for reactive state management
export type State<T> = { get: T; set: (fn: (prev: T) => void) => void };

// Message types
export interface RequestMessage {
    id: string;
    role: "user";
    content: string;
}

export interface ResponseMessage {
    id: string;
    role: "assistant";
    options: Options;
    optionsDone: boolean;
    content: string;
    contentDone: boolean;
}

export type ErrorMessage = {
    id: string;
    role: "error";
    content: string;
};

export type HistoryMessage = RequestMessage | ResponseMessage | ErrorMessage;

export interface RefreshParams {
    refreshMessage: ResponseMessage;
    historyUpToRefresh: HistoryMessage[];
}

export interface OptionsParams {
    message: string;
    prevHistory: HistoryMessage[];
}

export interface ChatParams {
    message: string;
    inlineOptions: Options;
    prevHistory: HistoryMessage[];
}

// Comparison functions for effect parameters
export const compareRefreshParams = (prev: RefreshParams | undefined, next: RefreshParams | undefined): boolean => {
    return prev?.historyUpToRefresh === next?.historyUpToRefresh && prev?.refreshMessage.id === next?.refreshMessage.id;
};

export const compareOptionsParams = (prev: OptionsParams | undefined, next: OptionsParams | undefined): boolean => {
    return (
        prev !== undefined &&
        next !== undefined &&
        prev.message === next.message &&
        prev.prevHistory === next.prevHistory
    );
};

export const compareChatParams = (prev: ChatParams | undefined, next: ChatParams | undefined): boolean => {
    return (
        prev !== undefined &&
        next !== undefined &&
        prev.message === next.message &&
        prev.inlineOptions === next.inlineOptions &&
        prev.prevHistory === next.prevHistory
    );
};



================================================
FILE: apps/promptions-chat/src/vite-env.d.ts
================================================
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OPENAI_API_KEY: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}



================================================
FILE: apps/promptions-chat/src/components/AssistantMessage.tsx
================================================
import React from "react";
import { ResponseMessage } from "../types";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { Card, Skeleton, SkeletonItem, makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
    messageContainer: {
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: tokens.spacingVerticalM,
    },
    messageCard: {
        maxWidth: "100%",
        minWidth: "100%",
        backgroundColor: "transparent",
        color: tokens.colorNeutralForeground1,
        padding: tokens.spacingVerticalM,
        border: "none",
        boxShadow: "none",
    },
    messageContent: {
        fontSize: tokens.fontSizeBase300,
        lineHeight: tokens.lineHeightBase300,
    },
    thinkingContainer: {
        width: "80%",
    },
});

interface AssistantMessageProps {
    message: ResponseMessage;
}

export const AssistantMessage: React.FC<AssistantMessageProps> = ({ message }) => {
    const styles = useStyles();

    // Generate random widths for skeleton items
    const generateRandomWidth = () => Math.floor(Math.random() * 40) + 50; // 50-90%
    const skeletonWidths = React.useMemo(
        () => [`${generateRandomWidth()}%`, `${generateRandomWidth()}%`, `${generateRandomWidth()}%`],
        [],
    );

    return (
        <div className={styles.messageContainer}>
            <Card className={styles.messageCard}>
                {/* Render markdown content */}
                {message.content || !message.contentDone ? (
                    message.content ? (
                        <div className={styles.messageContent}>
                            <MarkdownRenderer content={message.content} />
                        </div>
                    ) : (
                        <div className={styles.thinkingContainer}>
                            <Skeleton
                                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
                                aria-label="Loading Content"
                            >
                                <SkeletonItem style={{ width: skeletonWidths[0] }} />
                                <SkeletonItem style={{ width: skeletonWidths[1] }} />
                                <SkeletonItem style={{ width: skeletonWidths[2] }} />
                            </Skeleton>
                        </div>
                    )
                ) : null}
            </Card>
        </div>
    );
};



================================================
FILE: apps/promptions-chat/src/components/ChatHistory.tsx
================================================
import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { UserMessage, AssistantMessage, ErrorMessageComponent } from "./";
import { HistoryMessage } from "../types";
import { BasicOptions, VisualOptionSet } from "@promptions/promptions-ui";

const useStyles = makeStyles({
    chatRow: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "0",
        marginBottom: tokens.spacingVerticalXL,
    },
    messagesColumn: {
        width: "50%",
        minWidth: "50%",
        display: "flex",
        flexDirection: "column",
    },
    optionsColumn: {
        width: "25%",
        minWidth: "25%",
        paddingLeft: tokens.spacingHorizontalM,
        position: "sticky",
        top: tokens.spacingVerticalL,
    },
    spacerColumn: {
        width: "25%",
    },
    welcomeContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        padding: tokens.spacingHorizontalXL,
    },
    welcomeIcon: {
        fontSize: "64px",
        marginBottom: tokens.spacingVerticalL,
    },
    welcomeTitle: {
        fontSize: tokens.fontSizeBase600,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForeground1,
        marginBottom: tokens.spacingVerticalM,
    },
    welcomeSubtitle: {
        fontSize: tokens.fontSizeBase300,
        color: tokens.colorNeutralForeground2,
        maxWidth: "400px",
        lineHeight: "1.5",
    },
    refreshButton: {
        minWidth: "24px",
        height: "24px",
        padding: "2px",
        marginBottom: tokens.spacingVerticalS,
    },
    optionsHeader: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: tokens.spacingVerticalS,
    },
});

interface ChatHistoryProps {
    history: HistoryMessage[];
    historySet: (fn: (prev: HistoryMessage[]) => void) => void;
    currentOptionSet: VisualOptionSet<BasicOptions>;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ history, historySet, currentOptionSet }) => {
    const styles = useStyles();

    const OptionRenderer = currentOptionSet.getComponent();

    if (history.length === 0) {
        return (
            <div className={styles.chatRow}>
                <div className={styles.spacerColumn}></div>
                <div className={styles.messagesColumn}>
                    <div className={styles.welcomeContainer}>
                        <div className={styles.welcomeIcon}>🤖</div>
                        <h2 className={styles.welcomeTitle}>Welcome to Promptions AI Chat</h2>
                        <p className={styles.welcomeSubtitle}>Start a conversation by typing a message below.</p>
                    </div>
                </div>
                <div className={styles.optionsColumn}></div>
            </div>
        );
    }

    // Find the latest assistant message
    const latestAssistantMessage = [...history].reverse().find((msg) => msg.role === "assistant");
    const latestAssistantId = latestAssistantMessage?.id;

    const messageElements: JSX.Element[] = [];

    for (let i = 0; i < history.length; i++) {
        const message = history[i];

        if (message.role === "user") {
            messageElements.push(
                <div key={message.id} className={styles.chatRow}>
                    <div className={styles.spacerColumn}></div>
                    <div className={styles.messagesColumn}>
                        <UserMessage message={message} />
                    </div>
                    <div className={styles.optionsColumn}></div>
                </div>,
            );
        } else if (message.role === "assistant") {
            messageElements.push(
                <div key={message.id} className={styles.chatRow}>
                    <div className={styles.spacerColumn}></div>
                    <div className={styles.messagesColumn}>
                        <AssistantMessage message={message} />
                    </div>
                    <div className={styles.optionsColumn}>
                        {message.options && !message.options.isEmpty() && (
                            <>
                                {/* <div className={styles.optionsHeader}>
                                    {onRefreshOptions && (
                                        <Button
                                            appearance="subtle"
                                            size="small"
                                            disabled={!message.optionsDone}
                                            icon={<ArrowClockwise24Regular />}
                                            onClick={() => onRefreshOptions(message.id)}
                                            className={styles.refreshButton}
                                            title={message.optionsDone ? "Refresh Options" : "Generating options..."}
                                        />
                                    )}
                                </div> */}
                                <OptionRenderer
                                    options={message.options as any}
                                    set={(updatedOptions) => {
                                        historySet((draft) => {
                                            const msg = draft.find((m) => m.id === message.id);
                                            if (msg && msg.role === "assistant") {
                                                msg.options = updatedOptions as BasicOptions;
                                            }
                                        });
                                    }}
                                    disabled={message.id !== latestAssistantId}
                                />
                            </>
                        )}
                    </div>
                </div>,
            );
        } else if (message.role === "error") {
            messageElements.push(
                <div key={message.id} className={styles.chatRow}>
                    <div className={styles.spacerColumn}></div>
                    <div className={styles.messagesColumn}>
                        <ErrorMessageComponent message={message} />
                    </div>
                    <div className={styles.optionsColumn}></div>
                </div>,
            );
        }
    }

    return <>{messageElements}</>;
};



================================================
FILE: apps/promptions-chat/src/components/ChatInput.tsx
================================================
import React from "react";
import { HistoryMessage } from "../types";
import { Textarea, makeStyles, tokens, Button } from "@fluentui/react-components";
import { Send24Regular, Delete24Regular, Info16Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
    inputContainer: {
        display: "flex",
        gap: tokens.spacingHorizontalS,
        alignItems: "center",
        backgroundColor: tokens.colorNeutralBackground1,
    },
    containerWrapper: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalXS,
    },
    input: {
        flex: 1,
        minHeight: "40px",
    },
    sendButton: {
        minWidth: "32px",
        height: "32px",
        padding: "6px",
    },
    clearButton: {
        minWidth: "32px",
        height: "32px",
        padding: "6px",
    },
    disclaimerText: {
        fontSize: tokens.fontSizeBase100,
        color: tokens.colorNeutralForeground2,
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalXXS,
        paddingLeft: tokens.spacingHorizontalXS,
    },
});

type State<T> = { get: T; set: (fn: (prev: T) => void) => void };

interface ChatInputProps {
    disabled: boolean;
    send: (message: string) => void;
    historyState: State<HistoryMessage[]>;
}

export const ChatInput: React.FC<ChatInputProps> = (props) => {
    const { disabled, send, historyState } = props;
    const [text, setText] = React.useState("");
    const styles = useStyles();

    const onSend = () => {
        if (text.trim()) {
            setText("");
            send(text);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" && !event.shiftKey && !disabled && !event.repeat && text.trim()) {
            event.preventDefault();
            onSend();
        }
    };

    return (
        <div className={styles.containerWrapper}>
            <div className={styles.inputContainer}>
                <Textarea
                    value={text}
                    disabled={disabled}
                    placeholder="Type your message here... (Press Enter to send)"
                    autoComplete="off"
                    autoFocus
                    className={styles.input}
                    onChange={(_, data) => setText(data.value)}
                    onKeyDown={handleKeyDown}
                    resize="vertical"
                />
                <Button
                    appearance="primary"
                    disabled={disabled || !text.trim()}
                    onClick={onSend}
                    className={styles.sendButton}
                    icon={<Send24Regular />}
                    title="Send message"
                />
                <Button
                    appearance="subtle"
                    onClick={() => {
                        historyState.set(() => []);
                    }}
                    className={styles.clearButton}
                    icon={<Delete24Regular />}
                    title="Clear chat"
                />
            </div>
            <div className={styles.disclaimerText}>
                <Info16Regular />
                AI generated responses should be verified before taking action.
            </div>
        </div>
    );
};



================================================
FILE: apps/promptions-chat/src/components/ChatOptionsPanel.tsx
================================================
import React from "react";
import { makeStyles, tokens, Text, Card, CardHeader, Button, RadioGroup, Radio } from "@fluentui/react-components";
import { Settings24Regular } from "@fluentui/react-icons";
import { VisualOptionSet, BasicOptions } from "@promptions/promptions-ui";

const useStyles = makeStyles({
    sidebar: {
        height: "100vh",
        backgroundColor: tokens.colorNeutralBackground2,
        borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease-in-out",
        overflow: "hidden",
    },
    sidebarCollapsed: {
        width: "60px",
        minWidth: "60px",
    },
    sidebarExpanded: {
        width: "300px",
        minWidth: "300px",
    },
    toggleButton: {
        width: "48px",
        height: "48px",
        margin: tokens.spacingVerticalS,
        alignSelf: "center",
        borderRadius: tokens.borderRadiusMedium,
        flexShrink: 0,
    },
    expandedContent: {
        padding: tokens.spacingHorizontalM,
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalM,
        transition: "opacity 0.3s ease-in-out 0.1s", // Delay opacity to let width animate first
        overflow: "auto",
        flex: 1,
        minWidth: 0, // Prevent content from forcing width
    },
    collapsedContent: {
        opacity: 0,
        pointerEvents: "none",
        transition: "opacity 0.2s ease-in-out", // Faster fade out
    },
    card: {
        padding: tokens.spacingHorizontalM,
        backgroundColor: tokens.colorNeutralBackground1,
    },
    optionGroup: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalXS,
    },
    optionLabel: {
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForeground1,
        marginBottom: tokens.spacingVerticalXS,
    },
    radioGroup: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalXS,
    },
    description: {
        fontSize: tokens.fontSizeBase100,
        color: tokens.colorNeutralForeground2,
        marginTop: tokens.spacingVerticalXS,
        lineHeight: "1.4",
    },
});

export interface ChatOptionsPanelProps {
    visualOptionSet: VisualOptionSet<BasicOptions>;
    onOptionSetChange: (optionSet: VisualOptionSet<BasicOptions>) => void;
    availableOptionSets: { key: string; label: string; optionSet: VisualOptionSet<BasicOptions> }[];
    isVisible: boolean;
    onToggleVisibility: () => void;
}

export const ChatOptionsPanel: React.FC<ChatOptionsPanelProps> = ({
    visualOptionSet,
    onOptionSetChange,
    availableOptionSets,
    isVisible,
    onToggleVisibility,
}) => {
    const styles = useStyles();

    const currentOptionKey = availableOptionSets.find((opt) => opt.optionSet === visualOptionSet)?.key || "compact";

    const handleOptionChange = (_event: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
        const selectedOption = availableOptionSets.find((opt) => opt.key === data.value);
        if (selectedOption) {
            onOptionSetChange(selectedOption.optionSet);
        }
    };

    return (
        <div className={`${styles.sidebar} ${isVisible ? styles.sidebarExpanded : styles.sidebarCollapsed}`}>
            {/* Toggle Button */}
            <Button
                className={styles.toggleButton}
                appearance="subtle"
                icon={<Settings24Regular />}
                onClick={onToggleVisibility}
                title={isVisible ? "Close Options Panel" : "Open Options Panel"}
            />

            <div className={`${styles.expandedContent} ${!isVisible ? styles.collapsedContent : ""}`}>
                <Card className={styles.card}>
                    <CardHeader>
                        <Text className={styles.optionLabel}>Display Style</Text>
                    </CardHeader>

                    <div className={styles.optionGroup}>
                        <RadioGroup
                            value={currentOptionKey}
                            onChange={handleOptionChange}
                            className={styles.radioGroup}
                        >
                            {availableOptionSets.map((option) => (
                                <Radio key={option.key} value={option.key} label={option.label} />
                            ))}
                        </RadioGroup>
                        <Text className={styles.description}>
                            Choose how options are displayed in the chat. Expanded options show detailed controls, while
                            compact options use dropdown menus to save space.
                        </Text>
                    </div>
                </Card>
            </div>
        </div>
    );
};



================================================
FILE: apps/promptions-chat/src/components/ErrorMessageComponent.tsx
================================================
import React from "react";
import { ErrorMessage } from "../types";
import { Card, Text, makeStyles, tokens, Avatar } from "@fluentui/react-components";
import { ErrorCircle24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
    messageContainer: {
        display: "flex",
        justifyContent: "flext-start",
        marginBottom: tokens.spacingVerticalM,
    },
    messageCard: {
        maxWidth: "70%",
        backgroundColor: tokens.colorPaletteRedBackground1,
        padding: tokens.spacingVerticalM,
        border: "none",
        boxShadow: "none",
    },
    messageHeader: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalS,
        marginBottom: tokens.spacingVerticalS,
    },
    errorTitle: {
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForeground2,
    },
    messageContent: {
        fontSize: tokens.fontSizeBase300,
        lineHeight: tokens.lineHeightBase300,
        color: tokens.colorNeutralForeground1,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
    },
});

interface ErrorMessageComponentProps {
    message: ErrorMessage;
}

export const ErrorMessageComponent: React.FC<ErrorMessageComponentProps> = ({ message }) => {
    const styles = useStyles();

    return (
        <div className={styles.messageContainer}>
            <Card className={styles.messageCard}>
                <div className={styles.messageHeader}>
                    <Avatar icon={<ErrorCircle24Regular />} size={20} color="neutral" />
                    <Text className={styles.errorTitle}>Error</Text>
                </div>
                <Text className={styles.messageContent}>{message.content}</Text>
            </Card>
        </div>
    );
};



================================================
FILE: apps/promptions-chat/src/components/index.ts
================================================
export { SendButton } from "./SendButton";
export { UserMessage } from "./UserMessage";
export { AssistantMessage } from "./AssistantMessage";
export { ErrorMessageComponent } from "./ErrorMessageComponent";
export { ChatInput } from "./ChatInput";
export { MarkdownRenderer } from "./MarkdownRenderer";
export { ChatHistory } from "./ChatHistory";
export { ChatOptionsPanel } from "./ChatOptionsPanel";



================================================
FILE: apps/promptions-chat/src/components/MarkdownRenderer.tsx
================================================
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // You can choose a different theme

interface MarkdownRendererProps {
    content: string;
    className?: string;
    style?: React.CSSProperties;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className, style }) => {
    return (
        <div className={`markdown-content ${className || ""}`} style={style}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    // Custom components for better styling
                    a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
                    // Ensure code blocks have proper styling
                    pre: ({ node, ...props }) => <pre {...props} style={{ overflow: "auto", maxWidth: "100%" }} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;



================================================
FILE: apps/promptions-chat/src/components/messageStyles.ts
================================================
[Empty file]


================================================
FILE: apps/promptions-chat/src/components/SendButton.tsx
================================================
import React from "react";

export const SendButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return <button {...props}>Send</button>;
};



================================================
FILE: apps/promptions-chat/src/components/UserMessage.tsx
================================================
import React from "react";
import { RequestMessage } from "../types";
import { Card, Text, makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
    messageContainer: {
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: tokens.spacingVerticalM,
    },
    messageCard: {
        maxWidth: "100%",
        backgroundColor: tokens.colorNeutralBackground5,
        color: tokens.colorNeutralForeground1,
        padding: tokens.spacingVerticalM,
        marginLeft: tokens.spacingVerticalM,
        border: "none",
        boxShadow: "none",
    },
    messageHeader: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalS,
        marginBottom: tokens.spacingVerticalS,
    },
    userName: {
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
    },
    messageContent: {
        fontSize: tokens.fontSizeBase300,
        lineHeight: tokens.lineHeightBase300,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
    },
});

interface UserMessageProps {
    message: RequestMessage;
}

export const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
    const styles = useStyles();

    return (
        <div className={styles.messageContainer}>
            <Card className={styles.messageCard}>
                <Text className={styles.messageContent}>{message.content}</Text>
            </Card>
        </div>
    );
};



================================================
FILE: apps/promptions-chat/src/services/ChatService.ts
================================================
import OpenAI from "openai";

interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

export class ChatService {
    private client: OpenAI;

    constructor() {
        // In a real application, you'd want to handle the API key more securely
        // For development, you can set VITE_OPENAI_API_KEY in your .env file
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;

        if (!apiKey) {
            throw new Error(
                "OpenAI API key is required. Please set VITE_OPENAI_API_KEY in your environment variables.",
            );
        }

        this.client = new OpenAI({
            apiKey,
            dangerouslyAllowBrowser: true, // Only for demo purposes - use a backend in production
        });
    }

    async streamChat(
        messages: ChatMessage[],
        onContent: (content: string, done: boolean) => void,
        options?: { signal?: AbortSignal },
    ): Promise<void> {
        console.log(JSON.stringify(messages, null, 2));

        try {
            const stream = await this.client.chat.completions.create(
                {
                    model: "gpt-4.1",
                    messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
                    stream: true,
                    temperature: 0.7,
                    max_tokens: 1000,
                },
                {
                    signal: options?.signal,
                },
            );

            let accumulatedContent = "";

            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content ?? "";
                accumulatedContent += content;
                onContent(accumulatedContent, false);
            }

            onContent(accumulatedContent, true);
        } catch (error) {
            console.error("Error in streamChat:", error);
            throw error;
        }
    }

    async sendMessage(messages: ChatMessage[]): Promise<string> {
        try {
            const response = await this.client.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
                temperature: 0.7,
                max_tokens: 1000,
            });

            return response.choices[0]?.message?.content || "No response received";
        } catch (error) {
            console.error("Error in sendMessage:", error);
            throw error;
        }
    }
}



================================================
FILE: apps/promptions-chat/src/services/PromptionsService.ts
================================================
import { ChatService } from "./ChatService";
import { Options, OptionSet } from "@promptions/promptions-llm";

export interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

export class PromptionsService {
    private chatService: ChatService;
    private optionSet: OptionSet<Options>;

    constructor(chatService: ChatService, optionSet: OptionSet<Options>) {
        this.chatService = chatService;
        this.optionSet = optionSet;
    }

    async getOptions(
        chatHistory: ChatMessage[],
        onOptions: (options: Options, done: boolean) => void,
        options?: { signal?: AbortSignal },
    ): Promise<void> {
        const systemPrompt: ChatMessage = {
            role: "system",
            content: `You are an AI assistant that generates interactive options based on conversation history. 

Given a chat conversation, analyze the context and generate relevant interactive options that the user might want to select from.

Your response must be a valid JSON array following this exact schema:
${this.optionSet.getSchemaSpec()}

Guidelines for generating options:
1. Analyze the conversation history to understand the context and user's needs
2. Generate 2-4 relevant option controls that would be useful for the user
3. For single-select options, provide 3-5 meaningful choices
4. For multi-select options, provide 4-8 options where multiple selections make sense
5. Use clear, descriptive labels for both the controls and their options
6. Make sure the options are contextually relevant to the conversation
7. Return ONLY the JSON array in a single json markdown block, without any additional text or explanation.

Example output format:
<example>
\`\`\`json
[
  ...
]
\`\`\`
</example>
`,
        };

        const messages: ChatMessage[] = [systemPrompt, ...chatHistory];

        await this.chatService.streamChat(
            messages,
            (content, done) => {
                if (done) {
                    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
                    const jsonText = jsonMatch ? jsonMatch[1] : content.trim();
                    const parsedOptions = this.optionSet.validateJSON(jsonText);
                    if (!parsedOptions) {
                        throw new Error(`Invalid options JSON: ${jsonText}`);
                    }
                    return onOptions(parsedOptions, true);
                }
                const partialOptions = this.tryParsePartialOptions(content);
                if (partialOptions) {
                    onOptions(partialOptions, done);
                }
            },
            options,
        );
    }

    async refreshOptions(
        existingOptions: Options,
        chatHistory: ChatMessage[],
        onOptions: (options: Options, done: boolean) => void,
        options?: { signal?: AbortSignal },
    ): Promise<void> {
        const formattedExistingOptions = existingOptions.prettyPrint();

        const systemPrompt: ChatMessage = {
            role: "system",
            content: `You are an AI assistant that regenerates interactive options based on conversation history and existing options. 

Given a chat conversation and a set of existing options, analyze the updated context and generate new relevant interactive options that the user might want to select from. Consider the existing options as context but generate fresh, contextually appropriate options for the current state of the conversation.

Current existing options:
${formattedExistingOptions}

Your response must be a valid JSON array following this exact schema:
${this.optionSet.getSchemaSpec()}

Guidelines for regenerating options:
1. Analyze the conversation history to understand the updated context and user's evolving needs
2. Consider the existing options but don't feel constrained to replicate them exactly
3. Generate 2-4 relevant option controls that would be useful for the user in the current context
4. For single-select options, provide 3-5 meaningful choices
5. For multi-select options, provide 4-8 options where multiple selections make sense
6. Use clear, descriptive labels for both the controls and their options
7. Make sure the new options are contextually relevant to the current conversation state
8. The new options should reflect any progression or changes in the conversation since the existing options were generated
9. Return ONLY the JSON array in a single json markdown block, without any additional text or explanation.

Example output format:
<example>
\`\`\`json
[
  ...
]
\`\`\`
`,
        };

        const messages: ChatMessage[] = [systemPrompt, ...chatHistory];

        await this.chatService.streamChat(
            messages,
            (content, done) => {
                if (done) {
                    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
                    const jsonText = jsonMatch ? jsonMatch[1] : content.trim();
                    const parsedOptions = this.optionSet.validateJSON(jsonText);
                    if (!parsedOptions) {
                        throw new Error(`Invalid options JSON: ${jsonText}`);
                    }
                    return onOptions(parsedOptions, true);
                }
                const partialOptions = this.tryParsePartialOptions(content);
                if (partialOptions) {
                    onOptions(partialOptions, done);
                }
            },
            options,
        );
    }

    private tryParsePartialOptions(optionsStr: string): Options | undefined {
        try {
            const jsonMatch = optionsStr.match(/```(?:json)?\s*($$[\s\S]*?$$)\s*```/);
            let jsonStr = jsonMatch ? jsonMatch[1] : optionsStr;
            return this.optionSet.validatePartialJSON?.(jsonStr);
        } catch (error) {
            return undefined;
        }
    }
}



================================================
FILE: apps/promptions-image/index.html
================================================
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Promptions Image</title>
    </head>
    <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
    </body>
</html>



================================================
FILE: apps/promptions-image/package.json
================================================
{
    "name": "@promptions/promptions-image",
    "version": "1.0.0",
    "type": "module",
    "description": "Image generation interface for promptions using OpenAI DALL-E and Fluent UI",
    "license": "MIT",
    "scripts": {
        "dev": "vite --port 3004",
        "build": "tsc && vite build",
        "preview": "vite preview",
        "typecheck": "tsc --noEmit",
        "clean": "rimraf dist"
    },
    "dependencies": {
        "@fluentui/react-components": "^9.54.0",
        "@fluentui/react-icons": "^2.0.258",
        "@promptions/promptions-ui": "workspace:*",
        "immer": "^10.1.1",
        "openai": "^5.8.2",
        "react": "^18.3.1",
        "react-dom": "^18.3.1"
    },
    "devDependencies": {
        "@types/react": "^18.3.12",
        "@types/react-dom": "^18.3.1",
        "@vitejs/plugin-react": "^4.3.3",
        "rimraf": "^5.0.0",
        "typescript": "^5.6.3",
        "vite": "^7.0.3"
    }
}



================================================
FILE: apps/promptions-image/tsconfig.json
================================================
{
    "compilerOptions": {
        "target": "ES2020",
        "useDefineForClassFields": true,
        "lib": ["ES2020", "DOM", "DOM.Iterable"],
        "module": "ESNext",
        "skipLibCheck": true,
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true
    },
    "include": ["src"],
    "references": [{ "path": "./tsconfig.node.json" }]
}



================================================
FILE: apps/promptions-image/tsconfig.node.json
================================================
{
    "compilerOptions": {
        "composite": true,
        "skipLibCheck": true,
        "module": "ESNext",
        "moduleResolution": "bundler",
        "allowSyntheticDefaultImports": true,
        "strict": true
    },
    "include": ["vite.config.ts"]
}



================================================
FILE: apps/promptions-image/vite.config.ts
================================================
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3004,
    },
    define: {
        "process.env": {},
    },
});



================================================
FILE: apps/promptions-image/.env.example
================================================
# Copy this file to .env and add your OpenAI API key
VITE_OPENAI_API_KEY=your_openai_api_key_here



================================================
FILE: apps/promptions-image/src/App.tsx
================================================
import React from "react";
import {
    FluentProvider,
    webLightTheme,
    makeStyles,
    tokens,
    Menu,
    MenuTrigger,
    MenuPopover,
    MenuList,
    MenuItem,
    Button,
} from "@fluentui/react-components";
import { ChevronDown24Regular, Options24Regular } from "@fluentui/react-icons";
import { ImageService } from "./services/ImageService";
import { PromptionsImageService } from "./services/PromptionsImageService";
import { produce } from "immer";
import { useMounted } from "./reactUtil";
import { ImageInput, GeneratedImage, OptionsPanel } from "./components";
import { compactOptionSet, basicOptionSet, BasicOptions, Options, VisualOptionSet } from "@promptions/promptions-ui";

const useStyles = makeStyles({
    appContainer: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: tokens.colorNeutralBackground1,
        fontFamily: tokens.fontFamilyBase,
    },
    header: {
        padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalXL}`,
        backgroundColor: tokens.colorNeutralBackground2,
        borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
        boxShadow: tokens.shadow4,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerTitle: {
        fontSize: tokens.fontSizeBase600,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForeground1,
        margin: 0,
    },
    headerActions: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalM,
    },
    mainContainer: {
        flex: 1,
        display: "flex",
        overflow: "hidden",
    },
    leftPanel: {
        width: "40%",
        padding: tokens.spacingHorizontalL,
        borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalL,
    },
    rightPanel: {
        width: "60%",
        padding: tokens.spacingHorizontalL,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: tokens.colorNeutralBackground2,
    },
});

// State type for reactive state management
type State<T> = { get: T; set: (fn: (prev: T) => void) => void };

interface ImageState {
    prompt: string;
    options: Options;
    optionsLoading: boolean;
    imageUrl?: string;
    imageLoading: boolean;
    error?: string;
    abortController?: AbortController;
}

const imageService = new ImageService();

function App() {
    const mount = useMounted();
    const abortControllerRef = React.useRef<AbortController | null>(null);
    const [visualOptionsSet, setVisualOptionsSet] = React.useState<VisualOptionSet<BasicOptions>>(basicOptionSet);

    const optionsSet = React.useMemo(() => {
        const { getComponent, ...options } = visualOptionsSet;
        return options;
    }, [visualOptionsSet]);

    const getComponent = React.useMemo(() => visualOptionsSet.getComponent(), [visualOptionsSet]);

    const promptionsImageService = React.useMemo(() => {
        return new PromptionsImageService(imageService, optionsSet);
    }, [optionsSet]);

    const [state, setState] = React.useState<ImageState>({
        prompt: "",
        options: optionsSet.emptyOptions(),
        optionsLoading: false,
        imageLoading: false,
    });

    const handleOptionSetChange = (newOptionSet: VisualOptionSet<BasicOptions>) => {
        setVisualOptionsSet(newOptionSet);
    };

    const styles = useStyles();

    const imageState: State<ImageState> = {
        get: state,
        set: React.useCallback(
            (f: any) => {
                if (!mount.isMounted) return;
                setState((prev) => {
                    const next = produce(prev, f);
                    return next;
                });
            },
            [mount],
        ),
    };

    const handlePromptChange = (newPrompt: string) => {
        imageState.set((draft) => {
            draft.prompt = newPrompt;
            draft.error = undefined;
        });
    };

    const handleElaborate = async () => {
        if (!state.prompt.trim()) return;

        // Abort any existing operation
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        imageState.set((draft) => {
            draft.options = visualOptionsSet.emptyOptions();
            draft.optionsLoading = true;
            draft.error = undefined;
            draft.abortController = abortController;
        });

        try {
            await promptionsImageService.getPromptOptions(
                state.prompt,
                (options: BasicOptions, done: boolean) => {
                    imageState.set((draft) => {
                        draft.options = visualOptionsSet.mergeOptions(draft.options as BasicOptions, options);
                        draft.optionsLoading = !done;
                        if (done) {
                            draft.abortController = undefined;
                            abortControllerRef.current = null;
                        }
                    });
                },
                { signal: abortController.signal },
            );
        } catch (error) {
            imageState.set((draft) => {
                draft.optionsLoading = false;
                draft.abortController = undefined;
                if (error instanceof Error && error.name !== "AbortError") {
                    draft.error = error.message;
                }
            });
            abortControllerRef.current = null;
        }
    };

    const handleCancelElaborate = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
            imageState.set((draft) => {
                draft.optionsLoading = false;
                draft.abortController = undefined;
            });
        }
    };

    const handleGenerate = async () => {
        if (!state.prompt.trim()) return;

        // Abort any existing operation
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        imageState.set((draft) => {
            draft.imageLoading = true;
            draft.error = undefined;
            draft.abortController = abortController;
        });

        try {
            // Combine prompt with options to create enhanced prompt
            let enhancedPrompt = state.prompt;
            if (!state.options.isEmpty()) {
                if (state.options.prettyPrintAsConversation) {
                    const answer = state.options.prettyPrintAsConversation().answer;
                    enhancedPrompt = `${state.prompt}\n\nAdditional details:\n\n${answer}`;
                } else {
                    enhancedPrompt = `${state.prompt}\n\nAdditional details: ${state.options.prettyPrint()}`;
                }
            }

            const images = await imageService.generateImage(
                {
                    kind: "dall-e-3",
                    prompt: enhancedPrompt,
                    size: "1024x1024",
                    quality: "hd",
                    n: 1,
                },
                {
                    signal: abortController.signal,
                },
            );

            imageState.set((draft) => {
                draft.imageUrl = images[0] ? `data:image/png;base64,${images[0].base64String}` : undefined;
                draft.imageLoading = false;
                draft.abortController = undefined;
            });
            abortControllerRef.current = null;
        } catch (error) {
            imageState.set((draft) => {
                draft.imageLoading = false;
                draft.abortController = undefined;
                if (error instanceof Error && error.name !== "AbortError") {
                    draft.error = error.message;
                }
            });
            abortControllerRef.current = null;
        }
    };

    const handleCancelGenerate = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
            imageState.set((draft) => {
                draft.imageLoading = false;
                draft.abortController = undefined;
            });
        }
    };

    const handleOptionsChange = (newOptions: Options) => {
        imageState.set((draft) => {
            draft.options = newOptions as BasicOptions;
        });
    };

    React.useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return (
        <FluentProvider theme={webLightTheme}>
            <div className={styles.appContainer}>
                <header className={styles.header}>
                    <h1 className={styles.headerTitle}>Promptions AI Image Generator</h1>
                    <div className={styles.headerActions}>
                        <Menu>
                            <MenuTrigger disableButtonEnhancement>
                                <Button appearance="subtle" icon={<Options24Regular />} iconPosition="before">
                                    {visualOptionsSet === basicOptionSet ? "Expanded Options" : "Compact Options"}
                                    <ChevronDown24Regular style={{ marginLeft: "8px" }} />
                                </Button>
                            </MenuTrigger>
                            <MenuPopover>
                                <MenuList>
                                    <MenuItem
                                        onClick={() => handleOptionSetChange(basicOptionSet)}
                                        disabled={visualOptionsSet === basicOptionSet}
                                    >
                                        Expanded Options
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleOptionSetChange(compactOptionSet)}
                                        disabled={visualOptionsSet === compactOptionSet}
                                    >
                                        Compact Options
                                    </MenuItem>
                                </MenuList>
                            </MenuPopover>
                        </Menu>
                    </div>
                </header>

                <div className={styles.mainContainer}>
                    <div className={styles.leftPanel}>
                        <ImageInput
                            prompt={state.prompt}
                            onPromptChange={handlePromptChange}
                            onElaborate={handleElaborate}
                            onGenerate={handleGenerate}
                            onCancelElaborate={handleCancelElaborate}
                            onCancelGenerate={handleCancelGenerate}
                            elaborateLoading={state.optionsLoading}
                            generateLoading={state.imageLoading}
                            error={state.error}
                        />

                        <OptionsPanel
                            options={state.options}
                            optionsRenderer={getComponent}
                            onOptionsChange={handleOptionsChange}
                            loading={state.optionsLoading}
                        />
                    </div>

                    <div className={styles.rightPanel}>
                        <GeneratedImage imageUrl={state.imageUrl} loading={state.imageLoading} prompt={state.prompt} />
                    </div>
                </div>
            </div>
        </FluentProvider>
    );
}

export default App;



================================================
FILE: apps/promptions-image/src/index.css
================================================
body {
    margin: 0;
    font-family: "Segoe UI", "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
}

/* Image display styling */
.generated-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
    margin-top: 16px;
}

.image-container {
    position: relative;
    background: #f8f9fa;
    border-radius: 8px;
    padding: 8px;
    transition: transform 0.2s ease;
}

.image-container:hover {
    transform: scale(1.02);
}

.image-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    background: #f0f0f0;
    border-radius: 8px;
    flex-direction: column;
    gap: 12px;
}



================================================
FILE: apps/promptions-image/src/main.tsx
================================================
import React from "react";
import ReactDOM from "react-dom/client";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <FluentProvider theme={webLightTheme}>
            <App />
        </FluentProvider>
    </React.StrictMode>,
);



================================================
FILE: apps/promptions-image/src/reactUtil.ts
================================================
import React from "react";

export function useMounted(): { readonly isMounted: boolean } {
    const state = React.useRef<{
        isMounted: boolean;
        mountId: object | undefined;
    }>({
        get isMounted() {
            return this.mountId !== undefined;
        },
        mountId: undefined,
    });
    React.useEffect(() => {
        const obj = state.current;
        const mountId = {};
        obj.mountId = mountId;
        return () => {
            if (obj.mountId === mountId) {
                obj.mountId = undefined;
            }
        };
    }, []);
    const obj = state.current;
    if (obj.mountId === undefined) {
        obj.mountId = {};
    }
    return obj;
}



================================================
FILE: apps/promptions-image/src/types.ts
================================================
// State type for reactive state management
export type State<T> = { get: T; set: (fn: (prev: T) => void) => void };

// Image generation parameters
export interface BaseImageGenerationParams {
    prompt: string;
    size?: "1024x1024" | "1024x1792" | "1792x1024";
    quality?: "high" | "medium" | "low";
    n?: number;
}

// GPT Image 1 parameters
export interface GPTImage1Params {
    kind: "gpt-image-1";
    prompt: string;
    size?: "1024x1024" | "1024x1792" | "1792x1024";
    quality?: "high" | "medium" | "low";
    n?: number;
}

// DALL-E 3 parameters
export interface DallE3Params {
    kind: "dall-e-3";
    prompt: string;
    size?: "1024x1024" | "1024x1792" | "1792x1024";
    quality?: "standard" | "hd";
    style?: "vivid" | "natural";
    n?: number;
}

// Union type for all image generation parameters
export type ImageGenerationParams = GPTImage1Params | DallE3Params;

// Generated image result
export interface GeneratedImage {
    id: string;
    base64String: string;
    prompt: string;
    revisedPrompt?: string;
    timestamp: Date;
}

// Options elaboration parameters
export interface OptionsParams {
    prompt: string;
}

// Generation status
export type GenerationStatus = "idle" | "elaborating" | "generating" | "completed" | "error";

// Error type
export interface GenerationError {
    message: string;
    code?: string;
}



================================================
FILE: apps/promptions-image/src/vite-env.d.ts
================================================
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OPENAI_API_KEY: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}



================================================
FILE: apps/promptions-image/src/components/GeneratedImage.tsx
================================================
import React from "react";
import {
    makeStyles,
    tokens,
    Spinner,
    Text,
    Card,
    CardHeader,
    CardPreview,
    Button,
    CardFooter,
} from "@fluentui/react-components";
import { ImageMultiple24Regular, ArrowDownload24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
    },
    loadingContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: tokens.spacingVerticalL,
    },
    loadingText: {
        fontSize: tokens.fontSizeBase300,
        color: tokens.colorNeutralForeground2,
    },
    emptyContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: tokens.spacingVerticalL,
        padding: tokens.spacingHorizontalXXL,
        textAlign: "center",
    },
    emptyIcon: {
        fontSize: "48px",
        color: tokens.colorNeutralForeground3,
    },
    emptyText: {
        fontSize: tokens.fontSizeBase300,
        color: tokens.colorNeutralForeground2,
    },
    imageCard: {
        maxWidth: "100%",
        maxHeight: "100%",
        width: "fit-content",
        height: "fit-content",
    },
    image: {
        maxWidth: "100%",
        maxHeight: "70vh",
        objectFit: "contain",
        borderRadius: tokens.borderRadiusMedium,
    },
    imageMetadata: {
        marginTop: tokens.spacingVerticalS,
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground2,
        fontStyle: "italic",
    },
    downloadButton: {
        marginTop: tokens.spacingVerticalS,
    },
});

interface GeneratedImageProps {
    imageUrl?: string;
    loading: boolean;
    prompt: string;
}

export const GeneratedImage: React.FC<GeneratedImageProps> = ({ imageUrl, loading, prompt }) => {
    const styles = useStyles();

    const handleDownload = () => {
        if (!imageUrl) return;

        // Create a filename based on the prompt (sanitized)
        const sanitizedPrompt = prompt
            .replace(/[^a-zA-Z0-9\s]/g, "")
            .replace(/\s+/g, "_")
            .substring(0, 50);
        const filename = `generated_image_${sanitizedPrompt || "untitled"}.png`;

        // Create a link element and trigger download
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingContainer}>
                    <Spinner size="large" />
                    <Text className={styles.loadingText}>Generating your image...</Text>
                </div>
            </div>
        );
    }

    if (!imageUrl) {
        return (
            <div className={styles.container}>
                <div className={styles.emptyContainer}>
                    <ImageMultiple24Regular className={styles.emptyIcon} />
                    <Text className={styles.emptyText}>Enter a prompt and click "Generate" to create an image</Text>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Card className={styles.imageCard}>
                <CardPreview>
                    <img
                        src={imageUrl}
                        alt={prompt}
                        className={styles.image}
                        onError={(e) => {
                            console.error("Image failed to load:", e);
                        }}
                    />
                </CardPreview>
                <CardHeader>
                    <Text className={styles.imageMetadata}>Generated from: "{prompt}"</Text>
                </CardHeader>
                <CardFooter>
                    <Button
                        appearance="primary"
                        icon={<ArrowDownload24Regular />}
                        onClick={handleDownload}
                        className={styles.downloadButton}
                    >
                        Download Image
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};



================================================
FILE: apps/promptions-image/src/components/ImageInput.tsx
================================================
import React from "react";
import { makeStyles, tokens, Textarea, Button, MessageBar, Spinner } from "@fluentui/react-components";
import { ImageEdit24Regular, Sparkle24Regular, DismissCircle24Regular, Info16Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalM,
    },
    textarea: {
        minHeight: "120px",
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase300,
        lineHeight: tokens.lineHeightBase300,
    },
    buttonContainer: {
        display: "flex",
        gap: tokens.spacingHorizontalM,
    },
    button: {
        flex: 1,
    },
    errorMessage: {
        marginTop: tokens.spacingVerticalS,
        textWrap: "wrap",
        padding: tokens.spacingVerticalS,
    },
    disclaimerText: {
        fontSize: tokens.fontSizeBase100,
        color: tokens.colorNeutralForeground2,
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalXXS,
        paddingLeft: tokens.spacingHorizontalXS,
    },
});

interface ImageInputProps {
    prompt: string;
    onPromptChange: (prompt: string) => void;
    onElaborate: () => void;
    onGenerate: () => void;
    onCancelElaborate?: () => void;
    onCancelGenerate?: () => void;
    elaborateLoading: boolean;
    generateLoading: boolean;
    error?: string;
}

export const ImageInput: React.FC<ImageInputProps> = ({
    prompt,
    onPromptChange,
    onElaborate,
    onGenerate,
    onCancelElaborate,
    onCancelGenerate,
    elaborateLoading,
    generateLoading,
    error,
}) => {
    const styles = useStyles();

    const isDisabled = elaborateLoading || generateLoading;

    return (
        <div className={styles.container}>
            <Textarea
                className={styles.textarea}
                placeholder="Describe the image you want to generate..."
                value={prompt}
                onChange={(_, data) => onPromptChange(data.value)}
                disabled={isDisabled}
                resize="vertical"
            />

            <div className={styles.disclaimerText}>
                <Info16Regular />
                AI generated responses should be verified before taking action.
            </div>

            <div className={styles.buttonContainer}>
                {elaborateLoading && onCancelElaborate ? (
                    <Button
                        className={styles.button}
                        appearance="secondary"
                        icon={<DismissCircle24Regular />}
                        onClick={onCancelElaborate}
                    >
                        Cancel
                    </Button>
                ) : (
                    <Button
                        className={styles.button}
                        appearance="secondary"
                        icon={elaborateLoading ? <Spinner size="tiny" /> : <Sparkle24Regular />}
                        onClick={onElaborate}
                        disabled={isDisabled || !prompt.trim()}
                    >
                        {elaborateLoading ? "Elaborating..." : "Elaborate"}
                    </Button>
                )}

                {generateLoading && onCancelGenerate ? (
                    <Button
                        className={styles.button}
                        appearance="primary"
                        icon={<DismissCircle24Regular />}
                        onClick={onCancelGenerate}
                    >
                        Cancel
                    </Button>
                ) : (
                    <Button
                        className={styles.button}
                        appearance="primary"
                        icon={generateLoading ? <Spinner size="tiny" /> : <ImageEdit24Regular />}
                        onClick={onGenerate}
                        disabled={isDisabled || !prompt.trim()}
                    >
                        {generateLoading ? "Generating..." : "Generate"}
                    </Button>
                )}
            </div>

            {error && (
                <MessageBar className={styles.errorMessage} intent="error">
                    {error}
                </MessageBar>
            )}
        </div>
    );
};



================================================
FILE: apps/promptions-image/src/components/index.ts
================================================
export { ImageInput } from "./ImageInput";
export { GeneratedImage } from "./GeneratedImage";
export { OptionsPanel } from "./OptionsPanel";



================================================
FILE: apps/promptions-image/src/components/OptionsPanel.tsx
================================================
import React from "react";
import { makeStyles, tokens, Text, Spinner, Card, CardHeader } from "@fluentui/react-components";
import { OptionRenderer, Options } from "@promptions/promptions-ui";

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalS,
    },
    card: {
        padding: tokens.spacingHorizontalM,
    },
    header: {
        fontSize: tokens.fontSizeBase300,
        fontWeight: tokens.fontWeightSemibold,
        marginBottom: tokens.spacingVerticalS,
    },
    loadingContainer: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalS,
        padding: tokens.spacingVerticalM,
        justifyContent: "center",
    },
    loadingText: {
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground2,
    },
    emptyText: {
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground3,
        textAlign: "center",
        padding: tokens.spacingVerticalL,
        fontStyle: "italic",
    },
});

interface OptionsPanelProps {
    options: Options;
    optionsRenderer: OptionRenderer;
    onOptionsChange: (options: Options) => void;
    loading: boolean;
}

export const OptionsPanel: React.FC<OptionsPanelProps> = ({
    options,
    optionsRenderer: OptionsRenderer,
    onOptionsChange,
    loading,
}) => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <CardHeader>
                    <Text className={styles.header}>Options</Text>
                </CardHeader>

                {!loading && options.isEmpty() && (
                    <Text className={styles.emptyText}>
                        Click "Elaborate" to generate interactive options for your prompt
                    </Text>
                )}

                {loading && options.isEmpty() && (
                    <div className={styles.loadingContainer}>
                        <Spinner size="small" />
                        <Text className={styles.loadingText}>Generating options...</Text>
                    </div>
                )}

                {!options.isEmpty() && <OptionsRenderer options={options} set={onOptionsChange} />}
            </Card>
        </div>
    );
};



================================================
FILE: apps/promptions-image/src/services/ImageService.ts
================================================
import OpenAI from "openai";
import { ImageGenerationParams, GeneratedImage } from "../types";

export class ImageService {
    private client: OpenAI;

    constructor() {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;

        if (!apiKey) {
            throw new Error(
                "OpenAI API key is required. Please set VITE_OPENAI_API_KEY in your environment variables.",
            );
        }

        this.client = new OpenAI({
            apiKey,
            dangerouslyAllowBrowser: true, // Only for demo purposes - use a backend in production
        });
    }

    async generateImage(params: ImageGenerationParams, options?: { signal?: AbortSignal }): Promise<GeneratedImage[]> {
        try {
            console.log("Generating image with params:", params);

            const response = await this.client.images.generate(
                {
                    model: params.kind,
                    prompt: params.prompt,
                    size: params.size,
                    quality: params.quality,
                    n: params.n || 1,
                    response_format: "b64_json",
                },
                {
                    signal: options?.signal,
                },
            );

            const images: GeneratedImage[] = (response.data || []).map((image) => ({
                id: crypto.randomUUID(),
                base64String: image.b64_json!,
                prompt: params.prompt,
                revisedPrompt: image.revised_prompt,
                timestamp: new Date(),
            }));

            console.log("Generated images:", images);
            return images;
        } catch (error) {
            console.error("Error generating image:", error);
            throw error;
        }
    }

    async streamChat(
        messages: Array<{ role: "user" | "assistant" | "system"; content: string }>,
        onContent: (content: string, done: boolean) => void,
        options?: { signal?: AbortSignal },
    ): Promise<void> {
        try {
            const stream = await this.client.chat.completions.create(
                {
                    model: "gpt-4.1",
                    messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
                    stream: true,
                    temperature: 0.7,
                    max_tokens: 1000,
                },
                {
                    signal: options?.signal,
                },
            );

            let accumulatedContent = "";

            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content ?? "";
                accumulatedContent += content;
                onContent(accumulatedContent, false);
            }

            onContent(accumulatedContent, true);
        } catch (error) {
            console.error("Error in streamChat:", error);
            throw error;
        }
    }
}



================================================
FILE: apps/promptions-image/src/services/PromptionsImageService.ts
================================================
import { ImageService } from "./ImageService";
import { BasicOptions, OptionSet } from "@promptions/promptions-ui";

export class PromptionsImageService {
    private imageService: ImageService;
    private optionSet: OptionSet<BasicOptions>;

    constructor(imageService: ImageService, optionSet: OptionSet<BasicOptions>) {
        this.imageService = imageService;
        this.optionSet = optionSet;
    }

    async getPromptOptions(
        prompt: string,
        onOptions: (options: BasicOptions, done: boolean) => void,
        options?: { signal?: AbortSignal },
    ): Promise<void> {
        const systemPrompt = `You are an AI assistant that generates interactive options for image generation prompts. 

Given a user's image prompt, analyze it and generate relevant interactive options that would help refine and improve the image generation.

Your response must be a valid JSON array following this exact schema:
${this.optionSet.getSchemaSpec()}

Guidelines for generating options:
1. Analyze the prompt to understand what type of image the user wants
2. Generate 3-5 relevant option controls that would be useful for image refinement
3. Include options for:
   - Art style (photorealistic, cartoon, painting, etc.)
   - Color palette or mood
   - Lighting conditions
   - Composition or perspective
   - Additional elements or details
4. For single-select options, provide 3-6 meaningful choices
5. For multi-select options, provide 4-8 options where multiple selections make sense
6. Use clear, descriptive labels for both the controls and their options
7. Make sure the options are contextually relevant to the image prompt
8. Return ONLY the JSON array in a single json markdown block, without any additional text or explanation.

Example output format:
\`\`\`json
[
  {
    "label": "Art Style",
    "type": "single-select",
    "options": ["Photorealistic", "Digital Art", "Oil Painting", "Watercolor", "Sketch"]
  },
  {
    "label": "Lighting",
    "type": "single-select", 
    "options": ["Natural daylight", "Golden hour", "Dramatic shadows", "Soft studio lighting", "Neon/cyberpunk"]
  }
]
\`\`\``;

        const messages = [
            { role: "system" as const, content: systemPrompt },
            { role: "user" as const, content: `Generate options for this image prompt: "${prompt}"` },
        ];

        await this.imageService.streamChat(
            messages,
            (content, done) => {
                if (done) {
                    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
                    const jsonText = jsonMatch ? jsonMatch[1] : content.trim();
                    const parsedOptions = this.optionSet.validateJSON(jsonText);
                    if (!parsedOptions) {
                        console.error(`Invalid options JSON: ${jsonText}`);
                        return onOptions(this.optionSet.emptyOptions(), true);
                    }
                    return onOptions(parsedOptions, true);
                }
                const partialOptions = this.tryParsePartialOptions(content);
                if (partialOptions) {
                    onOptions(partialOptions, done);
                }
            },
            options,
        );
    }

    async refreshOptions(
        existingOptions: BasicOptions,
        prompt: string,
        onOptions: (options: BasicOptions, done: boolean) => void,
        options?: { signal?: AbortSignal },
    ): Promise<void> {
        const formattedExistingOptions = existingOptions.prettyPrint();

        const systemPrompt = `You are an AI assistant that regenerates interactive options for image generation prompts based on existing options.

Given a user's image prompt and existing options, analyze the context and generate new relevant interactive options that would help refine and improve the image generation. Consider the existing options as context but generate fresh, contextually appropriate options.

Current existing options:
${formattedExistingOptions}

Your response must be a valid JSON array following this exact schema:
${this.optionSet.getSchemaSpec()}

Guidelines for regenerating options:
1. Analyze the prompt to understand what type of image the user wants
2. Consider the existing options but don't feel constrained to replicate them exactly
3. Generate 3-5 relevant option controls that would be useful for image refinement
4. Include options for:
   - Art style (photorealistic, cartoon, painting, etc.)
   - Color palette or mood
   - Lighting conditions
   - Composition or perspective
   - Additional elements or details
5. For single-select options, provide 3-6 meaningful choices
6. For multi-select options, provide 4-8 options where multiple selections make sense
7. Use clear, descriptive labels for both the controls and their options
8. Make sure the new options are contextually relevant to the image prompt
9. The new options should reflect any refinements or improvements over the existing ones
10. Return ONLY the JSON array in a single json markdown block, without any additional text or explanation.

Example output format:
\`\`\`json
[
  {
    "label": "Art Style",
    "type": "single-select",
    "options": ["Photorealistic", "Digital Art", "Oil Painting", "Watercolor", "Sketch"]
  },
  {
    "label": "Lighting",
    "type": "single-select", 
    "options": ["Natural daylight", "Golden hour", "Dramatic shadows", "Soft studio lighting", "Neon/cyberpunk"]
  }
]
\`\`\``;

        const messages = [
            { role: "system" as const, content: systemPrompt },
            { role: "user" as const, content: `Regenerate options for this image prompt: "${prompt}"` },
        ];

        await this.imageService.streamChat(
            messages,
            (content, done) => {
                if (done) {
                    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
                    const jsonText = jsonMatch ? jsonMatch[1] : content.trim();
                    const parsedOptions = this.optionSet.validateJSON(jsonText);
                    if (!parsedOptions) {
                        console.error(`Invalid options JSON: ${jsonText}`);
                        return onOptions(this.optionSet.emptyOptions(), true);
                    }
                    return onOptions(parsedOptions, true);
                }
                const partialOptions = this.tryParsePartialOptions(content);
                if (partialOptions) {
                    onOptions(partialOptions, done);
                }
            },
            options,
        );
    }

    private tryParsePartialOptions(optionsStr: string): BasicOptions | undefined {
        try {
            const jsonMatch = optionsStr.match(/```(?:json)?\s*($$[\s\S]*?$$)\s*```/);
            let jsonStr = jsonMatch ? jsonMatch[1] : optionsStr;
            return this.optionSet.validatePartialJSON?.(jsonStr);
        } catch (error) {
            return undefined;
        }
    }
}



================================================
FILE: packages/promptions-llm/README.md
================================================
[Empty file]


================================================
FILE: packages/promptions-llm/package.json
================================================
{
    "name": "@promptions/promptions-llm",
    "version": "1.0.0",
    "description": "LLM utilities and integrations for promptions",
    "main": "dist/index.js",
    "types": "dist/index.d.ts",
    "license": "MIT",
    "scripts": {
        "build": "tsc",
        "build:watch": "tsc --watch",
        "clean": "rimraf dist",
        "typecheck": "tsc --noEmit"
    },
    "files": [
        "dist",
        "README.md"
    ],
    "keywords": [
        "llm",
        "ai",
        "typescript",
        "promptions"
    ],
    "devDependencies": {
        "@types/node": "^20.0.0",
        "rimraf": "^5.0.0",
        "typescript": "^5.0.0"
    },
    "peerDependencies": {
        "typescript": ">=5.0.0"
    },
    "dependencies": {
        "zod": "^3.25.67"
    }
}



================================================
FILE: packages/promptions-llm/project.json
================================================
{
    "name": "promptions-llm",
    "$schema": "../../node_modules/nx/schemas/project-schema.json",
    "sourceRoot": "packages/promptions-llm/src",
    "projectType": "library",
    "targets": {
        "build": {
            "executor": "nx:run-commands",
            "options": {
                "command": "tsc",
                "cwd": "packages/promptions-llm"
            }
        },
        "typecheck": {
            "executor": "nx:run-commands",
            "options": {
                "command": "tsc --noEmit",
                "cwd": "packages/promptions-llm"
            }
        },
        "test": {
            "executor": "nx:run-commands",
            "options": {
                "command": "jest",
                "cwd": "packages/promptions-llm"
            }
        },
        "clean": {
            "executor": "nx:run-commands",
            "options": {
                "command": "rimraf dist",
                "cwd": "packages/promptions-llm"
            }
        }
    },
    "tags": ["type:lib", "scope:promptions-llm"]
}



================================================
FILE: packages/promptions-llm/tsconfig.json
================================================
{
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "outDir": "./dist",
        "rootDir": "./src",
        "declaration": true,
        "declarationMap": true,
        "composite": true,
        "incremental": true
    },
    "include": ["src/**/*"],
    "exclude": ["dist", "node_modules", "**/*.test.ts", "**/*.spec.ts"],
    "references": []
}



================================================
FILE: packages/promptions-llm/src/basicOptions.ts
================================================
import * as z from "zod";
import { OptionSet, Options } from "./types";

const multiOptionControl = z.object({
    kind: z.literal("multi-select"),
    label: z.string(),
    options: z.record(z.string()),
    value: z.union([z.string(), z.array(z.string())]),
});

const singleOptionControl = z.object({
    kind: z.literal("single-select"),
    label: z.string(),
    options: z.record(z.string()),
    value: z.union([z.string(), z.tuple([z.string()])]),
});

const binaryOptionControl = z.object({
    kind: z.literal("binary-select"),
    label: z.string(),
    options: z.object({
        enabled: z.string(),
        disabled: z.string(),
    }),
    value: z.union([z.literal("enabled"), z.literal("disabled")]),
});

const optionControl = z.union([multiOptionControl, singleOptionControl, binaryOptionControl]);
const optionControlList = z.array(optionControl);
type OptionControlList = z.infer<typeof optionControlList>;

// Export individual option types
export type MultiOptionControl = z.infer<typeof multiOptionControl>;
export type SingleOptionControl = z.infer<typeof singleOptionControl>;
export type BinaryOptionControl = z.infer<typeof binaryOptionControl>;
export type OptionControl = z.infer<typeof optionControl>;

export class BasicOptions implements Options {
    constructor(readonly options: OptionControlList) {}

    prettyPrint(): string {
        return this.options
            .map((control) => {
                if (control.kind === "single-select") {
                    const selectedValue = Array.isArray(control.value) ? control.value[0] : control.value;
                    const selectedLabel = control.options[selectedValue] || selectedValue;
                    return `Single Select: ${control.label} with options [${Object.keys(control.options).join(", ")}] - Selected: ${selectedLabel}`;
                } else if (control.kind === "binary-select") {
                    const selectedValue = control.value;
                    const selectedLabel = control.options[selectedValue] || selectedValue;
                    return `Binary Select: ${control.label} with options [${Object.entries(control.options)
                        .map(([key, label]) => `${key}: ${label}`)
                        .join(", ")}] - Selected: ${selectedLabel}`;
                } else {
                    const selectedValues = Array.isArray(control.value) ? control.value : [control.value];
                    const selectedLabels = selectedValues.map((val) => control.options[val] || val);
                    return `Multi Select: ${control.label} with options [${Object.keys(control.options).join(", ")}] - Selected: ${selectedLabels.join(", ")}`;
                }
            })
            .join("\n\n");
    }

    prettyPrintAsConversation(): { question: string; answer: string } {
        const question = this.options
            .map((control) => {
                if (control.kind === "single-select") {
                    return `What is your choice for ${control.label}? Options are: ${Object.entries(control.options)
                        .map(([key, label]) => `${key}: ${label}`)
                        .join(", ")}`;
                } else if (control.kind === "binary-select") {
                    return `What is your choice for ${control.label}? Options are: ${Object.entries(control.options)
                        .map(([key, label]) => `${key}: ${label}`)
                        .join(", ")}`;
                } else {
                    return `What are your choices for ${control.label}? Options are: ${Object.entries(control.options)
                        .map(([key, label]) => `${key}: ${label}`)
                        .join(", ")}`;
                }
            })
            .join("\n");

        const answer = this.options
            .map((control) => {
                if (control.kind === "single-select") {
                    const selectedValue = Array.isArray(control.value) ? control.value[0] : control.value;
                    const selectedLabel = control.options[selectedValue] || selectedValue;
                    return `${control.label}: ${selectedLabel}`;
                } else if (control.kind === "binary-select") {
                    const selectedValue = control.value;
                    const selectedLabel = control.options[selectedValue] || selectedValue;
                    return `${control.label}: ${selectedLabel}`;
                } else {
                    const selectedValues = Array.isArray(control.value) ? control.value : [control.value];
                    const selectedLabels = selectedValues.map((val) => control.options[val] || val);
                    return `${control.label}: ${selectedLabels.join(", ")}`;
                }
            })
            .join("\n");

        return { question, answer };
    }

    mergeOptions(update: BasicOptions): BasicOptions {
        const thisLen = this.options.length;
        // keep any options after len
        const mergedControls = [...this.options.slice(0, thisLen), ...update.options.slice(thisLen)];
        return new BasicOptions(mergedControls);
    }

    isEmpty(): boolean {
        return this.options.length === 0;
    }
}

const schemaString: string = `\`\`\`typescript
interface SingleOptionControl {
  kind: "single-select";
  label: string;
  options: Record<string, string>;
  value: string;
}

interface MultiOptionControl {
  kind: "multi-select";
  label: string;
  options: Record<string, string>;
  value: string[]; // Must include at least one option
}

interface BinaryOptionControl {
  kind: "binary-select";
  label: string;
  options: {
    enabled: string; // Label for enabled state
    disabled: string; // Label for disabled state
  };
  value: "enabled" | "disabled"; // Must be either "enabled" or "disabled"
}

type OptionControl = SingleOptionControl | MultiOptionControl | BinaryOptionControl;

type OptionControlList = OptionControl[];
\`\`\``;

export const basicOptionSet: OptionSet<BasicOptions> = {
    getSchemaSpec: () => schemaString,
    validateJSON: (value: string): BasicOptions | undefined => {
        try {
            const parsed = JSON.parse(value);

            // First try to parse as the original format
            const originalResult = optionControlList.safeParse(parsed);
            if (originalResult.success) {
                return new BasicOptions(originalResult.data);
            }

            // If that fails, try to parse as the flattened JSON schema format
            if (parsed && typeof parsed === "object" && Array.isArray(parsed.options)) {
                const transformedOptions = parsed.options.map((item: any) => {
                    if (item.kind === "binary-select") {
                        return {
                            kind: item.kind,
                            label: item.label,
                            options: {
                                enabled: item.enabled_label || "Yes",
                                disabled: item.disabled_label || "No",
                            },
                            value: item.selected_values[0] || "disabled",
                        };
                    } else {
                        // Convert flattened format back to our internal format
                        const options: Record<string, string> = {};
                        if (item.option_keys && item.option_values) {
                            for (let i = 0; i < Math.min(item.option_keys.length, item.option_values.length); i++) {
                                options[item.option_keys[i]] = item.option_values[i];
                            }
                        }

                        return {
                            kind: item.kind,
                            label: item.label,
                            options: options,
                            value: item.kind === "single-select" ? item.selected_values[0] : item.selected_values,
                        };
                    }
                });

                const transformedResult = optionControlList.safeParse(transformedOptions);
                if (transformedResult.success) {
                    return new BasicOptions(transformedResult.data);
                }
            }

            return undefined;
        } catch (error) {
            return undefined;
        }
    },
    validatePartialJSON: (value: string): BasicOptions | undefined => {
        try {
            let jsonStr = value;
            const arrayStart = jsonStr.indexOf("[");
            if (arrayStart === -1) return undefined;

            jsonStr = jsonStr.substring(arrayStart);

            for (let i = jsonStr.lastIndexOf("},"); i >= 0; i = jsonStr.lastIndexOf("},", i - 1)) {
                const potentialJson = jsonStr.substring(0, i + 1) + "]";

                try {
                    const parsed = JSON.parse(potentialJson);
                    if (Array.isArray(parsed)) {
                        const validated = basicOptionSet.validateJSON(JSON.stringify(parsed));
                        if (validated) {
                            return validated;
                        }
                    }
                } catch {
                    continue;
                }
            }

            const completeJsonAttempts = [jsonStr, jsonStr + "]", jsonStr.replace(/,\s*$/, "") + "]"];

            for (const attempt of completeJsonAttempts) {
                try {
                    const parsed = JSON.parse(attempt);
                    if (Array.isArray(parsed)) {
                        const validated = basicOptionSet.validateJSON(JSON.stringify(parsed));
                        if (validated) {
                            return validated;
                        }
                    }
                } catch {
                    continue;
                }
            }
            return undefined;
        } catch (error) {
            return undefined;
        }
    },
    emptyOptions: () => new BasicOptions([]),
    mergeOptions: (base: BasicOptions, update: BasicOptions): BasicOptions => {
        return base.mergeOptions(update);
    },
};



================================================
FILE: packages/promptions-llm/src/index.ts
================================================
// Export all public APIs from this package
// This file serves as the main entry point

export * from "./types";
export * from "./basicOptions";



================================================
FILE: packages/promptions-llm/src/types.ts
================================================
export interface Options {
    prettyPrint(): string;
    prettyPrintAsConversation?(): { question: string; answer: string };
    isEmpty(): boolean;
}

export interface OptionSet<T extends Options> {
    /**
     * Return a string representation describing the option schema that is suitable for LLMs to understand
     * and generate conforming JSON.
     */
    getSchemaSpec(): string;
    /**
     * Validate the provided JSON string against the option schema.
     */
    validateJSON(value: string): T | undefined;
    /**
     * Incrementally validate a partial JSON string against the option schema
     */
    validatePartialJSON?(value: string): T | undefined;
    /**
     * Returns empty options useful for initializing state or when no options are available.
     */
    emptyOptions(): T;
    /**
     * Merge two options together. Used for apply updates to existing options.
     */
    mergeOptions(base: T, update: T): T;
}



================================================
FILE: packages/promptions-ui/README.md
================================================
# @promptions/promptions-ui

UI components and utilities for promptions applications.

## Features

- React components for rendering LLM options
- Fluent UI integration
- TypeScript support
- Visual option sets for interactive chat interfaces

## Installation

```bash
npm install @promptions/promptions-ui
```

## Usage

```typescript
import { MessageOptions, VisualOptionSet } from "@promptions/promptions-ui";

// Use MessageOptions component to render interactive options
<MessageOptions
    options={options}
    messageId={messageId}
    set={updateFunction}
    disabled={false}
/>
```

## Dependencies

This package requires:

- React 18+
- @fluentui/react-components 9+
- @promptions/promptions-llm

## License

MIT



================================================
FILE: packages/promptions-ui/package.json
================================================
{
    "name": "@promptions/promptions-ui",
    "version": "1.0.0",
    "description": "UI components and utilities for promptions",
    "main": "dist/index.js",
    "types": "dist/index.d.ts",
    "license": "MIT",
    "scripts": {
        "build": "tsc",
        "build:watch": "tsc --watch",
        "clean": "rimraf dist",
        "typecheck": "tsc --noEmit"
    },
    "files": [
        "dist",
        "README.md"
    ],
    "keywords": [
        "ui",
        "react",
        "components",
        "typescript",
        "promptions"
    ],
    "devDependencies": {
        "@types/node": "^20.0.0",
        "@types/react": "^18.0.0",
        "rimraf": "^5.0.0",
        "typescript": "^5.0.0"
    },
    "peerDependencies": {
        "@fluentui/react-components": ">=9.0.0",
        "react": ">=18.0.0",
        "typescript": ">=5.0.0"
    },
    "dependencies": {
        "@promptions/promptions-llm": "1.0.0"
    }
}



================================================
FILE: packages/promptions-ui/project.json
================================================
{
    "name": "promptions-ui",
    "$schema": "../../node_modules/nx/schemas/project-schema.json",
    "sourceRoot": "packages/promptions-ui/src",
    "projectType": "library",
    "targets": {
        "build": {
            "executor": "nx:run-commands",
            "options": {
                "command": "tsc",
                "cwd": "packages/promptions-ui"
            }
        },
        "typecheck": {
            "executor": "nx:run-commands",
            "options": {
                "command": "tsc --noEmit",
                "cwd": "packages/promptions-ui"
            }
        },
        "test": {
            "executor": "nx:run-commands",
            "options": {
                "command": "jest",
                "cwd": "packages/promptions-ui"
            }
        },
        "clean": {
            "executor": "nx:run-commands",
            "options": {
                "command": "rimraf dist",
                "cwd": "packages/promptions-ui"
            }
        }
    },
    "tags": ["type:lib", "scope:promptions-ui"]
}



================================================
FILE: packages/promptions-ui/tsconfig.json
================================================
{
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "outDir": "./dist",
        "rootDir": "./src",
        "declaration": true,
        "declarationMap": true,
        "jsx": "react-jsx"
    },
    "include": ["src/**/*"],
    "exclude": ["dist", "node_modules", "**/*.test.*", "**/*.spec.*"]
}



================================================
FILE: packages/promptions-ui/src/basicOptions.tsx
================================================
import React from "react";
import { makeStyles, tokens, Radio, Checkbox, Text, Label, Switch } from "@fluentui/react-components";
import {
    BasicOptions,
    SingleOptionControl,
    MultiOptionControl,
    BinaryOptionControl,
    basicOptionSet as b,
} from "@promptions/promptions-llm";
import { VisualOptionSet, OptionRenderer } from "./types";

const useStyles = makeStyles({
    optionsContainer: {
        marginBottom: tokens.spacingVerticalM,
        padding: tokens.spacingVerticalS,
        borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
        borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    },
    optionGroup: {
        marginBottom: tokens.spacingVerticalM,
    },
    optionLabel: {
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        marginBottom: tokens.spacingVerticalXS,
        color: tokens.colorNeutralForeground1,
    },
    optionType: {
        fontSize: tokens.fontSizeBase100,
        color: tokens.colorNeutralForeground3,
        marginBottom: tokens.spacingVerticalS,
        fontStyle: "italic",
    },
    choicesContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: tokens.spacingHorizontalM,
    },
    choiceItem: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalXS,
        padding: tokens.spacingVerticalXS,
    },
    toggleContainer: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalS,
    },
    toggleLabel: {
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground1,
    },
});

interface SingleSelectOptionProps {
    option: SingleOptionControl;
    optionIndex: number;
    options: BasicOptions;
    set: (options: BasicOptions) => void;
    disabled: boolean;
}

const SingleSelectOption: React.FC<SingleSelectOptionProps> = ({ option, optionIndex, options, set, disabled }) => {
    const styles = useStyles();

    const currentValue = Array.isArray(option.value) ? option.value[0] : option.value;

    return (
        <div className={styles.choicesContainer}>
            {Object.entries(option.options).map(([key, label]) => (
                <div key={key} className={styles.choiceItem}>
                    <Label>
                        <Radio
                            value={key}
                            checked={currentValue === key}
                            disabled={disabled}
                            onChange={() => {
                                if (disabled) return;
                                set(
                                    new BasicOptions(
                                        options.options.map((opt, idx) =>
                                            idx === optionIndex ? { ...opt, value: key } : opt,
                                        ) as any,
                                    ),
                                );
                            }}
                        />
                        {label}
                    </Label>
                </div>
            ))}
        </div>
    );
};

interface MultiSelectOptionProps {
    option: MultiOptionControl;
    optionIndex: number;
    options: BasicOptions;
    set: (options: BasicOptions) => void;
    disabled: boolean;
}

const MultiSelectOption: React.FC<MultiSelectOptionProps> = ({ option, optionIndex, options, set, disabled }) => {
    const styles = useStyles();

    return (
        <div className={styles.choicesContainer}>
            {Object.entries(option?.options ?? []).map(([key, label]) => {
                const currentValues = Array.isArray(option.value) ? option.value : [];
                const isChecked = currentValues.includes(key);

                return (
                    <div key={key} className={styles.choiceItem}>
                        <Label>
                            <Checkbox
                                checked={isChecked}
                                disabled={disabled}
                                onChange={() => {
                                    if (disabled) return;
                                    const newValues = isChecked
                                        ? currentValues.filter((v: string) => v !== key)
                                        : [...currentValues, key];

                                    set(
                                        new BasicOptions(
                                            options.options.map((opt, idx) =>
                                                idx === optionIndex ? { ...opt, value: newValues } : opt,
                                            ) as any,
                                        ),
                                    );
                                }}
                            />
                            {label}
                        </Label>
                    </div>
                );
            })}
        </div>
    );
};

interface BinaryOptionProps {
    option: BinaryOptionControl;
    optionIndex: number;
    options: BasicOptions;
    set: (options: BasicOptions) => void;
    disabled: boolean;
}

const BinaryOption: React.FC<BinaryOptionProps> = ({ option, optionIndex, options, set, disabled }) => {
    const styles = useStyles();
    const isEnabled = option.value === "enabled";

    return (
        <div className={styles.toggleContainer}>
            <Label className={styles.toggleLabel}>{isEnabled ? option.options.enabled : option.options.disabled}</Label>
            <Switch
                checked={isEnabled}
                disabled={disabled}
                onChange={(_, data) => {
                    if (disabled) return;
                    const newValue = data.checked ? "enabled" : "disabled";
                    set(
                        new BasicOptions(
                            options.options.map((opt, idx) =>
                                idx === optionIndex ? { ...opt, value: newValue } : opt,
                            ) as any,
                        ),
                    );
                }}
            />
        </div>
    );
};

const MessageOptions: OptionRenderer = ({ options, set, disabled = false }) => {
    const styles = useStyles();

    if (!(options instanceof BasicOptions)) {
        throw new Error("Expected options to be an instance of BasicOptions");
    }

    return (
        <div className={styles.optionsContainer}>
            {options.options.map((option: any, optionIndex: number) => (
                <div key={optionIndex} className={styles.optionGroup}>
                    <Text className={styles.optionLabel}>{option.label}</Text>

                    {option.kind === "single-select" ? (
                        <SingleSelectOption
                            option={option}
                            optionIndex={optionIndex}
                            options={options}
                            set={set}
                            disabled={disabled}
                        />
                    ) : option.kind === "binary-select" ? (
                        <BinaryOption
                            option={option}
                            optionIndex={optionIndex}
                            options={options}
                            set={set}
                            disabled={disabled}
                        />
                    ) : (
                        <MultiSelectOption
                            option={option}
                            optionIndex={optionIndex}
                            options={options}
                            set={set}
                            disabled={disabled}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export const basicOptionSet: VisualOptionSet<BasicOptions> = {
    ...b,
    getComponent: () => MessageOptions,
};



================================================
FILE: packages/promptions-ui/src/compactOptions.tsx
================================================
import React from "react";
import {
    makeStyles,
    tokens,
    Dropdown,
    Option,
    Switch,
    Text,
    Label,
    Combobox,
    Tag,
    TagGroup,
    Button,
} from "@fluentui/react-components";
import { Dismiss12Regular } from "@fluentui/react-icons";
import {
    BasicOptions,
    SingleOptionControl,
    MultiOptionControl,
    BinaryOptionControl,
    basicOptionSet as b,
} from "@promptions/promptions-llm";
import { VisualOptionSet, OptionRenderer } from "./types";

const useStyles = makeStyles({
    optionsContainer: {
        marginBottom: tokens.spacingVerticalM,
        padding: tokens.spacingVerticalS,
        borderRadius: tokens.borderRadiusMedium,
        backgroundColor: tokens.colorNeutralBackground2,
        border: `1px solid ${tokens.colorNeutralStroke2}`,
    },
    optionGroup: {
        marginBottom: tokens.spacingVerticalM,
        "&:last-child": {
            marginBottom: "0",
        },
    },
    optionLabel: {
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        marginBottom: tokens.spacingVerticalXS,
        color: tokens.colorNeutralForeground1,
        display: "block",
    },
    optionType: {
        fontSize: tokens.fontSizeBase100,
        color: tokens.colorNeutralForeground3,
        marginBottom: tokens.spacingVerticalS,
        fontStyle: "italic",
    },
    singleSelectContainer: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalM,
    },
    toggleContainer: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacingHorizontalS,
    },
    toggleLabel: {
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground1,
    },
    dropdownContainer: {
        minWidth: "200px",
    },
    multiSelectContainer: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalS,
    },
    selectedTags: {
        marginTop: tokens.spacingVerticalXS,
        display: "flex",
        flexWrap: "wrap",
        rowGap: tokens.spacingHorizontalS,
    },
});

interface CompactSingleSelectOptionProps {
    option: SingleOptionControl;
    optionIndex: number;
    options: BasicOptions;
    set: (options: BasicOptions) => void;
    disabled: boolean;
}

const CompactSingleSelectOption: React.FC<CompactSingleSelectOptionProps> = ({
    option,
    optionIndex,
    options,
    set,
    disabled,
}) => {
    const styles = useStyles();
    const optionEntries = Object.entries(option.options);
    const currentValue = Array.isArray(option.value) ? option.value[0] : option.value;

    // For single-select with more than 2 options, use a dropdown
    return (
        <div className={styles.dropdownContainer}>
            <Dropdown
                value={option.options[currentValue] || currentValue}
                selectedOptions={[currentValue]}
                disabled={disabled}
                onOptionSelect={(_, data) => {
                    if (disabled) return;
                    const selectedValue = data.optionValue;
                    if (selectedValue) {
                        set(
                            new BasicOptions(
                                options.options.map((opt, idx) =>
                                    idx === optionIndex ? { ...opt, value: selectedValue } : opt,
                                ) as any,
                            ),
                        );
                    }
                }}
            >
                {optionEntries.map(([key, label]) => (
                    <Option key={key} value={key}>
                        {label as string}
                    </Option>
                ))}
            </Dropdown>
        </div>
    );
};

interface CompactMultiSelectOptionProps {
    option: MultiOptionControl;
    optionIndex: number;
    options: BasicOptions;
    set: (options: BasicOptions) => void;
    disabled: boolean;
}

const CompactMultiSelectOption: React.FC<CompactMultiSelectOptionProps> = ({
    option,
    optionIndex,
    options,
    set,
    disabled,
}) => {
    const styles = useStyles();
    const optionEntries = Object.entries(option.options);
    const currentValues = Array.isArray(option.value) ? option.value : [];

    return (
        <div className={styles.multiSelectContainer}>
            <Combobox
                multiselect
                placeholder="Select options..."
                disabled={disabled}
                selectedOptions={currentValues}
                value={currentValues.map((val: string) => option.options[val] || val).join(", ")}
                onOptionSelect={(_, data) => {
                    if (disabled) return;
                    const selectedValue = data.optionValue;
                    if (selectedValue) {
                        const isCurrentlySelected = currentValues.includes(selectedValue);
                        const newValues = isCurrentlySelected
                            ? currentValues.filter((v: string) => v !== selectedValue)
                            : [...currentValues, selectedValue];

                        set(
                            new BasicOptions(
                                options.options.map((opt, idx) =>
                                    idx === optionIndex ? { ...opt, value: newValues } : opt,
                                ) as any,
                            ),
                        );
                    }
                }}
            >
                {optionEntries.map(([key, label]) => (
                    <Option key={key} value={key}>
                        {label as string}
                    </Option>
                ))}
            </Combobox>

            {currentValues.length > 0 && (
                <TagGroup className={styles.selectedTags}>
                    {currentValues.map((value: string) => (
                        <div key={value} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <Tag>{option.options[value] || value}</Tag>
                            {!disabled && (
                                <Button
                                    appearance="subtle"
                                    size="small"
                                    icon={<Dismiss12Regular />}
                                    onClick={() => {
                                        const newValues = currentValues.filter((v: string) => v !== value);
                                        set(
                                            new BasicOptions(
                                                options.options.map((opt, idx) =>
                                                    idx === optionIndex ? { ...opt, value: newValues } : opt,
                                                ) as any,
                                            ),
                                        );
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </TagGroup>
            )}
        </div>
    );
};

interface CompactBinaryOptionProps {
    option: BinaryOptionControl;
    optionIndex: number;
    options: BasicOptions;
    set: (options: BasicOptions) => void;
    disabled: boolean;
}

const CompactBinaryOption: React.FC<CompactBinaryOptionProps> = ({ option, optionIndex, options, set, disabled }) => {
    const styles = useStyles();
    const isEnabled = option.value === "enabled";

    return (
        <div className={styles.toggleContainer}>
            <Label className={styles.toggleLabel}>{isEnabled ? option.options.enabled : option.options.disabled}</Label>
            <Switch
                checked={isEnabled}
                disabled={disabled}
                onChange={(_, data) => {
                    if (disabled) return;
                    const newValue = data.checked ? "enabled" : "disabled";
                    set(
                        new BasicOptions(
                            options.options.map((opt, idx) =>
                                idx === optionIndex ? { ...opt, value: newValue } : opt,
                            ) as any,
                        ),
                    );
                }}
            />
        </div>
    );
};

const CompactMessageOptions: OptionRenderer = ({ options, set, disabled = false }) => {
    const styles = useStyles();

    if (!(options instanceof BasicOptions)) {
        throw new Error("Expected options to be an instance of BasicOptions");
    }

    return (
        <div className={styles.optionsContainer}>
            {options.options.map((option: any, optionIndex: number) => (
                <div key={optionIndex} className={styles.optionGroup}>
                    <Label className={styles.optionLabel}>{option.label}</Label>

                    {option.kind === "single-select" ? (
                        <CompactSingleSelectOption
                            option={option}
                            optionIndex={optionIndex}
                            options={options}
                            set={set}
                            disabled={disabled}
                        />
                    ) : option.kind === "binary-select" ? (
                        <CompactBinaryOption
                            option={option}
                            optionIndex={optionIndex}
                            options={options}
                            set={set}
                            disabled={disabled}
                        />
                    ) : (
                        <CompactMultiSelectOption
                            option={option}
                            optionIndex={optionIndex}
                            options={options}
                            set={set}
                            disabled={disabled}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

// Export as a new visual option set
export const compactOptionSet: VisualOptionSet<BasicOptions> = {
    ...b,
    getComponent: () => CompactMessageOptions,
};



================================================
FILE: packages/promptions-ui/src/index.ts
================================================
// Export all public APIs from this package
// This file serves as the main entry point

export * from "./types";
export * from "./basicOptions";
export * from "./compactOptions";

export { BasicOptions } from "@promptions/promptions-llm";
export type { Options, OptionSet } from "@promptions/promptions-llm";



================================================
FILE: packages/promptions-ui/src/types.ts
================================================
import { Options, OptionSet } from "@promptions/promptions-llm";

export type OptionRenderer = React.FC<{
    options: Options;
    set: (option: Options) => void;
    disabled?: boolean;
}>;

export interface VisualOptionSet<T extends Options> extends OptionSet<T> {
    getComponent: () => OptionRenderer;
}

---

# chatgpt response

## Strict call

This version is **more likely to win than only Active Reading**, but only if you keep it focused.

Do **not** pitch it as:

> “A platform for all learning, all exams, all students, matching, quizzes, videos, code, PDFs, and AI tutoring.”

That is too broad.

Pitch it as:

> **A gamified active-learning tool where students study the same source material together, answer quiz challenges, and receive AI provocations that push them back to the source instead of giving the answer.**

That is clear, demoable, and fits the Kiro Education frame.

The hackathon’s Education frame says the app must make AI the **scaffolding, not the solution**, and help learners do something they could not do before **without doing it for them**.  Your updated idea fits that better than a plain reading assistant.

---

# Final problem definition for Kiro Hackathon

## Problem

Students often study passively. They watch videos, read transcripts, skim notes, or ask AI for quick answers. This helps them move faster, but it does not always help them understand, remember, or explain the material.

At the same time, studying alone makes it hard to stay motivated. Students who want to learn the same topic rarely have an easy way to find each other, quiz each other, and improve through active recall.

The core problem is:

> **How can we turn passive study material into active, social, exam-style learning, while making sure AI guides students instead of giving them the answer?**

---

# Final solution definition

## Project name

**Provoke**

## One-liner

> **Provoke turns videos, transcripts, notes, and code into gamified active-learning challenges where students quiz, compete, and learn together — while AI only gives hints, references, and provoking questions, never final answers.**

---

# What Provoke does

A student uploads or pastes learning material:

- video transcript

- lecture notes

- article

- code snippet

- textbook passage

The app converts it into a study room around that topic.

Inside the room, students can:

- join others studying the same topic

- answer quiz questions

- challenge each other

- get points for attempts, explanations, and improvements

- receive AI-generated provoking questions

- get redirected to the exact reference section

- revise their answer after learning from the source

If no other student is available, the AI becomes the quiz partner.

---

# Core workflow

## 1. Create a topic room

Student uploads:

> “React useEffect transcript”  
> or  
> “Operating systems deadlock notes”  
> or  
> “Biology photosynthesis chapter”

Provoke extracts:

- key concepts

- likely quiz questions

- source references

- difficulty levels

- challenge cards

## 2. Match learners

Students studying similar topics can join the same room.

For hackathon demo, you do **not** need real matchmaking. Fake it with:

- “Join existing room”

- “AI opponent”

- “Waiting for another learner”

- “Matched with Maya studying the same topic”

That is enough for the video.

## 3. Quiz battle

Students answer questions from the material.

Example:

> “Why does React’s useEffect sometimes run twice in development?”

Student submits an answer.

## 4. AI provokes, does not answer

Instead of saying the final answer, Provoke responds:

> “You mentioned rendering, but you did not explain the development-only behavior. Revisit the section titled ‘Strict Mode’ and revise your answer.”

Or:

> “Your answer describes what happens, but not why. What problem is React trying to reveal by running effects twice?”

## 5. Student goes back and learns

The app highlights the reference section.

The student revises.

Then they earn points for:

- first attempt

- source check

- improved answer

- explaining reasoning

- helping another student

---

# The best hackathon scope

## Build only this MVP

### Input types

Support:

- pasted transcript

- pasted article/notes

- pasted code snippet

Do **not** build full video upload. Just say:

> “For the demo, we use transcripts from videos. Later, we can add automatic video transcription.”

That is realistic.

### Topic types

Support three demo categories:

1. **Concept learning**  
   Example: biology, history, economics, psychology.

2. **Code learning**  
   Example: React hooks, Python functions, DSA concept explanation.

3. **Exam-style reading**  
   Example: passage-based short-answer questions.

### Game mechanics

Keep simple:

- points

- streak

- challenge cards

- leaderboard

- matched learner / AI quiz partner

No complex multiplayer backend needed for the hackathon.

---

# What makes this different

This is not just a PDF chatbot.

This is:

> **active recall + peer learning + AI provocations + source-grounded feedback.**

Microsoft Promptions is useful here because it provides a dynamic UI pattern where the system generates interactive controls from a prompt, and users steer the AI through buttons, toggles, and choices instead of rewriting prompts manually. Microsoft describes Promptions as “dynamic prompt middleware” that suggests parameterized UI choices and regenerates the same output as users click options. ([GitHub](https://github.com/microsoft/Promptions?utm_source=chatgpt.com))
So in Provoke, Promptions becomes:

- topic lens controls

- quiz difficulty controls

- hint-level controls

- role controls: “quiz me,” “challenge me,” “give reference,” “ask peer-style question”

Microsoft’s research blog also says Promptions is designed to give users more precise control and can be used in settings including education. ([Microsoft](https://www.microsoft.com/en-us/research/blog/promptions-helps-make-ai-prompting-more-precise-with-dynamic-ui-controls/?utm_source=chatgpt.com))
---

# Final product structure

## Main screen 1: Study Room

Shows:

- topic name

- source material

- matched learners

- AI quiz partner

- challenge cards

Example cards:

- “Main idea challenge”

- “Explain in your own words”

- “Find the evidence”

- “Debug the misconception”

- “Teach your peer”

## Main screen 2: Quiz Arena

Shows:

- question

- answer box

- timer

- points

- hint ladder

- source reference button

## Main screen 3: Provoke Feedback

After answer submission:

- what is strong

- what is missing

- provoking question

- source reference

- revise button

It must not show final answer.

## Main screen 4: Leaderboard / Progress

Shows:

- attempts completed

- concepts mastered

- revision streak

- peer-help points

- source-return points

---

# What AI is allowed to do

AI can:

- generate quiz questions

- ask follow-up questions

- point to source sections

- identify missing concepts

- detect weak reasoning

- give a hint ladder

- compare student answer against rubric

- create peer-style challenges

- explain why an answer is incomplete

AI cannot:

- give the final answer

- write the student’s response

- solve the quiz directly

- reveal the answer key

- complete the assignment for the student

This directly supports the challenge’s Education “Agency Guardrail.” 

---

# Kiro implementation plan

The Kiro Spark rules require a working software app, a 2–3 minute demo video, a public open-source repo, and the `/.kiro` directory at the root of the project. 

Your repo should show Kiro clearly.

## Recommended repo structure

```txt
provoke/
├── .kiro/
│   ├── specs/
│   │   ├── active-learning-room/
│   │   │   ├── requirements.md
│   │   │   ├── design.md
│   │   │   └── tasks.md
│   │   ├── constrained-quiz-engine/
│   │   │   ├── requirements.md
│   │   │   ├── design.md
│   │   │   └── tasks.md
│   │   └── answer-guardrail/
│   │       ├── requirements.md
│   │       ├── design.md
│   │       └── tasks.md
│   ├── steering/
│   │   ├── product.md
│   │   ├── pedagogy.md
│   │   ├── guardrails.md
│   │   └── ui.md
│   └── hooks/
│       ├── answer-leak-check.md
│       └── quiz-generation-check.md
├── apps/
│   └── provoke-web/
├── packages/
│   ├── promptions-ui/
│   ├── learning-engine/
│   └── guardrail-engine/
├── README.md
└── LICENSE
```

Kiro steering docs are a strong fit because Kiro’s docs say steering files define product purpose, target users, key features, and business objectives so Kiro can make decisions aligned with product goals. ([Kiro](https://kiro.dev/docs/steering/?utm_source=chatgpt.com))
---

# How to use the Promptions code

Use the existing `promptions-chat` app as the base.

## Keep

- React

- Fluent UI

- OpenAI service pattern

- options panel

- promptions option generation

- markdown renderer

## Replace

Replace chat with:

```txt
StudyRoom.tsx
QuizArena.tsx
SourcePanel.tsx
ProvokeFeedback.tsx
Leaderboard.tsx
```

## Reuse Promptions for

### 1. Lens controls

Instead of generic chat options, generate controls like:

- Difficulty: Easy / Medium / Hard

- Mode: Quiz me / Challenge me / Explain gap / Give reference

- Lens: Skeptic / Exam Maker / Code Reviewer / First Principles

- Hint level: Light / Medium / Strong

### 2. Same-output regeneration

When the student changes from “Easy” to “Hard,” the same quiz card updates instead of creating a new chat message.

That is the Promptions pattern and makes the UI feel polished.

---

# Build plan for 24 hours

## Hour 1–2: Lock scope

Finalize:

> “Gamified active learning rooms for transcript, notes, and code, with constrained AI quiz feedback.”

Create Kiro specs.

## Hour 2–5: UI shell

Build:

- source input panel

- study room page

- quiz arena

- feedback panel

- leaderboard mock

## Hour 5–8: AI quiz generation

Input text → generate:

- 5 quiz questions

- each question has source reference

- difficulty

- concept tag

## Hour 8–11: Provoke feedback

Student answer → AI returns:

```json
{
  "status": "partial" | "strong" | "needs_revision",
  "feedback": "...",
  "provocation": "...",
  "source_reference": "...",
  "next_action": "revise" | "reread" | "ask_peer"
}
```

No final answer field.

## Hour 11–14: Guardrail

Add answer-leak check.

Before showing feedback, run:

> “Does this response give the final answer or complete the student’s answer?”

If yes, block and regenerate.

## Hour 14–17: Gamification

Add:

- points

- streak

- progress bar

- badge: “Source Seeker”

- badge: “Revision Master”

- leaderboard mock

## Hour 17–20: Kiro evidence

Make sure repo includes:

- `.kiro/specs`

- `.kiro/steering`

- `.kiro/hooks`

- README section: “How Kiro was used”

This matters because implementation is judged partly on how effectively Kiro is used, and the rules specifically ask teams to explain features like specs, steering docs, hooks, MCP, and workflows. 

## Hour 20–24: Demo video + polish

The slide template says the pitch is only 2–3 minutes and recommends around 405 spoken words. 

So show only one clean journey.

---

# Winning possibility

## Probability if you build everything

Low.

Too broad.

## Probability if you build active reading only

Medium-low.

It may look like another AI notes or PDF study tool.

## Probability if you build this focused version

Medium-high.

Because it has:

- clear problem

- clear education-frame alignment

- gamified student motivation

- AI as scaffold, not answer

- visible Kiro usage

- Promptions-based UI uniqueness

- demoable workflow

The strongest version is:

> **Gamified active-learning rooms for source-based study, with AI-generated quiz challenges and answer-blocking feedback.**

That is the final direction I would choose.

---

# Final hackathon problem statement

Use this in your submission:

> Students often study by passively watching videos, reading notes, or asking AI for direct answers. This makes studying faster, but it weakens active recall, peer discussion, and independent reasoning. Students need a way to turn learning material into active practice with others, while making sure AI supports the learning process instead of completing it for them.

## Final solution statement

> **Provoke is a gamified active-learning room where students studying the same topic can quiz each other, compete, and improve their answers using AI-generated provocations. Students can upload a transcript, notes, or code snippet; Provoke creates quiz challenges from the material, matches them with peers or an AI quiz partner, and gives source-grounded hints, questions, and feedback without revealing the final answer.**

## Final simple pitch

> **Provoke turns passive study into active learning. Instead of giving students answers, it creates quiz battles, peer challenges, and AI provocations that push students back to the source so they can discover and explain the answer themselves.**

---

# you asked

now give the idea and problem statement and impact we need for pahse 1, simple and clear

---

# chatgpt response

## Phase 1 idea

**Project name:** **Provoke**

**Simple idea:**  
Provoke turns passive study materials into active learning games.

Students upload or paste a **video transcript, notes, article, or code snippet**. Provoke creates a topic-based study room where students can answer quiz challenges, compete with peers, or practice with an AI quiz partner.

The AI does **not** give direct answers. It gives hints, source references, and provoking questions that push students to go back, think, and revise.

---

## Final problem statement

Students often study passively by watching videos, reading notes, or asking AI for quick answers. This makes studying faster, but it does not always help them understand, remember, or explain the material.

Many AI tools solve the task for the student. That creates a problem for real learning: students may finish the work, but they do not build active recall, reasoning, or confidence.

**Our problem is:**

> How can we turn passive study material into active, gamified learning while making sure AI acts as a scaffold, not the solution?

This fits the Kiro Spark Education frame because the challenge asks for AI that empowers learners without doing the work for them. The uploaded Kiro challenge guide describes the Education frame as “the AI is the scaffolding, not the solution.” 

---

## Final solution statement

> **Provoke is a gamified active-learning room where students studying the same topic can quiz each other, compete, and improve their answers using AI-generated provocations.**

Students can upload transcripts, notes, or code. Provoke generates quiz questions, matches the student with peers or an AI quiz partner, and gives feedback that points back to the source instead of revealing the answer.

---

## What the app does in Phase 1

1. **Input learning material**  
   Student pastes a transcript, notes, article, or code snippet.

2. **Generate a study room**  
   The app extracts key topics and creates quiz cards.

3. **Quiz with peer or AI**  
   Student answers questions in a game-style interface.

4. **AI provokes instead of answering**  
   If the answer is weak, AI asks a guiding question or points to the source.

5. **Student revises**  
   Student goes back to the material, improves the answer, and earns points.

---

## Example

Student uploads a transcript about React `useEffect`.

Provoke asks:

> “Why can `useEffect` run twice in development?”

Student answers:

> “Because React renders twice.”

Provoke does **not** give the final answer.

It responds:

> “You noticed the repeated behavior, but your answer does not explain the development-only reason. Go back to the section on Strict Mode. What is React trying to help developers catch?”

Then the student revises and earns points.

---

## Impact

**For students:**  
Provoke makes studying more active, social, and motivating. Instead of copying answers, students practice recalling, explaining, and improving.

**For learning:**  
It supports deeper understanding because students must attempt, reflect, revisit the source, and revise.

**For teachers:**  
It creates a safer AI study experience where the AI supports learning without becoming an answer machine.

**For the hackathon:**  
It clearly matches the Education “Agency” guardrail and shows strong Kiro usage through specs, steering docs, and hooks. Kiro is described as a spec-driven AI IDE for turning ideas into working apps, which fits your plan to encode the learning rules directly into the project workflow. ([Kiro Spark Challenge](https://kiro-spark-challenge.devpost.com/?utm_source=chatgpt.com))
---

## Final one-line pitch

> **Provoke turns videos, notes, and code into gamified quiz rooms where students learn by answering, revising, and thinking — while AI guides them without giving away the answer.**

---

# you asked

now based on this finally give a prompt to give to claude with all context and all details, so it will start building

---

# chatgpt response

Copy-paste this into Claude/Kiro as your build prompt.

```text
You are my senior full-stack hackathon build partner. Help me build the Phase 1 MVP for a Kiro Spark Challenge Education project.

Project name: Provoke

Core idea:
Provoke turns passive study materials into active, gamified learning rooms. Students paste a video transcript, lecture notes, article, textbook passage, or code snippet. Provoke generates quiz challenges from the material, lets students practice with a peer or AI quiz partner, and gives source-grounded hints/provoking questions instead of final answers.

Hackathon frame:
We are submitting under the Education “Agency” guardrail. The app must make AI the scaffolding, not the solution. It should empower learners without doing the work for them.

Important product rule:
The AI must NEVER give the final answer. It can only:
- ask a guiding question
- point to a source/reference section
- identify missing reasoning
- identify weak evidence
- suggest an answer structure
- give rubric-style feedback
- ask the student to revise

It must NOT:
- reveal the answer key
- write the student’s answer
- solve the quiz directly
- complete the assignment for the student

Final problem statement:
Students often study passively by watching videos, reading notes, or asking AI for quick answers. This helps them move faster, but it weakens active recall, peer discussion, and independent reasoning. Students need a way to turn learning material into active practice with others, while making sure AI supports the learning process instead of completing it for them.

Final solution statement:
Provoke is a gamified active-learning room where students studying the same topic can quiz each other, compete, and improve their answers using AI-generated provocations. Students can upload or paste transcripts, notes, articles, or code snippets. Provoke creates quiz challenges from the material, matches them with peers or an AI quiz partner, and gives source-grounded hints, questions, and feedback without revealing the final answer.

Phase 1 MVP:
Build a working React app with these screens:

1. Source Input Screen
- User pastes study material.
- Input types: transcript, notes/article, code snippet.
- User clicks “Create Study Room.”
- No real video upload needed. We only support pasted transcript/text/code for the MVP.

2. Study Room Screen
- Shows topic name extracted from the source.
- Shows 3–5 generated quiz cards.
- Shows mock matched learner / AI quiz partner.
- Shows simple gamification: points, streak, progress.
- User chooses a quiz card.

3. Quiz Arena Screen
- Shows one question.
- Shows source snippet/reference.
- Shows answer box.
- User must submit an attempt before getting help.
- Include buttons/options:
  - “Light hint”
  - “Point me to source”
  - “Challenge my reasoning”
  - “Check my answer”
- The AI feedback must provoke thinking, not answer.

4. Provoke Feedback Screen / Panel
After student submits an answer, show:
- status: strong / partial / needs revision
- what is strong
- what is missing
- provoking question
- source reference
- next action: revise / reread / try harder question
- points earned

5. Leaderboard / Progress Panel
- Mock leaderboard with the current student and 2 fake peers.
- Badges:
  - Source Seeker
  - Revision Master
  - Active Recall Streak
  - Peer Challenger

Technical stack:
- React + TypeScript
- Use the existing Microsoft Promptions repo style if available.
- Promptions is useful because it turns prompts into dynamic UI controls. Microsoft’s Promptions project describes this as dynamic prompt middleware where users steer AI outputs through generated UI options, and selected options update the same output instead of just appending new chat responses.
- Reuse the idea of option controls for:
  - difficulty
  - learning lens
  - hint level
  - quiz mode
  - feedback style

Suggested components:
- App.tsx
- components/SourceInput.tsx
- components/StudyRoom.tsx
- components/QuizArena.tsx
- components/ProvokeFeedback.tsx
- components/ProgressPanel.tsx
- components/Leaderboard.tsx
- components/QuizCard.tsx
- services/learningService.ts
- services/guardrailService.ts
- types.ts

Core data types:
Create TypeScript interfaces for:
- SourceMaterial
- StudyRoom
- QuizCard
- StudentAttempt
- ProvokeFeedback
- GuardrailResult
- PlayerProgress

Example output schema for quiz generation:
{
  "topic": "React useEffect",
  "summary": "One sentence only, not a full study summary",
  "quizCards": [
    {
      "id": "q1",
      "question": "Why can useEffect run twice in development?",
      "difficulty": "medium",
      "concept": "React Strict Mode",
      "sourceReference": "Paragraph 3",
      "sourceSnippet": "short relevant snippet only",
      "rubric": ["Mentions development mode", "Mentions Strict Mode", "Explains purpose"]
    }
  ]
}

Example output schema for feedback:
{
  "status": "partial",
  "strength": "You noticed the repeated behavior.",
  "missing": "You did not explain the development-only reason.",
  "provocation": "What is React trying to help developers catch by running effects twice?",
  "sourceReference": "Go back to Paragraph 3: Strict Mode behavior.",
  "nextAction": "revise",
  "pointsEarned": 15
}

Guardrail logic:
Before showing feedback, run a local guardrail function that checks for answer leakage.
For the MVP, implement a simple rule-based check:
- block phrases like “the answer is”, “correct answer”, “final answer”, “you should write”
- block if feedback is too long and looks like a completed answer
- block if it directly completes the student’s response

If blocked, replace with:
“I can’t give the final answer. Here’s a smaller hint: [guiding question + source reference].”

Add this as guardrailService.ts.

Kiro usage:
Create a /.kiro directory at the root. Do NOT ignore it.

Create this structure:
.kiro/
  specs/
    active-learning-room/
      requirements.md
      design.md
      tasks.md
    constrained-quiz-engine/
      requirements.md
      design.md
      tasks.md
    answer-guardrail/
      requirements.md
      design.md
      tasks.md
  steering/
    product.md
    pedagogy.md
    guardrails.md
    ui.md
  hooks/
    answer-leak-check.md
    quiz-generation-check.md

Fill these files with meaningful content.

In requirements.md, use EARS-style language. Examples:
- WHEN a student submits source material, THE SYSTEM SHALL generate quiz cards grounded only in the provided material.
- WHEN a student requests help before attempting an answer, THE SYSTEM SHALL ask the student to submit an attempt first.
- WHEN the system generates feedback, THE SYSTEM SHALL provide a provocation, source reference, and revision prompt.
- WHEN feedback contains a direct answer, THE SYSTEM SHALL block it and regenerate a scaffolded hint.
- THE SYSTEM SHALL NOT reveal final answers, answer keys, or complete student responses.

In steering/product.md:
- define Provoke as gamified active learning
- target users: students preparing for reading-based, transcript-based, and code-concept learning
- focus: active recall, revision, source-grounded learning

In steering/pedagogy.md:
- active recall
- productive struggle
- source-grounded feedback
- peer learning
- AI as scaffold, not solution

In steering/guardrails.md:
- allowed AI behaviors
- forbidden AI behaviors
- feedback schema
- answer leakage examples

In steering/ui.md:
- simple, polished, hackathon-ready UI
- game-like but not childish
- show points, streaks, quiz cards, source references

In hooks markdown files:
Describe the intended automated checks:
- answer-leak-check: runs before feedback is displayed
- quiz-generation-check: ensures quiz questions are grounded in source and include references

Implementation details:
- If no API key is available, include a mock mode with deterministic sample questions and feedback.
- Keep the app functional without backend.
- Use local mock services first.
- Make it demo-ready.
- Make the UI attractive and clear.
- Use hardcoded sample source material for quick demo:
  Topic: React useEffect and Strict Mode
  Include 3 paragraphs of sample material.
- Also allow user to paste their own source.

Demo journey:
1. User pastes a React useEffect transcript.
2. App creates “React useEffect Study Room.”
3. Shows quiz cards and AI quiz partner.
4. User opens question: “Why can useEffect run twice in development?”
5. User answers weakly: “Because React renders twice.”
6. App responds:
   “You noticed the repeated behavior, but your answer does not explain the development-only reason. Go back to the Strict Mode section. What is React trying to help developers catch?”
7. User asks or clicks “Just tell me.”
8. App refuses:
   “I can’t give the final answer. Try revising this structure: In development, React uses ___ to help developers notice ___. Look back at Paragraph 3.”
9. Points increase for attempt + revision.

README:
Create a strong README with:
- project name
- problem
- solution
- features
- how Kiro was used
- how to run
- demo flow
- Education frame alignment
- limitations
- future work

Future work section:
- real peer matchmaking
- video upload and transcription
- teacher-created rooms
- LMS integration
- stronger LLM-as-judge guardrails
- MCP source server
- multiplayer quiz battles

Important:
Do not overbuild. The goal is a polished Phase 1 MVP for a 2–3 minute hackathon demo.

Judging focus:
- Clear real-world problem
- Functional demo
- Strong Kiro usage
- AI as scaffold, not solution
- Delightful gamified UI
- Responsible education design

Start by:
1. Creating the project structure.
2. Creating the Kiro specs/steering/hooks.
3. Building the React UI.
4. Building mock quiz generation and feedback.
5. Building answer guardrail.
6. Writing README.
7. Giving me exact commands to run the app.
```

Use this as your opening sentence before the big prompt:

```text
I’m building this for the Kiro Spark Challenge. Please implement the MVP, not just brainstorm. Prioritize demo-ready code, visible Kiro usage, and a polished 2–3 minute user journey.
```

Sources to keep in mind: Kiro’s docs describe specs, steering files, hooks, and MCP servers as core workflow features, and Promptions is Microsoft’s dynamic prompt middleware approach for generating interactive UI controls that steer AI responses. ([Kiro](https://kiro.dev/docs/getting-started/first-project/?utm_source=chatgpt.com))