import { MOCK_SCORES, MOCK_PEER_ANSWERS } from './mockData';
import { checkContent } from './guardrailService';
import { isLLMAvailable, generateCompletion } from './llmService';
import type { BattleResult, BattleQuestion } from '../types';

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

const ANSWER_SCORER_SYSTEM_PROMPT = `You are a pedagogical AI that scores student answers based on reasoning rigor, not correctness. Your role is to evaluate the quality of their thinking process.

SCORING CRITERIA (0-5 scale):
- 5: Strong reasoning - clear mechanisms, causal chains, specific vocabulary
- 3-4: Partial credit - some reasoning but vague or incomplete
- 0-2: Needs rigor - mostly recall, no mechanisms, or too brief

Respond with JSON:
{
  "score": 0-5,
  "label": "Strong reasoning" | "Partial credit" | "Needs rigor",
  "note": "one sentence describing what the answer did or missed"
}

CRITICAL RULES:
- NEVER reveal the correct answer
- NEVER say "the answer is" or "you should have said"
- Focus on the quality of reasoning, not factual correctness
- Describe what they DID (or didn't do), not what they should do
- Keep the note to one sentence

Example notes:
- "You identified the mechanism but didn't explain the consequence."
- "Your answer used vague terms like 'handles' without explaining how."
- "Strong causal chain from trigger to outcome with specific vocabulary."`;

export async function scoreAnswer(
  question: string,
  answer: string,
  documentContext: string
): Promise<{ score: number; label: string; note: string }> {
  // Use mock scoring if LLM is not available
  if (!isLLMAvailable()) {
    const idx = simpleHash(question) % MOCK_SCORES.length;
    const mock = MOCK_SCORES[idx];
    const noteCheck = checkContent(mock.note);
    return {
      score: mock.score,
      label: mock.label,
      note: noteCheck.passed ? noteCheck.sanitizedText : 'Your answer was evaluated on reasoning rigor.',
    };
  }

  // Real-time LLM scoring
  try {
    const userPrompt = `Question: "${question}"\n\nStudent answer: "${answer}"\n\nDocument context:\n${documentContext.slice(0, 2000)}\n\nScore this answer based on reasoning rigor (0-5). Do NOT reveal the correct answer.`;

    const response = await generateCompletion(ANSWER_SCORER_SYSTEM_PROMPT, userPrompt);

    // Parse JSON response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format');
    }

    const parsed = JSON.parse(jsonMatch[0]) as { score: number; label: string; note: string };

    // Validate note through guardrails
    const noteCheck = checkContent(parsed.note, answer);
    if (!noteCheck.passed) {
      throw new Error('Response failed guardrail check');
    }

    // Normalize label
    let normalizedLabel = parsed.label;
    if (parsed.score >= 4) {
      normalizedLabel = 'Strong reasoning';
    } else if (parsed.score >= 2) {
      normalizedLabel = 'Partial credit';
    } else {
      normalizedLabel = 'Needs rigor';
    }

    return {
      score: Math.max(0, Math.min(5, parsed.score)),
      label: normalizedLabel,
      note: noteCheck.sanitizedText,
    };
  } catch (error) {
    console.error('LLM scoring failed, falling back to mock:', error);

    // Fallback to mock scoring
    const idx = simpleHash(question) % MOCK_SCORES.length;
    const mock = MOCK_SCORES[idx];
    return {
      score: mock.score,
      label: mock.label,
      note: mock.note,
    };
  }
}

export async function scoreAllAnswers(
  questions: BattleQuestion[],
  answers: Record<number, string>,
  documentContext: string
): Promise<BattleResult[]> {
  const results: BattleResult[] = [];
  for (let i = 0; i < questions.length; i++) {
    const scored = await scoreAnswer(questions[i].text, answers[i] || '', documentContext);
    results.push({
      question: questions[i],
      myAnswer: answers[i] || '',
      score: scored.score,
      verdict: {
        label: scored.label as BattleResult['verdict']['label'],
        color:
          scored.label === 'Strong reasoning'
            ? 'var(--color-success)'
            : scored.label === 'Partial credit'
              ? 'var(--color-warning)'
              : 'var(--color-error)',
        note: scored.note,
      },
      peerAnswers: MOCK_PEER_ANSWERS[i % MOCK_PEER_ANSWERS.length],
    });
  }
  return results;
}
