import { useEffect, useRef } from 'react';
import type { InlineProvocation } from '../types';

interface ProvocationCardProps {
  provocation: InlineProvocation;
  isEngaged: boolean;
  onDismiss: () => void;
  onEngage: () => void;
}

export default function ProvocationCard({ provocation, isEngaged, onDismiss, onEngage }: ProvocationCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onDismiss]);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div
      ref={ref}
      tabIndex={-1}
      style={{
        margin: '0.5rem 0',
        padding: '0.75rem',
        borderLeft: '4px solid var(--color-rust)',
        background: 'rgba(244, 239, 228, 0.95)',
        borderRadius: '0 6px 6px 0',
        outline: 'none',
      }}
    >
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.9rem',
        fontStyle: 'italic',
        marginBottom: '0.75rem',
        color: 'var(--color-ink)',
      }}>
        {provocation.question}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={onDismiss} style={{ fontSize: '0.6rem', padding: '0.25rem 0.5rem' }}>
          Dismiss
        </button>
        {!isEngaged && (
          <button
            onClick={onEngage}
            style={{
              fontSize: '0.6rem',
              padding: '0.25rem 0.5rem',
              background: 'var(--color-rust)',
              color: 'var(--color-paper)',
              border: 'none',
            }}
          >
            I've thought about this
          </button>
        )}
        {isEngaged && (
          <span className="label" style={{ color: 'var(--color-success)', alignSelf: 'center' }}>
            Engaged
          </span>
        )}
      </div>
    </div>
  );
}
