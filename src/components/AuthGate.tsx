import { useState } from 'react';
import type { UserProfile } from '../types';

interface AuthGateProps {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, displayName: string) => Promise<void>;
  children: React.ReactNode;
}

export default function AuthGate({ user, loading, error, onSignIn, onSignUp, children }: AuthGateProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('pradeep@asu.edu');
  const [password, setPassword] = useState('123456');
  const [displayName, setDisplayName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'var(--font-ui)',
        fontSize: '0.75rem',
        color: 'var(--color-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        Loading...
      </div>
    );
  }

  if (user) {
    return <>{children}</>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    if (isSignUp) {
      await onSignUp(email, password, displayName || email.split('@')[0]);
    } else {
      await onSignIn(email, password);
    }
    setSubmitting(false);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'var(--color-paper)',
    }}>
      <div style={{
        width: '380px',
        padding: '2.5rem',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.5)',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.75rem',
          fontWeight: 700,
          color: 'var(--color-ink)',
          marginBottom: '0.25rem',
          textAlign: 'center',
        }}>
          ASK
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          color: 'var(--color-muted)',
          textAlign: 'center',
          marginBottom: '1.5rem',
        }}>
          {isSignUp ? 'Create your account' : 'Sign in to continue'}
        </p>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div style={{ marginBottom: '0.75rem' }}>
              <label className="label" style={{ display: 'block', marginBottom: '0.3rem' }}>
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Pradeep R."
                style={{
                  width: '100%',
                  padding: '0.6rem 0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  background: 'white',
                  color: 'var(--color-ink)',
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '0.75rem' }}>
            <label className="label" style={{ display: 'block', marginBottom: '0.3rem' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
              required
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                background: 'white',
                color: 'var(--color-ink)',
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label className="label" style={{ display: 'block', marginBottom: '0.3rem' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={4}
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                background: 'white',
                color: 'var(--color-ink)',
              }}
            />
          </div>

          {error && (
            <div style={{
              padding: '0.5rem 0.75rem',
              marginBottom: '0.75rem',
              borderLeft: '3px solid var(--color-error)',
              background: 'rgba(139,58,58,0.06)',
              borderRadius: '0 4px 4px 0',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--color-error)',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !email || !password}
            style={{
              width: '100%',
              background: 'var(--color-rust)',
              color: 'var(--color-paper)',
              border: 'none',
              padding: '0.65rem',
              fontSize: '0.8rem',
              marginBottom: '0.75rem',
            }}
          >
            {submitting ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-body)',
          color: 'var(--color-muted)',
        }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            onClick={() => { setIsSignUp(!isSignUp); }}
            style={{
              color: 'var(--color-rust)',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
}
