import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { isMockMode } from '../lib/supabase';

interface AuthGateProps {
  children: React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const { user, loading, signInAnonymously } = useAuth();

  useEffect(() => {
    if (!isMockMode() && !user && !loading) {
      signInAnonymously();
    }
  }, [user, loading, signInAnonymously]);

  // Mock Mode: render immediately
  if (isMockMode()) {
    return <>{children}</>;
  }

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

  return <>{children}</>;
}
