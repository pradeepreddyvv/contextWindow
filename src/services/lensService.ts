import { MOCK_LENS_QUESTIONS } from './mockData';
import { checkContent } from './guardrailService';
import { isLLMAvailable, generateCompletion } from './llmService';
import type { LensType } from '../types';

const LENS_SYSTEM_PROMPTS = {
  watch: `You are a pedagogical AI that helps students engage deeply with academic texts. Your role is to generate 3-5 mechanism-level questions that students should hold in mind while reading.

RULES:
- Ask WHY, HOW, or WHAT-IF questions about mechanisms, not facts
- Each question must end with "?"
- Focus on causal relationships, dependencies, and consequences
- Never provide answers or summaries
- Questions should provoke thinking, not test recall

Example good questions:
- "Why would removing this step break the entire process?"
- "How does X enable Y to function?"
- "What would happen if this constraint were violated?"`,

  prereq: `You are a pedagogical AI that helps students identify prerequisite knowledge gaps. Your role is to generate 3-5 prerequisite concepts as one-sentence challenges.

RULES:
- Frame each as a challenge: "Can you explain X without looking it up?"
- Each must end with "?"
- Focus on foundational concepts the text assumes
- Never provide definitions or explanations
- Target concepts students might have forgotten or never learned

Example format:
- "Can you explain what a closure is without looking it up?"
- "Do you remember how the event loop handles async operations?"`,

  misc: `You are a pedagogical AI that helps students confront misconceptions. Your role is to generate 2-4 counterintuitive claims that challenge common misunderstandings.

RULES:
- State surprising or counterintuitive claims as questions
- Each question must end with "?"
- Hook directly to specific text passages
- Never explain why the misconception is wrong
- Make students question their assumptions

Example format:
- "Why doesn't this code run top-to-bottom like you'd expect?"
- "What makes this 'cleanup' function more important than the main effect?"`,
};

export async function generateLensQuestions(
  documentText: string,
  lensType: Exclude<LensType, 'explain'>
): Promise<string[]> {
  // Use mock data if LLM is not available
  if (!isLLMAvailable()) {
    const questions = MOCK_LENS_QUESTIONS[lensType];
    return questions
      .map((q) => {
        const result = checkContent(q);
        return result.passed ? result.sanitizedText : null;
      })
      .filter((q): q is string => q !== null);
  }

  // Real-time LLM generation
  try {
    const systemPrompt = LENS_SYSTEM_PROMPTS[lensType];
    const userPrompt = `Generate questions for this document excerpt:\n\n${documentText.slice(0, 3000)}`;

    const response = await generateCompletion(systemPrompt, userPrompt);

    // Parse questions from response (expecting one per line or numbered list)
    const questions = response
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => line.replace(/^[\d\-\*\.]+\s*/, '')) // Remove list markers
      .filter((line) => line.endsWith('?'));

    // Validate through guardrails
    const validated = questions
      .map((q) => {
        const result = checkContent(q);
        return result.passed ? result.sanitizedText : null;
      })
      .filter((q): q is string => q !== null);

    // Fallback to mock if validation fails all questions
    if (validated.length === 0) {
      return MOCK_LENS_QUESTIONS[lensType];
    }

    return validated.slice(0, 5); // Limit to 5 questions
  } catch (error) {
    console.error('LLM generation failed, falling back to mock:', error);
    return MOCK_LENS_QUESTIONS[lensType];
  }
}
