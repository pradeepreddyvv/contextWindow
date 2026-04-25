import { useState, useEffect, useCallback } from 'react';
import { supabase, isMockMode } from '../lib/supabase';
import type { UserProfile } from '../types';

const MOCK_USERS: UserProfile[] = [
  { id: 'user-pradeep', email: 'pradeep@scaffold.dev', displayName: 'Pradeep R.' },
  { id: 'user-alex', email: 'alex@scaffold.dev', displayName: 'Alex M.' },
  { id: 'user-sam', email: 'sam@scaffold.dev', displayName: 'Sam K.' },
];

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(!isMockMode());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isMockMode() || !supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          displayName: session.user.user_metadata?.display_name ?? session.user.email?.split('@')[0] ?? 'Student',
        });
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          displayName: session.user.user_metadata?.display_name ?? session.user.email?.split('@')[0] ?? 'Student',
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    if (isMockMode() || !supabase) {
      const found = MOCK_USERS.find((u) => u.email === email);
      if (found && password.length >= 4) {
        setUser(found);
        return;
      }
      if (password.length >= 4) {
        const name = email.split('@')[0];
        setUser({ id: `user-${name}`, email, displayName: name.charAt(0).toUpperCase() + name.slice(1) });
        return;
      }
      setError('Invalid credentials. Use any email with 4+ character password.');
      return;
    }
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) setError(authError.message);
  }, []);

  const signUp = useCallback(async (email: string, password: string, displayName: string) => {
    setError(null);
    if (isMockMode() || !supabase) {
      setUser({ id: `user-${Date.now()}`, email, displayName });
      return;
    }
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    });
    if (authError) setError(authError.message);
  }, []);

  const signOut = useCallback(async () => {
    if (!isMockMode() && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  }, []);

  return { user, loading, error, signIn, signUp, signOut };
}
