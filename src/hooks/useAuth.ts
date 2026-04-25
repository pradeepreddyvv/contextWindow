import { useState, useEffect, useCallback } from 'react';
import { supabase, isMockMode } from '../lib/supabase';

interface AuthUser {
  id: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(isMockMode() ? { id: 'mock-user' } : null);
  const [loading, setLoading] = useState(!isMockMode());

  useEffect(() => {
    if (isMockMode() || !supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({ id: session.user.id });
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { id: session.user.id } : null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInAnonymously = useCallback(async () => {
    if (isMockMode() || !supabase) {
      setUser({ id: 'mock-user' });
      return;
    }
    await supabase.auth.signInAnonymously();
  }, []);

  const signOut = useCallback(async () => {
    if (!isMockMode() && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  }, []);

  return { user, loading, signInAnonymously, signOut };
}
