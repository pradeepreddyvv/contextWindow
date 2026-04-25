# Pedagogy — Scaffold (Provoke)

## Research Foundation

This project is grounded in three converging research streams that all point in the same direction: AI that challenges students produces better learning outcomes than AI that answers for them.

### 1. Tools for Thought / Provocations (Advait Sarkar, Microsoft Research)
- **Source:** Sarkar, "How to Stop AI from Killing Your Critical Thinking," TEDAI Vienna 2025
- **Source:** Sarkar, "AI Should Challenge, Not Obey," CACM 67(10), Oct 2024
- **Key insight:** AI should be a "provocateur" and "Socratic gadfly." Interfaces should preserve direct material engagement with the source document, introduce productive resistance at strategic points, and scaffold metacognition.
- **Application in Scaffold:** Inline provocations (not summaries), customizable lenses, document-first reading surface.

### 2. Productive Failure (Manu Kapur)
- **Source:** Sinha & Kapur, "When Problem Solving Followed by Instruction Works," Review of Educational Research 91(5), 2021 — meta-analysis of 166 comparisons, N>12,000
- **Key finding:** Students who struggle before receiving instruction outperform direct-instruction students with Cohen's d = 0.36–0.58 — "about three times the effect a good teacher has."
- **Application in Scaffold:** Battle Mode deliberately withholds answers. The "I want the answer" button returns productive-failure research, not the answer.

### 3. Cognitive Forcing Functions (Bucinca, Malaya & Gajos)
- **Source:** "To Trust or to Think," Proc. ACM HCI 5(CSCW1), 2021
- **Key finding:** Adding friction to AI-assisted decisions (e.g., requiring the user to commit to an answer before seeing the AI's) reduces overreliance more effectively than showing AI explanations.
- **Application in Scaffold:** Students must write something before the Tutor responds. Hints escalate only after multiple attempts. The Explain It Back lens requires revision rounds.

### 4. Evidence that Constraints Matter
- **Bastani et al., PNAS 2025:** Unconstrained GPT-4 improved practice scores 48% but reduced unassisted exam scores by 17%. Guard-railed "GPT Tutor" preserved learning.
- **Kestin et al., Scientific Reports 2025:** Heavily constrained AI tutor produced learning gains 2x active-learning lectures.
- **Takeaway:** Constrained AI is at minimum Hippocratic; in best cases it is transformative.

## Design Principles

1. **Preserve material engagement** — The document is always visible. AI never replaces reading with summaries.
2. **Productive resistance** — Every AI interaction adds friction at strategic points, not convenience.
3. **Scaffold metacognition** — Lenses direct attention. Provocations surface assumptions. Explain It Back forces articulation.
4. **AI as scaffold, not solution** — The AI asks, flags, and redirects. It never answers, rewrites, or completes.
5. **Rigor over recall** — Battle Mode rewards causal reasoning and mechanism vocabulary, not memorized facts.

## Promptions Pattern (Microsoft Research)
- **Source:** Microsoft Foundry Labs, github.com/microsoft/Promptions (MIT license)
- **Key pattern:** Ephemeral UI controls (radio buttons, checkboxes, toggles) that steer AI output without appending new chat messages. User clicks a control → same output panel updates instantly.
- **Application in Scaffold:** Lens tabs are Promptions-style option controls. Selecting a lens updates the lens panel in-place, not as a new message.
