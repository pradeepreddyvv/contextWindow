import type { BattleQuestion } from '../types';

interface BattlePhaseProps {
  questions: BattleQuestion[];
  answers: Record<number, string>;
  currentIdx: number;
  onSetAnswer: (idx: number, text: string) => void;
  onSetIdx: (idx: number) => void;
  onSubmitAll: () => void;
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export default function BattlePhase({
  questions,
  answers,
  currentIdx,
  onSetAnswer,
  onSetIdx,
  onSubmitAll,
}: BattlePhaseProps) {
  const currentQ = questions[currentIdx];
  const currentAnswer = answers[currentIdx] || '';
  const wc = wordCount(currentAnswer);
  const minWords = 15;
  const isLast = currentIdx === questions.length - 1;
  const allAnswered = questions.every((_, i) => wordCount(answers[i] || '') >= minWords);

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <p className="label">Question {currentIdx + 1} / {questions.length}</p>
        <span className="label" style={{ color: wc >= minWords ? 'var(--color-success)' : 'var(--color-muted)' }}>
          {wc} / {minWords} words
        </span>
      </div>

      <div style={{
        padding: '1rem',
        borderLeft: '3px solid var(--color-rust)',
        background: 'rgba(181,74,30,0.06)',
        borderRadius: '0 4px 4px 0',
        marginBottom: '1rem',
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
      }}>
        {currentQ.text}
        <p className="label" style={{ marginTop: '0.5rem', fontSize: '0.55rem' }}>
          By {currentQ.author}
        </p>
      </div>

      <textarea
        value={currentAnswer}
        onChange={(e) => onSetAnswer(currentIdx, e.target.value)}
        placeholder="Explain the mechanism — why and how, not just what..."
        rows={5}
        style={{ marginBottom: '0.75rem' }}
      />

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {currentIdx > 0 && (
          <button onClick={() => onSetIdx(currentIdx - 1)}>← Previous</button>
        )}
        {!isLast && (
          <button
            onClick={() => onSetIdx(currentIdx + 1)}
            disabled={wc < minWords}
          >
            Next →
          </button>
        )}
        {isLast && (
          <button
            onClick={onSubmitAll}
            disabled={!allAnswered}
            style={{
              background: allAnswered ? 'var(--color-rust)' : undefined,
              color: allAnswered ? 'var(--color-paper)' : undefined,
              border: allAnswered ? 'none' : undefined,
            }}
          >
            Submit All
          </button>
        )}
      </div>
    </div>
  );
}
