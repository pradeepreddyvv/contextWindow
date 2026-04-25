import type { GuardrailResult } from '../types';

const FORBIDDEN_PHRASES = [
  'the answer is',
  'correct answer',
  'final answer',
  'you should write',
  'the correct response',
];

export function checkContent(text: string, studentText?: string): GuardrailResult {
  const lower = text.toLowerCase();

  for (const phrase of FORBIDDEN_PHRASES) {
    if (lower.includes(phrase)) {
      return {
        passed: false,
        sanitizedText: "I can't give the answer. Here's a smaller provocation: What part of the text addresses this directly?",
        blockedReason: `Contains forbidden phrase: "${phrase}"`,
      };
    }
  }

  if (studentText && studentText.length > 0) {
    const studentWords = studentText.split(/\s+/);
    if (studentWords.length >= 5) {
      for (let i = 0; i <= studentWords.length - 5; i++) {
        const chunk = studentWords.slice(i, i + 5).join(' ').toLowerCase();
        if (lower.includes(chunk)) {
          return {
            passed: false,
            sanitizedText: "I can't give the answer. Here's a smaller provocation: Can you rephrase this in your own words?",
            blockedReason: 'Contains verbatim student text continuation',
          };
        }
      }
    }
  }

  return { passed: true, sanitizedText: text };
}
