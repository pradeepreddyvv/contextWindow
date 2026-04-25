import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import type { BattleQuestion } from '../../types';
import BattlePhase from '../BattlePhase';

const MOCK_QUESTIONS: BattleQuestion[] = [
  { text: 'Why does removing the cleanup function cause memory leaks in useEffect?', author: 'You' },
  { text: 'How does Strict Mode double-invocation expose incomplete cleanup logic?', author: 'You' },
  { text: 'If you omit the dependency array entirely, what happens on every render?', author: 'You' },
];

/**
 * Controlled wrapper that manages BattlePhase state externally,
 * mirroring how BattleMode.tsx hosts it.
 */
function BattlePhaseHarness({ onSubmitAll }: { onSubmitAll?: () => void }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentIdx, setCurrentIdx] = useState(0);

  return (
    <BattlePhase
      questions={MOCK_QUESTIONS}
      answers={answers}
      currentIdx={currentIdx}
      onSetAnswer={(idx, text) =>
        setAnswers((prev) => ({ ...prev, [idx]: text }))
      }
      onSetIdx={setCurrentIdx}
      onSubmitAll={onSubmitAll ?? (() => {})}
    />
  );
}

/** Generate a string with exactly `n` words. */
function wordsOf(n: number): string {
  return Array.from({ length: n }, (_, i) => `word${i}`).join(' ');
}

describe('BattlePhase (Phase 2 of Battle Mode)', () => {
  it('displays the word count correctly as the user types', async () => {
    const user = userEvent.setup();
    render(<BattlePhaseHarness />);

    // Initially 0 words
    expect(screen.getByText(/0 \/ 15 words/)).toBeInTheDocument();

    const textarea = screen.getByPlaceholderText(/explain the mechanism/i);
    await user.type(textarea, 'hello world foo');

    // Should show 3 words
    expect(screen.getByText(/3 \/ 15 words/)).toBeInTheDocument();
  });

  it('"Next" button is disabled when answer has fewer than 15 words', async () => {
    const user = userEvent.setup();
    render(<BattlePhaseHarness />);

    const textarea = screen.getByPlaceholderText(/explain the mechanism/i);
    await user.type(textarea, wordsOf(10));

    const nextBtn = screen.getByRole('button', { name: /next/i });
    expect(nextBtn).toBeDisabled();
  });

  it('"Next" button is enabled when answer has 15+ words', async () => {
    const user = userEvent.setup();
    render(<BattlePhaseHarness />);

    const textarea = screen.getByPlaceholderText(/explain the mechanism/i);
    await user.type(textarea, wordsOf(15));

    const nextBtn = screen.getByRole('button', { name: /next/i });
    expect(nextBtn).toBeEnabled();
  });

  it('"Submit All" appears on the last question and calls onSubmitAll when all answers meet the minimum', async () => {
    const onSubmitAll = vi.fn();
    const user = userEvent.setup();
    render(<BattlePhaseHarness onSubmitAll={onSubmitAll} />);

    // Answer question 1 (15 words) and navigate to question 2
    const textarea = () => screen.getByPlaceholderText(/explain the mechanism/i);
    await user.type(textarea(), wordsOf(15));
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Answer question 2 (15 words) and navigate to question 3
    await user.type(textarea(), wordsOf(15));
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Now on the last question — "Submit All" should appear instead of "Next"
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /submit all/i });
    expect(submitBtn).toBeDisabled(); // last answer not yet written

    // Type 15 words for the last question
    await user.type(textarea(), wordsOf(15));

    expect(submitBtn).toBeEnabled();
    await user.click(submitBtn);
    expect(onSubmitAll).toHaveBeenCalledOnce();
  });
});
