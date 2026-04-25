import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { generateLensQuestions } from '../services/lensService';
import { generateProvocations } from '../services/explainBackService';
import { evaluateQuestion } from '../services/questionEvaluatorService';
import { scoreAnswer } from '../services/answerScorerService';

// ─── lensService ─────────────────────────────────────────────────────────────

describe('lensService', () => {
  it('returns questions for "watch" lens', async () => {
    const qs = await generateLensQuestions('doc text', 'watch');
    expect(qs.length).toBeGreaterThanOrEqual(1);
  });

  it('returns questions for "prereq" lens', async () => {
    const qs = await generateLensQuestions('doc text', 'prereq');
    expect(qs.length).toBeGreaterThanOrEqual(1);
  });

  it('returns questions for "misc" lens', async () => {
    const qs = await generateLensQuestions('doc text', 'misc');
    expect(qs.length).toBeGreaterThanOrEqual(1);
  });

  // Property 3: every lens output string ends with "?"
  it('Property 3: all lens questions end with "?"', async () => {
    for (const lens of ['watch', 'prereq', 'misc'] as const) {
      const qs = await generateLensQuestions('doc text', lens);
      for (const q of qs) {
        expect(q.trimEnd()).toMatch(/\?$/);
      }
    }
  });

  it('Property 3 (fast-check): lens output is always questions', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom('watch' as const, 'prereq' as const, 'misc' as const),
        async (lens) => {
          const qs = await generateLensQuestions('some document text', lens);
          return qs.every((q) => q.trimEnd().endsWith('?'));
        }
      ),
      { numRuns: 20 }
    );
  });
});

// ─── explainBackService ───────────────────────────────────────────────────────

describe('explainBackService', () => {
  it('returns provocations for non-empty explanation', async () => {
    const provs = await generateProvocations('useEffect runs after render', 'doc', 0);
    expect(provs.length).toBeGreaterThanOrEqual(1);
  });

  it('returns a prompt for empty/whitespace explanation', async () => {
    const provs = await generateProvocations('   ', 'doc', 0);
    expect(provs.length).toBe(1);
    expect(provs[0]).toContain('write');
  });

  it('cycles through rounds', async () => {
    const round0 = await generateProvocations('some text', 'doc', 0);
    const round2 = await generateProvocations('some text', 'doc', 2);
    // round 0 and round 2 should be the same (0 % 2 === 0, 2 % 2 === 0)
    expect(round0).toEqual(round2);
  });

  it('returns different provocations for round 1', async () => {
    const round0 = await generateProvocations('some text', 'doc', 0);
    const round1 = await generateProvocations('some text', 'doc', 1);
    expect(round0).not.toEqual(round1);
  });
});

// ─── questionEvaluatorService ─────────────────────────────────────────────────

describe('questionEvaluatorService', () => {
  it('rejects empty question', async () => {
    const result = await evaluateQuestion('', 'doc');
    expect(result.accepted).toBe(false);
  });

  it('rejects question without "?"', async () => {
    const result = await evaluateQuestion('Why does useEffect run after render', 'doc');
    expect(result.accepted).toBe(false);
  });

  it('rejects question with fewer than 6 words', async () => {
    const result = await evaluateQuestion('What is this?', 'doc');
    expect(result.accepted).toBe(false);
  });

  it('rejects recall starters without scenario', async () => {
    const recallQuestions = [
      'What is useEffect in React exactly?',
      'What are the rules of hooks in React?',
      'Define the dependency array in useEffect clearly?',
      'List the lifecycle methods in React class components?',
      'Name the three phases of React component lifecycle?',
    ];
    for (const q of recallQuestions) {
      const result = await evaluateQuestion(q, 'doc');
      expect(result.accepted).toBe(false);
    }
  });

  it('accepts mechanism questions', async () => {
    const mechanismQuestions = [
      'Why does React run effects after the browser paint instead of before?',
      'How would removing the cleanup function affect event listener accumulation?',
      'If the dependency array contained an object literal, what would happen on each render?',
      'What would happen if Strict Mode did not double-invoke effects?',
    ];
    for (const q of mechanismQuestions) {
      const result = await evaluateQuestion(q, 'doc');
      expect(result.accepted).toBe(true);
    }
  });

  // Property 5: recall starters always rejected
  it('Property 5: questions starting with recall starters are always rejected', async () => {
    const starters = ['What is', 'What are', 'Define', 'List', 'Name'];
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...starters),
        fc.stringMatching(/^[A-Za-z ]{5,30}$/),
        async (starter, suffix) => {
          const q = `${starter} ${suffix}?`;
          const lower = q.toLowerCase();
          // Skip if it contains scenario words that would make it acceptable
          if (lower.includes('if') || lower.includes('would') || lower.includes('happen')) return true;
          // Skip if fewer than 6 real words
          if (q.split(/\s+/).filter(Boolean).length < 6) return true;
          const result = await evaluateQuestion(q, 'doc');
          return result.accepted === false;
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ─── answerScorerService ──────────────────────────────────────────────────────

describe('answerScorerService', () => {
  it('returns a score between 0 and 5', async () => {
    const result = await scoreAnswer('Why does cleanup matter?', 'Because it prevents leaks.', 'doc');
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(5);
  });

  it('returns a valid label', async () => {
    const result = await scoreAnswer('Why does cleanup matter?', 'Because it prevents leaks.', 'doc');
    expect(['Strong reasoning', 'Partial credit', 'Needs rigor']).toContain(result.label);
  });

  // Property 6: scorer note never reveals correct answer
  it('Property 6: scorer note never contains "the correct answer is" or "the right answer"', async () => {
    const questions = [
      'Why does useEffect run after render?',
      'How does cleanup prevent memory leaks?',
      'What would happen if Strict Mode did not double-invoke effects?',
    ];
    for (const q of questions) {
      const result = await scoreAnswer(q, 'some answer text here', 'doc');
      expect(result.note.toLowerCase()).not.toContain('the correct answer is');
      expect(result.note.toLowerCase()).not.toContain('the right answer');
    }
  });

  it('Property 6 (fast-check): scorer note never reveals correct answer', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 5, maxLength: 100 }),
        fc.string({ minLength: 15, maxLength: 200 }),
        async (question, answer) => {
          const result = await scoreAnswer(question, answer, 'doc');
          const lower = result.note.toLowerCase();
          return !lower.includes('the correct answer is') && !lower.includes('the right answer');
        }
      ),
      { numRuns: 50 }
    );
  });
});
