import { MOCK_EXPLAIN_PROVOCATIONS } from './mockData';
import { checkContent } from './guardrailService';

export async function generateProvocations(
  studentExplanation: string,
  _documentContext: string,
  round: number
): Promise<string[]> {
  if (!studentExplanation.trim()) {
    return ['Before I can challenge your thinking, I need to see it. Can you write your understanding of this section?'];
  }

  const provocations = MOCK_EXPLAIN_PROVOCATIONS[round % MOCK_EXPLAIN_PROVOCATIONS.length];

  return provocations
    .map((p) => {
      const result = checkContent(p, studentExplanation);
      return result.passed ? result.sanitizedText : null;
    })
    .filter((p): p is string => p !== null);
}
