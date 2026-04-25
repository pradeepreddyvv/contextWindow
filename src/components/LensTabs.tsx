import type { LensType } from '../types';

interface LensTabsProps {
  activeLens: LensType;
  onSetLens: (lens: LensType) => void;
}

const LENSES: { id: LensType; label: string; color: string }[] = [
  { id: 'watch', label: 'What to Watch For', color: 'var(--color-lens-watch)' },
  { id: 'prereq', label: 'Prerequisite Check', color: 'var(--color-lens-prereq)' },
  { id: 'misc', label: 'Common Misconceptions', color: 'var(--color-lens-misc)' },
  { id: 'explain', label: 'Explain It Back', color: 'var(--color-lens-explain)' },
];

export default function LensTabs({ activeLens, onSetLens }: LensTabsProps) {
  return (
    <div
      role="tablist"
      style={{
        display: 'flex',
        gap: '0.25rem',
        padding: '0 0 0.75rem 0',
        borderBottom: '1px solid var(--color-border)',
        marginBottom: '1rem',
        flexWrap: 'wrap',
      }}
    >
      {LENSES.map((lens) => {
        const isActive = activeLens === lens.id;
        return (
          <button
            key={lens.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSetLens(lens.id)}
            style={{
              background: isActive ? lens.color : 'transparent',
              color: isActive ? 'var(--color-paper)' : lens.color,
              border: `1px solid ${lens.color}`,
              borderRadius: '4px',
              fontSize: '0.65rem',
              padding: '0.4rem 0.75rem',
              fontWeight: isActive ? 700 : 500,
            }}
          >
            {lens.label}
          </button>
        );
      })}
    </div>
  );
}
