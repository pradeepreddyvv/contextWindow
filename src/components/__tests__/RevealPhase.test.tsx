import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { BattleResult } from '../../types';
import RevealPhase from '../RevealPhase';

const MOCK_RESULTS: BattleResult[] = [
  {
    question: {
      text: 'Why does removing the cleanup function cause memory leaks in useEffect?',
      author: 'You',
    },
    myAnswer:
      'When the cleanup function is missing, each re-render stacks another subscription without removing the old one, causing duplicate handlers and memory growth.',
    score: 5,
    verdict: {
      label: 'Strong reasoning',
      color: '#2D6A4F',
      note: 'Your answer traces the causal chain from setup to cleanup and connects it to the component lifecycle.',
    },
    peerAnswers: [
      { author: 'Alex M.', text: 'Without cleanup, old effects persist alongside new ones, stacking listeners.' },
      { author: 'Sam K.', text: 'The cleanup runs before the next effect; skipping it means old side effects linger.' },
    ],
  },
  {
    question: {
      text: 'How does Strict Mode double-invocation expose incomplete cleanup logic?',
      author: 'You',
    },
    myAnswer:
      'Strict Mode mounts, unmounts, and remounts the component. If cleanup is incomplete you see duplicated side effects.',
    score: 3,
    verdict: {
      label: 'Partial credit',
      color: '#7B5E2A',
      note: "You identified the core mechanism but didn't explain why the consequence follows from the cause.",
    },
    peerAnswers: [
      { author: 'Alex M.', text: 'Double-mount tests idempotency — incomplete cleanup leaks connections.' },
      { author: 'Sam K.', text: 'The double run simulates concurrent features, exposing fragile effects.' },
    ],
  },
  {
    question: {
      text: 'If you omit the dependency array entirely, what happens on every render?',
      author: 'You',
    },
    myAnswer: 'The effect fires.',
    score: 1,
    verdict: {
      label: 'Needs rigor',
      color: '#8B3A3A',
      note: "Your answer names the concept but doesn't explain how it works or why it matters.",
    },
    peerAnswers: [
      { author: 'Alex M.', text: 'Without a dependency array, React re-runs the effect after every render cycle.' },
      { author: 'Sam K.', text: 'Omitting the array means React has no way to skip the effect, so it runs unconditionally.' },
    ],
  },
];

describe('RevealPhase (Phase 3 of Battle Mode)', () => {
  it('renders the score header with correct total', () => {
    render(<RevealPhase results={MOCK_RESULTS} onPlayAgain={() => {}} />);

    // Total: 5 + 3 + 1 = 9, max: 3 * 5 = 15
    expect(screen.getByText('9 / 15')).toBeInTheDocument();
  });

  it('renders a reveal card for each question with question text, student answer, peer answers, and verdict', () => {
    render(<RevealPhase results={MOCK_RESULTS} onPlayAgain={() => {}} />);

    for (const r of MOCK_RESULTS) {
      // Question text
      expect(screen.getByText(r.question.text)).toBeInTheDocument();

      // Student answer
      expect(screen.getByText(r.myAnswer)).toBeInTheDocument();

      // Peer answers
      for (const pa of r.peerAnswers) {
        expect(screen.getByText(pa.text)).toBeInTheDocument();
      }

      // Verdict label with score
      expect(
        screen.getByText(`${r.verdict.label} (${r.score}/5)`)
      ).toBeInTheDocument();

      // Verdict note
      expect(screen.getByText(r.verdict.note)).toBeInTheDocument();
    }
  });

  it('does not reveal any correct answer', () => {
    const { container } = render(
      <RevealPhase results={MOCK_RESULTS} onPlayAgain={() => {}} />
    );

    const allText = container.textContent?.toLowerCase() ?? '';
    expect(allText).not.toContain('the correct answer is');
    expect(allText).not.toContain('the right answer');
  });

  it('"Play Again" button calls onPlayAgain callback', async () => {
    const onPlayAgain = vi.fn();
    const user = userEvent.setup();
    render(<RevealPhase results={MOCK_RESULTS} onPlayAgain={onPlayAgain} />);

    const btn = screen.getByRole('button', { name: /play again/i });
    await user.click(btn);

    expect(onPlayAgain).toHaveBeenCalledOnce();
  });
});
