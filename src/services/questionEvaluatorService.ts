import { MOCK_QUESTION_EVAL } from './mockData';
import { checkContent } from './guardrailService';

const RECALL_STARTERS = ['what is', 'what are', 'define', 'list', 'name'];

export async function evaluateQuestion(
  question: string,
  _documentContext: string
): Promise<{ accepted: boolean; message: string }> {
  const trimmed = question.trim();

  if (trimmed.length === 0) {
    return { accepted: false, message: 'Please write a question first.' };
  }

  if (!trimmed.endsWith('?')) {
    return { accepted: false, message: 'Your question should end with a question mark.' };
  }

  const wordCount = trimmed.split(/\s+/).length;
  if (wordCount < 6) {
    return { accepted: false, message: 'Your question is too short. Ask something that requires explaining a mechanism or consequence.' };
  }

  const lower = trimmed.toLowerCase();
  for (const starter of RECALL_STARTERS) {
    if (lower.startsWith(starter) && !lower.includes('if') && !lower.includes('would') && !lower.includes('happen')) {
      const result = checkContent(MOCK_QUESTION_EVAL.rejected.message);
      return { accepted: false, message: result.sanitizedText };
    }
  }

  const result = checkContent(MOCK_QUESTION_EVAL.accepted.message);
  return { accepted: true, message: result.sanitizedText };
}
