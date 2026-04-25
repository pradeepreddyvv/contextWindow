import { checkContent } from './guardrailService';
import { isLLMAvailable, streamCompletion, type StreamCallbacks } from './llmService';

const EXPLAIN_BACK_SYSTEM_PROMPT = `You are a Socratic tutor helping students articulate their understanding. Your role is to generate 1-3 provocative questions that expose gaps in their explanation.

CRITICAL RULES:
- NEVER provide corrections, answers, or explanations
- NEVER rewrite or complete the student's text
- NEVER say "the answer is" or reveal what they should have said
- Ask questions that point to what's missing, vague, or assumed
- Target unstated mechanisms, ambiguous terms, or logical gaps
- Each question must end with "?"

Example provocations:
- "You said X 'causes' Y — but what's the mechanism?"
- "What does 'handles' mean in this context?"
- "If that were true, what would happen to Z?"

Your goal: make the student think harder, not give them the answer.`;

export async function streamProvocations(
  studentExplanation: string,
  documentContext: string,
  round: number,
  callbacks: StreamCallbacks
): Promise<string[]> {
  if (!studentExplanation.trim()) {
    const fallback = ['Before I can challenge your thinking, I need to see it. Can you write your understanding of this section?'];
    callbacks.onComplete?.(fallback.join('\n'));
    return fallback;
  }

  if (!isLLMAvailable()) {
    throw new Error('Streaming requires LLM to be available');
  }

  try {
    const userPrompt = `Student's explanation (Round ${round + 1}):\n"${studentExplanation}"\n\nDocument context:\n${documentContext.slice(0, 2000)}\n\nGenerate 1-3 provocative questions that expose gaps in their reasoning. Do NOT provide corrections or answers.`;

    const fullText = await streamCompletion(
      EXPLAIN_BACK_SYSTEM_PROMPT,
      userPrompt,
      callbacks
    );

    // Parse questions from response
    const provocations = fullText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => line.replace(/^[\d\-\*\.]+\s*/, ''))
      .filter((line) => line.endsWith('?'));

    // Validate through guardrails
    const validated = provocations
      .map((p) => {
        const result = checkContent(p, studentExplanation);
        return result.passed ? result.sanitizedText : null;
      })
      .filter((p): p is string => p !== null);

    return validated.slice(0, 3);
  } catch (error) {
    callbacks.onError?.(error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
}
