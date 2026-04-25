import { MOCK_LENS_QUESTIONS } from './mockData';
import { isMockMode } from '../lib/supabase';
import { checkContent } from './guardrailService';
import type { LensType } from '../types';

export { isMockMode };

export async function generateLensQuestions(
  _documentText: string,
  lensType: Exclude<LensType, 'explain'>
): Promise<string[]> {
  const questions = MOCK_LENS_QUESTIONS[lensType];

  return questions
    .map((q) => {
      const result = checkContent(q);
      return result.passed ? result.sanitizedText : null;
    })
    .filter((q): q is string => q !== null);
}
