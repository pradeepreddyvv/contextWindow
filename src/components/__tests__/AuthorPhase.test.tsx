import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import type { BattleQuestion } from '../../types';
import AuthorPhase from '../AuthorPhase';

/**
 * Wrapper that manages AuthorPhase state externally (the component is controlled).
 * Mirrors how BattleMode.tsx would host it.
 */
function AuthorPhaseHarness({ onEnterBattle }: { onEnterBattle?: () => void }) {
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [accepted, setAccepted] = useState<BattleQuestion[]>([]);

  return (
    <AuthorPhase
      documentText="useEffect lets you synchronize a component with an external system."
      draftQuestion={draft}
      questionStatus={status}
      acceptedQuestions={accepted}
      userName="Test User"
      onSetDraft={setDraft}
      onSetStatus={setStatus}
      onAccept={(q) => setAccepted((prev) => [...prev, q])}
      onEnterBattle={onEnterBattle ?? (() => {})}
    />
  );
}

describe('AuthorPhase (Phase 1 of Battle Mode)', () => {
  it('rejects a recall question like "What is useEffect?"', async () => {
    const user = userEvent.setup();
    render(<AuthorPhaseHarness />);

    const textarea = screen.getByPlaceholderText(/mechanism/i);
    await user.type(textarea, 'What is useEffect used for in React components?');
    await user.click(screen.getByRole('button', { name: /submit question/i }));

    await waitFor(() => {
      const status = screen.getByText(/recall question/i);
      expect(status).toBeInTheDocument();
    });

    // Pool should still show 0 / 3
    expect(screen.getByText(/0 \/ 3/)).toBeInTheDocument();
  });

  it('accepts a mechanism question with "Why"', async () => {
    const user = userEvent.setup();
    render(<AuthorPhaseHarness />);

    const textarea = screen.getByPlaceholderText(/mechanism/i);
    await user.type(
      textarea,
      'Why does removing the cleanup function cause memory leaks in useEffect?'
    );
    await user.click(screen.getByRole('button', { name: /submit question/i }));

    await waitFor(() => {
      const status = screen.getByText(/mechanism/i);
      expect(status).toBeInTheDocument();
    });

    // Pool should show 1 / 3
    expect(screen.getByText(/1 \/ 3/)).toBeInTheDocument();
  });

  it('fills the question pool to 3 accepted questions', async () => {
    const user = userEvent.setup();
    render(<AuthorPhaseHarness />);

    const questions = [
      'Why does removing the cleanup function cause memory leaks in useEffect?',
      'How does Strict Mode double-invocation expose incomplete cleanup logic?',
      'If you omit the dependency array entirely, what happens on every render?',
    ];

    const textarea = screen.getByPlaceholderText(/mechanism/i);

    for (const q of questions) {
      await user.clear(textarea);
      await user.type(textarea, q);
      await user.click(screen.getByRole('button', { name: /submit question/i }));
      // Wait for the evaluator to finish before submitting the next one
      await waitFor(() => {
        expect(screen.getByText(/mechanism/i)).toBeInTheDocument();
      });
    }

    // Pool should show 3 / 3
    expect(screen.getByText(/3 \/ 3/)).toBeInTheDocument();
  });

  it('shows "Enter Battle" button only when 3 questions are accepted', async () => {
    const onEnterBattle = vi.fn();
    const user = userEvent.setup();
    render(<AuthorPhaseHarness onEnterBattle={onEnterBattle} />);

    // No "Enter Battle" button initially
    expect(screen.queryByRole('button', { name: /enter battle/i })).not.toBeInTheDocument();

    const questions = [
      'Why does removing the cleanup function cause memory leaks in useEffect?',
      'How does Strict Mode double-invocation expose incomplete cleanup logic?',
      'If you omit the dependency array entirely, what happens on every render?',
    ];

    const textarea = screen.getByPlaceholderText(/mechanism/i);

    for (const q of questions) {
      await user.clear(textarea);
      await user.type(textarea, q);
      await user.click(screen.getByRole('button', { name: /submit question/i }));
      await waitFor(() => {
        expect(screen.getByText(/mechanism/i)).toBeInTheDocument();
      });
    }

    // Now the "Enter Battle" button should appear
    const enterBtn = await screen.findByRole('button', { name: /enter battle/i });
    expect(enterBtn).toBeInTheDocument();

    // Click it and verify callback fires
    await user.click(enterBtn);
    expect(onEnterBattle).toHaveBeenCalledOnce();
  });
});
