import type { BattleResult } from '../types';

interface RevealPhaseProps {
  results: BattleResult[];
  onPlayAgain: () => void;
}

export default function RevealPhase({ results, onPlayAgain }: RevealPhaseProps) {
  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const maxScore = results.length * 5;

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto' }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem',
        padding: '1.5rem',
        background: 'rgba(255,255,255,0.5)',
        borderRadius: '8px',
      }}>
        <p className="label" style={{ marginBottom: '0.5rem' }}>Your Score</p>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.5rem',
          fontWeight: 700,
          color: 'var(--color-ink)',
        }}>
          {totalScore} / {maxScore}
        </p>
      </div>

      {results.map((r, i) => (
        <div key={i} style={{
          marginBottom: '1.5rem',
          padding: '1rem',
          border: '1px solid var(--color-border)',
          borderRadius: '6px',
          background: 'rgba(255,255,255,0.3)',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            marginBottom: '0.75rem',
            fontSize: '0.95rem',
          }}>
            {r.question.text}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
            <div>
              <p className="label" style={{ marginBottom: '0.25rem' }}>Your Answer</p>
              <p style={{ fontSize: '0.85rem', fontFamily: 'var(--font-body)' }}>{r.myAnswer}</p>
            </div>
            <div>
              <p className="label" style={{ marginBottom: '0.25rem' }}>Peer Answers</p>
              {r.peerAnswers.map((pa, j) => (
                <div key={j} style={{ marginBottom: '0.5rem' }}>
                  <span className="label" style={{ fontSize: '0.55rem' }}>{pa.author}</span>
                  <p style={{ fontSize: '0.8rem', fontFamily: 'var(--font-body)' }}>{pa.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 0.75rem',
            borderRadius: '4px',
            background: 'var(--color-paper)',
          }}>
            <span
              className="badge"
              style={{
                background: r.verdict.color,
                color: 'var(--color-paper)',
              }}
            >
              {r.verdict.label} ({r.score}/5)
            </span>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}>
              {r.verdict.note}
            </span>
          </div>
        </div>
      ))}

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button
          onClick={onPlayAgain}
          style={{
            background: 'var(--color-rust)',
            color: 'var(--color-paper)',
            border: 'none',
            padding: '0.6rem 1.5rem',
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
