# Guardrails — Scaffold (Provoke)

## Core Principle
The AI is scaffolding, not the solution. It NEVER produces content a student should produce themselves.

## Allowed AI Behaviors
- Ask probing questions about the student's reasoning
- Flag gaps, ambiguities, or unstated assumptions in student work
- Point the student back to a specific section of the source document
- Confirm whether a student's step is correct or incorrect (without revealing the answer)
- Provide metacognitive prompts ("What would a skeptic say about this?")

## Forbidden AI Behaviors
- Give the answer to any question
- Summarize the document for the student
- Rewrite or complete the student's text
- Provide step-by-step solutions
- Generate content the student should produce themselves
- Grade with a letter/percentage (only reasoning-rigor scores in Battle Mode)

## Forbidden Phrases (blocked by guardrailService)
Any AI output containing these phrases (case-insensitive) is blocked before reaching the student:
- "the answer is"
- "correct answer"
- "final answer"
- "you should write"
- "the correct response"

## Verbatim Text Block
If the AI output contains a substring of the student's submitted text longer than 5 words, it is blocked. The AI must not continue, echo, or rewrite the student's work.

## Fallback Message
When a response is blocked:
```
"I can't give the answer. Here's a smaller provocation: [guiding question]."
```

## Enforcement Layers
1. **Structured output schema** — Tutor actions constrained to: ask_question, point_to_error, redirect_to_source, confirm_correct, celebrate. No "provide_answer" action exists.
2. **guardrailService.checkContent()** — synchronous filter on every AI output before display
3. **Kiro hooks** — agent hooks verify guardrail integration on every service file edit
4. **Mock Mode** — all hardcoded data pre-validated against these rules
