import { MOCK_QUESTION_EVAL } from './mockData';
import { checkContent } from './guardrailService';
import { isLLMAvailable, generateCompletion } from './llmService';

const RECALL_STARTERS = ['what is', 'what are', 'define', 'list', 'name'];

const QUESTION_EVAL_SYSTEM_PROMPT = `You are a pedagogical AI that evaluates student-authored questions for an active learning system. Your role is to accept mechanism-based questions and reject recall questions.

ACCEPT questions that:
- Ask about mechanisms, processes, or causal relationships
- Use "why", "how", "what would happen if"
- Require explaining consequences or dependencies
- Test understanding, not memorization

REJECT questions that:
- Ask for definitions ("What is X?")
- Request lists or facts ("Name the three types...")
- Can be answered by copying text
- Test recall instead of reasoning

Respond with JSON:
{
  "accepted": true/false,
  "message": "brief explanation for the student"
}

CRITICAL: Your message must NEVER rewrite the question for them. Only explain what's wrong and guide them to improve it themselves.`;

export async function evaluateQuestion(
  question: string,
  documentContext: string
): Promise<{ accepted: boolean; message: string }> {
  const trimmed = question.trim();

  // Basic validation (same for both modes)
  if (trimmed.length === 0) {
    return { accepted: false, message: 'Please write a question first.' };
  }

  if (!trimmed.endsWith('?')) {
    return { accepted: false, message: 'Your question should end with a question mark.' };
  }

  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  if (wordCount < 6) {
    return { accepted: false, message: 'Your question is too short. Ask something that requires explaining a mechanism or consequence.' };
  }

  // Use mock evaluation if LLM is not available
  if (!isLLMAvailable()) {
    const lower = trimmed.toLowerCase();
    for (const starter of RECALL_STARTERS) {
      if (lower.startsWith(starter)) {
        // Check for mechanism indicators as whole words
        const hasIfWord = /\bif\b/.test(lower);
        const hasWouldWord = /\bwould\b/.test(lower);
        const hasHappenWord = /\bhappen\b/.test(lower);
        
        if (!hasIfWord && !hasWouldWord && !hasHappenWord) {
          const result = checkContent(MOCK_QUESTION_EVAL.rejected.message);
          return { accepted: false, message: result.sanitizedText };
        }
      }
    }

    const result = checkContent(MOCK_QUESTION_EVAL.accepted.message);
    return { accepted: true, message: result.sanitizedText };
  }

  // Real-time LLM evaluation
  try {
    const userPrompt = `Evaluate this student question:\n"${question}"\n\nDocument context:\n${documentContext.slice(0, 2000)}`;

    const response = await generateCompletion(QUESTION_EVAL_SYSTEM_PROMPT, userPrompt);

    // Parse JSON response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format');
    }

    const parsed = JSON.parse(jsonMatch[0]) as { accepted: boolean; message: string };

    // Validate message through guardrails
    const messageCheck = checkContent(parsed.message);
    if (!messageCheck.passed) {
      throw new Error('Response failed guardrail check');
    }

    return {
      accepted: parsed.accepted,
      message: messageCheck.sanitizedText,
    };
  } catch (error) {
    console.error('LLM evaluation failed, falling back to rule-based:', error);

    // Fallback to rule-based evaluation
    const lower = trimmed.toLowerCase();
    for (const starter of RECALL_STARTERS) {
      if (lower.startsWith(starter)) {
        // Check for mechanism indicators as whole words
        const hasIfWord = /\bif\b/.test(lower);
        const hasWouldWord = /\bwould\b/.test(lower);
        const hasHappenWord = /\bhappen\b/.test(lower);
        
        if (!hasIfWord && !hasWouldWord && !hasHappenWord) {
          return { accepted: false, message: MOCK_QUESTION_EVAL.rejected.message };
        }
      }
    }

    return { accepted: true, message: MOCK_QUESTION_EVAL.accepted.message };
  }
}
