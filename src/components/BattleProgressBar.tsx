import type { BattlePhase } from '../types';

interface BattleProgressBarProps {
  phase: BattlePhase;
}

const STEPS = [
  { phase: 1 as const, label: 'Author' },
  { phase: 2 as const, label: 'Battle' },
  { phase: 3 as const, label: 'Reveal' },
];

export default function BattleProgressBar({ phase }: BattleProgressBarProps) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
      {STEPS.map((step, idx) => {
        const isActive = step.phase === phase;
        const isComplete = step.phase < phase;
        return (
          <div key={step.phase} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.35rem 0.75rem',
              borderRadius: '4px',
              background: isActive ? 'var(--color-rust)' : isComplete ? 'var(--color-success)' : 'var(--color-border)',
              color: isActive || isComplete ? 'var(--color-paper)' : 'var(--color-muted)',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>
              {isComplete ? '✓' : step.phase}
              <span>{step.label}</span>
            </div>
            {idx < STEPS.length - 1 && (
              <span style={{ color: 'var(--color-border)', fontSize: '0.8rem' }}>→</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
