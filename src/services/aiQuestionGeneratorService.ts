import { checkContent } from './guardrailService';
import type { BattleRoomQuestion } from '../types';

const RECALL_STARTERS = ['what is', 'what are', 'define', 'list', 'name'];

/**
 * Generates mechanism-level questions about a document for Battle Rooms.
 * In mock mode, returns hardcoded questions. With a real LLM, would call the API.
 * All output passes through guardrailService before returning.
 */
export async function generateBattleQuestions(
  documentText: string,
  topic: string,
  count: number
): Promise<BattleRoomQuestion[]> {
  // For now, use rule-based generation from document content.
  // This will be replaced with real LLM calls when API key is provided.
  const candidates = getMechanismQuestions(documentText, topic);

  const questions: BattleRoomQuestion[] = [];
  for (const candidate of candidates) {
    if (questions.length >= count) break;

    // Guardrail check
    const check = checkContent(candidate);
    if (!check.passed) continue;

    // Reject recall-style questions
    const lower = candidate.toLowerCase();
    const isRecall = RECALL_STARTERS.some(
      (s) => lower.startsWith(s) && !lower.includes('if') && !lower.includes('would') && !lower.includes('happen')
    );
    if (isRecall) continue;

    questions.push({
      id: `q-${Date.now()}-${questions.length}`,
      text: check.sanitizedText,
    });
  }

  // If we didn't get enough, fill with fallback mechanism questions
  while (questions.length < count) {
    const fallback = FALLBACK_QUESTIONS[questions.length % FALLBACK_QUESTIONS.length];
    questions.push({
      id: `q-${Date.now()}-${questions.length}`,
      text: fallback,
    });
  }

  return questions;
}

function getMechanismQuestions(documentText: string, _topic: string): string[] {
  // Extract key concepts from document and generate mechanism questions
  const questions: string[] = [];

  if (documentText.includes('useEffect') || documentText.includes('effect')) {
    questions.push(
      'If useEffect\'s cleanup function were removed entirely, what chain of consequences would occur during repeated re-renders?',
      'How does the dependency array mechanism determine when an effect should re-execute, and what breaks when object references are used as dependencies?',
      'Why does React\'s Strict Mode run effects twice in development, and what category of production bugs does this double-invocation expose?',
      'Compare the behavior of an effect with an empty dependency array versus one with no dependency array — what are the practical consequences of each?',
      'If a component using useEffect were unmounted and immediately remounted, what would happen to active subscriptions without proper cleanup?',
      'What would happen to browser memory if event listeners added in useEffect were never cleaned up across 100 re-renders?',
      'How does the concept of idempotency apply to useEffect cleanup functions, and what fails when cleanup is not idempotent?',
    );
  }

  if (documentText.includes('closure') || documentText.includes('stale')) {
    questions.push(
      'How do JavaScript closures interact with useEffect to create stale state bugs, and what mechanism prevents them?',
    );
  }

  if (documentText.includes('render') || documentText.includes('virtual DOM')) {
    questions.push(
      'What is the relationship between React\'s render cycle and when useEffect callbacks execute — and why was this ordering chosen?',
    );
  }

  return questions;
}

const FALLBACK_QUESTIONS = [
  'If the primary mechanism described in this section failed silently, what downstream effects would a developer observe?',
  'Compare two approaches to solving the problem described here — what trade-offs does each introduce?',
  'What assumption does this section make that, if violated, would cause the described behavior to break?',
  'How would you explain the causal chain in this section to someone who understands the prerequisites but has never seen this pattern?',
  'What would happen if you applied this concept in a context where the described constraints don\'t hold?',
  'If you had to debug a failure in the mechanism described here, what would you check first and why?',
  'What is the relationship between the concept in this section and the concept in the previous section — how does one depend on the other?',
];
