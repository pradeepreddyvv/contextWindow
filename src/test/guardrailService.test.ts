import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { checkContent } from '../services/guardrailService';

// ─── Unit tests ───────────────────────────────────────────────────────────────

describe('guardrailService – forbidden phrases', () => {
  const forbidden = [
    'the answer is',
    'correct answer',
    'final answer',
    'you should write',
    'the correct response',
  ];

  for (const phrase of forbidden) {
    it(`blocks text containing "${phrase}"`, () => {
      const result = checkContent(`Here is some text. ${phrase} 42.`);
      expect(result.passed).toBe(false);
      expect(result.blockedReason).toContain(phrase);
    });

    it(`blocks "${phrase}" regardless of casing`, () => {
      const result = checkContent(phrase.toUpperCase());
      expect(result.passed).toBe(false);
    });
  }

  it('passes clean question text', () => {
    const result = checkContent('Why does useEffect run after render instead of during?');
    expect(result.passed).toBe(true);
    expect(result.sanitizedText).toBe('Why does useEffect run after render instead of during?');
  });

  it('passes text with no forbidden content', () => {
    const result = checkContent('What happens when the dependency array is empty?');
    expect(result.passed).toBe(true);
  });

  it('blocks verbatim student text continuation (> 5 words)', () => {
    const studentText = 'useEffect runs after the component renders not during';
    const aiText = 'You said useEffect runs after the component renders not during which is correct.';
    const result = checkContent(aiText, studentText);
    expect(result.passed).toBe(false);
    expect(result.blockedReason).toContain('verbatim');
  });

  it('does not block when student text match is 4 words or fewer', () => {
    const studentText = 'runs after render';
    const aiText = 'runs after render is the key insight here.';
    const result = checkContent(aiText, studentText);
    // 3-word match — should pass
    expect(result.passed).toBe(true);
  });

  it('returns fallback sanitizedText when blocked', () => {
    const result = checkContent('the answer is 42');
    expect(result.passed).toBe(false);
    expect(result.sanitizedText).toContain("can't give the answer");
  });
});

// ─── Property-based tests ─────────────────────────────────────────────────────

describe('guardrailService – property-based tests', () => {
  // Property 1: injecting any forbidden phrase always blocks
  it('Property 1: any text containing a forbidden phrase is always blocked', () => {
    const forbidden = [
      'the answer is',
      'correct answer',
      'final answer',
      'you should write',
      'the correct response',
    ];
    fc.assert(
      fc.property(
        fc.constantFrom(...forbidden),
        fc.string({ minLength: 0, maxLength: 50 }),
        fc.string({ minLength: 0, maxLength: 50 }),
        (phrase, prefix, suffix) => {
          const text = `${prefix} ${phrase} ${suffix}`;
          const result = checkContent(text);
          return result.passed === false;
        }
      ),
      { numRuns: 200 }
    );
  });

  // Property 2: clean question strings always pass, sanitizedText unchanged
  it('Property 2: clean question text always passes and sanitizedText equals input', () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^[A-Za-z0-9 ,.'"-]{10,80}\?$/),
        (question) => {
          // Skip if it accidentally contains a forbidden phrase
          const lower = question.toLowerCase();
          const forbidden = ['the answer is', 'correct answer', 'final answer', 'you should write', 'the correct response'];
          if (forbidden.some((p) => lower.includes(p))) return true;
          const result = checkContent(question);
          return result.passed === true && result.sanitizedText === question;
        }
      ),
      { numRuns: 200 }
    );
  });

  // Property 10: passing content round-trip integrity
  it('Property 10: sanitizedText equals input when passed === true', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 200 }),
        (text) => {
          const result = checkContent(text);
          if (result.passed) {
            return result.sanitizedText === text;
          }
          return true; // blocked content can have any sanitizedText
        }
      ),
      { numRuns: 300 }
    );
  });
});
