import type { AppMode } from '../types';
import { isMockMode } from '../lib/supabase';

interface HeaderProps {
  mode: AppMode;
  onSetMode: (mode: AppMode) => void;
  onReset: () => void;
}

export default function Header({ mode, onSetMode, onReset }: HeaderProps) {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.75rem 1.5rem',
      borderBottom: '1px solid var(--color-border)',
      background: 'var(--color-paper)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--color-ink)',
        }}>
          Scaffold
        </h1>
        <nav style={{ display: 'flex', gap: '0.25rem' }}>
          <button
            onClick={() => onSetMode('study')}
            style={{
              background: mode === 'study' ? 'var(--color-ink)' : 'transparent',
              color: mode === 'study' ? 'var(--color-paper)' : 'var(--color-ink)',
              border: '1px solid var(--color-border)',
              borderRadius: '4px 0 0 4px',
            }}
          >
            Study
          </button>
          <button
            onClick={() => onSetMode('battle')}
            style={{
              background: mode === 'battle' ? 'var(--color-ink)' : 'transparent',
              color: mode === 'battle' ? 'var(--color-paper)' : 'var(--color-ink)',
              border: '1px solid var(--color-border)',
              borderRadius: '0 4px 4px 0',
            }}
          >
            Battle
          </button>
        </nav>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {isMockMode() && <span className="badge badge--mock">Mock Mode</span>}
        <button onClick={onReset} style={{ fontSize: '0.65rem', padding: '0.3rem 0.6rem' }}>
          Reset
        </button>
      </div>
    </header>
  );
}
