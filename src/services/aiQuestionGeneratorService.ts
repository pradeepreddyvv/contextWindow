import { checkContent } from './guardrailService';
import { isLLMAvailable, generateCompletion } from './llmService';
import type { BattleRoomQuestion } from '../types';

const RECALL_STARTERS = ['what is', 'what are', 'define', 'list', 'name'];

const BATTLE_QUESTION_SYSTEM_PROMPT = `You are a pedagogical AI that generates mechanism-level questions for a student battle mode. Students will answer these questions to prove understanding through reasoning, not recall.

Generate questions that:
- Ask about mechanisms, causal chains, consequences, or trade-offs
- Use "why", "how", "what would happen if", "compare"
- Require explaining processes, not reciting facts
- Each question must end with "?"

RULES:
- NEVER generate recall questions ("What is X?", "Define X", "List the types of...")
- NEVER provide answers or hints
- Each question should be self-contained and understandable without the document
- Focus on reasoning rigor

Return one question per line, numbered.`;

export async function generateBattleQuestions(
  documentText: string,
  topic: string,
  count: number
): Promise<BattleRoomQuestion[]> {
  if (isLLMAvailable()) {
    try {
      const userPrompt = `Generate ${count} mechanism-level questions about "${topic}" based on this document:\n\n${documentText.slice(0, 3000)}`;
      const response = await generateCompletion(BATTLE_QUESTION_SYSTEM_PROMPT, userPrompt);

      const candidates = response
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .map((line) => line.replace(/^[\d\-\*\.]+\s*/, ''))
        .filter((line) => line.endsWith('?'));

      const questions: BattleRoomQuestion[] = [];
      for (const candidate of candidates) {
        if (questions.length >= count) break;
        const check = checkContent(candidate);
        if (!check.passed) continue;
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

      if (questions.length >= count) return questions;

      while (questions.length < count) {
        questions.push({
          id: `q-${Date.now()}-${questions.length}`,
          text: FALLBACK_QUESTIONS[questions.length % FALLBACK_QUESTIONS.length],
        });
      }
      return questions;
    } catch (error) {
      console.error('LLM question generation failed, falling back to rule-based:', error);
    }
  }

  return getFallbackQuestions(count);
}

function getFallbackQuestions(count: number): BattleRoomQuestion[] {
  const questions: BattleRoomQuestion[] = [];
  for (let i = 0; i < count; i++) {
    questions.push({
      id: `q-${Date.now()}-${i}`,
      text: FALLBACK_QUESTIONS[i % FALLBACK_QUESTIONS.length],
    });
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
