import { describe, it, expect, vi } from 'vitest';
import { generateLensQuestions } from '../services/lensService';
import { generateProvocations } from '../services/explainBackService';
import { evaluateQuestion } from '../services/questionEvaluatorService';
import { scoreAnswer } from '../services/answerScorerService';

// Mock the LLM service to avoid actual API calls in tests
vi.mock('../services/llmService', () => ({
  isLLMAvailable: () => false, // Force mock mode for tests
  generateCompletion: vi.fn(),
  streamCompletion: vi.fn(),
}));

describe('LLM Integration - Mock Mode Fallback', () => {
  describe('lensService', () => {
    it('should generate watch questions in mock mode', async () => {
      const questions = await generateLensQuestions('Sample document text', 'watch');
      expect(questions).toBeInstanceOf(Array);
      expect(questions.length).toBeGreaterThan(0);
      questions.forEach((q) => {
        expect(q).toMatch(/\?$/);
      });
    });

    it('should generate prereq questions in mock mode', async () => {
      const questions = await generateLensQuestions('Sample document text', 'prereq');
      expect(questions).toBeInstanceOf(Array);
      expect(questions.length).toBeGreaterThan(0);
      questions.forEach((q) => {
        expect(q).toMatch(/\?$/);
      });
    });

    it('should generate misc questions in mock mode', async () => {
      const questions = await generateLensQuestions('Sample document text', 'misc');
      expect(questions).toBeInstanceOf(Array);
      expect(questions.length).toBeGreaterThan(0);
      questions.forEach((q) => {
        expect(q).toMatch(/\?$/);
      });
    });
  });

  describe('explainBackService', () => {
    it('should return prompt when explanation is empty', async () => {
      const provocations = await generateProvocations('', 'doc context', 0);
      expect(provocations).toHaveLength(1);
      expect(provocations[0]).toContain('Before I can challenge');
    });

    it('should generate provocations for non-empty explanation', async () => {
      const provocations = await generateProvocations(
        'useEffect runs after render',
        'doc context',
        0
      );
      expect(provocations).toBeInstanceOf(Array);
      expect(provocations.length).toBeGreaterThan(0);
      provocations.forEach((p) => {
        expect(p).toMatch(/\?$/);
      });
    });

    it('should cycle through mock provocations by round', async () => {
      const round0 = await generateProvocations('explanation', 'context', 0);
      const round1 = await generateProvocations('explanation', 'context', 1);
      // Different rounds may return different provocations
      expect(round0).toBeInstanceOf(Array);
      expect(round1).toBeInstanceOf(Array);
    });
  });

  describe('questionEvaluatorService', () => {
    it('should reject empty questions', async () => {
      const result = await evaluateQuestion('', 'doc context');
      expect(result.accepted).toBe(false);
      expect(result.message).toContain('write a question');
    });

    it('should reject questions without question mark', async () => {
      const result = await evaluateQuestion('What is useEffect', 'doc context');
      expect(result.accepted).toBe(false);
      expect(result.message).toContain('question mark');
    });

    it('should reject too-short questions', async () => {
      const result = await evaluateQuestion('What is it?', 'doc context');
      expect(result.accepted).toBe(false);
      expect(result.message).toContain('too short');
    });

    it('should reject recall questions', async () => {
      const result = await evaluateQuestion('What is useEffect?', 'doc context');
      expect(result.accepted).toBe(false);
    });

    it('should accept mechanism questions', async () => {
      const result = await evaluateQuestion(
        'Why would removing the cleanup function cause memory leaks?',
        'doc context'
      );
      expect(result.accepted).toBe(true);
    });
  });

  describe('answerScorerService', () => {
    it('should return a score between 0 and 5', async () => {
      const result = await scoreAnswer(
        'Why does this happen?',
        'Because of the mechanism',
        'doc context'
      );
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(5);
    });

    it('should return a valid label', async () => {
      const result = await scoreAnswer(
        'Why does this happen?',
        'Because of the mechanism',
        'doc context'
      );
      expect(['Strong reasoning', 'Partial credit', 'Needs rigor']).toContain(result.label);
    });

    it('should return a note without revealing answers', async () => {
      const result = await scoreAnswer(
        'Why does this happen?',
        'Because of the mechanism',
        'doc context'
      );
      expect(result.note).toBeTruthy();
      expect(result.note.toLowerCase()).not.toContain('the answer is');
      expect(result.note.toLowerCase()).not.toContain('correct answer');
    });

    it('should produce consistent scores for same question', async () => {
      const question = 'Why does this specific thing happen?';
      const result1 = await scoreAnswer(question, 'answer1', 'context');
      const result2 = await scoreAnswer(question, 'answer2', 'context');
      // Same question should hash to same mock score
      expect(result1.score).toBe(result2.score);
    });
  });
});

describe('LLM Integration - Guardrail Enforcement', () => {
  it('should never return forbidden phrases', async () => {
    const forbiddenPhrases = [
      'the answer is',
      'correct answer',
      'final answer',
      'you should write',
    ];

    const questions = await generateLensQuestions('test', 'watch');
    const provocations = await generateProvocations('test explanation', 'context', 0);
    const evaluation = await evaluateQuestion('Why does this happen?', 'context');
    const score = await scoreAnswer('Why?', 'Because', 'context');

    const allText = [
      ...questions,
      ...provocations,
      evaluation.message,
      score.note,
    ].join(' ').toLowerCase();

    forbiddenPhrases.forEach((phrase) => {
      expect(allText).not.toContain(phrase);
    });
  });
});
