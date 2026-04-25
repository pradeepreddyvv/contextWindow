import type { AppMode } from '../types';

interface HeaderProps {
  mode: AppMode;
  userName: string;
  onSetMode: (mode: AppMode) => void;
  onSignOut: () => void;
  onReset: () => void;
}

export default function Header({ mode, userName, onSetMode, onSignOut, onReset }: HeaderProps) {
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
          ASK
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
        {userName && (
          <span style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.7rem',
            color: 'var(--color-ink)',
            letterSpacing: '0.03em',
          }}>
            {userName}
          </span>
        )}
        <button onClick={onReset} style={{ fontSize: '0.65rem', padding: '0.3rem 0.6rem' }}>
          Reset
        </button>
        <button
          onClick={onSignOut}
          style={{
            fontSize: '0.65rem',
            padding: '0.3rem 0.6rem',
            background: 'transparent',
            color: 'var(--color-muted)',
          }}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
