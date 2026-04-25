import { useState } from 'react';
import { isValidRoomCode } from '../services/roomService';

interface RoomJoinProps {
  onJoin: (roomCode: string, displayName: string) => void;
  onCancel: () => void;
  loading: boolean;
  error: string | null;
  initialCode?: string;
}

export default function RoomJoin({ onJoin, onCancel, loading, error, initialCode }: RoomJoinProps) {
  const [roomCode, setRoomCode] = useState(initialCode ?? '');
  const [displayName, setDisplayName] = useState('');
  const [step, setStep] = useState<'code' | 'name'>(initialCode ? 'name' : 'code');

  const handleCodeSubmit = () => {
    const code = roomCode.toUpperCase().trim();
    if (isValidRoomCode(code)) {
      setRoomCode(code);
      setStep('name');
    }
  };

  const handleJoin = () => {
    if (displayName.trim().length > 0) {
      onJoin(roomCode, displayName.trim());
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '2rem',
      border: '1px solid var(--color-border)',
      borderRadius: '8px',
      background: 'var(--color-paper)',
      textAlign: 'center',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.5rem',
        marginBottom: '1.5rem',
        color: 'var(--color-ink)',
      }}>
        Join a Battle Room
      </h2>

      {step === 'code' && (
        <>
          <label style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-muted)',
            display: 'block',
            marginBottom: '0.5rem',
          }}>
            Room Code
          </label>
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase().slice(0, 4))}
            placeholder="ABCD"
            maxLength={4}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '2rem',
              fontFamily: 'var(--font-ui)',
              textAlign: 'center',
              letterSpacing: '0.5em',
              border: '2px solid var(--color-border)',
              borderRadius: '8px',
              boxSizing: 'border-box',
              textTransform: 'uppercase',
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleCodeSubmit()}
            autoFocus
          />
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button onClick={onCancel} style={{
              flex: 1, padding: '0.6rem', background: 'transparent',
              border: '1px solid var(--color-border)', borderRadius: '4px',
            }}>
              Cancel
            </button>
            <button
              onClick={handleCodeSubmit}
              disabled={!isValidRoomCode(roomCode.toUpperCase())}
              style={{
                flex: 1, padding: '0.6rem',
                background: isValidRoomCode(roomCode.toUpperCase()) ? 'var(--color-rust)' : 'var(--color-muted)',
                color: 'var(--color-paper)', border: 'none', borderRadius: '4px',
                cursor: isValidRoomCode(roomCode.toUpperCase()) ? 'pointer' : 'not-allowed',
              }}
            >
              Next
            </button>
          </div>
        </>
      )}

      {step === 'name' && (
        <>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-muted)',
            marginBottom: '0.25rem',
          }}>
            Room: {roomCode}
          </p>
          <label style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-muted)',
            display: 'block',
            marginBottom: '0.5rem',
            marginTop: '1rem',
          }}>
            Your Display Name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your name"
            maxLength={30}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1.1rem',
              fontFamily: 'var(--font-body)',
              textAlign: 'center',
              border: '2px solid var(--color-border)',
              borderRadius: '8px',
              boxSizing: 'border-box',
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
            autoFocus
          />

          {error && (
            <p style={{
              color: 'var(--color-error)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              marginTop: '0.75rem',
            }}>
              {error}
            </p>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button onClick={() => setStep('code')} style={{
              flex: 1, padding: '0.6rem', background: 'transparent',
              border: '1px solid var(--color-border)', borderRadius: '4px',
            }}>
              Back
            </button>
            <button
              onClick={handleJoin}
              disabled={loading || displayName.trim().length === 0}
              style={{
                flex: 1, padding: '0.6rem',
                background: loading || !displayName.trim() ? 'var(--color-muted)' : 'var(--color-rust)',
                color: 'var(--color-paper)', border: 'none', borderRadius: '4px',
                cursor: loading || !displayName.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Joining...' : 'Join Battle'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
