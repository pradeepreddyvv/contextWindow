import { MOCK_SCORES, MOCK_PEER_ANSWERS } from './mockData';
import { checkContent } from './guardrailService';
import type { BattleResult, BattleQuestion } from '../types';

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export async function scoreAnswer(
  question: string,
  _answer: string,
  _documentContext: string
): Promise<{ score: number; label: string; note: string }> {
  const idx = simpleHash(question) % MOCK_SCORES.length;
  const mock = MOCK_SCORES[idx];
  const noteCheck = checkContent(mock.note);
  return {
    score: mock.score,
    label: mock.label,
    note: noteCheck.passed ? noteCheck.sanitizedText : 'Your answer was evaluated on reasoning rigor.',
  };
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
