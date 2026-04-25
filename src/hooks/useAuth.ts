import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseReady } from '../lib/supabase';
import type { UserProfile } from '../types';

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseReady()) {
      setLoading(false);
      setError('Supabase not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
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
    if (!isSupabaseReady()) {
      setError('Supabase not configured.');
      return;
    }
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) setError(authError.message);
  }, []);

  const signUp = useCallback(async (email: string, password: string, displayName: string) => {
    setError(null);
    if (!isSupabaseReady()) {
      setError('Supabase not configured.');
      return;
    }
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        data: { display_name: displayName },
        emailRedirectTo: window.location.origin,
      },
    });
    if (authError) {
      setError(authError.message);
    } else if (data?.user && !data.session) {
      // Email confirmation required
      setError('Check your email for a confirmation link to complete sign-up.');
    }
  }, []);

  const signOut = useCallback(async () => {
    if (isSupabaseReady()) {
      await supabase.auth.signOut();
    }
    setUser(null);
  }, []);

  return { user, loading, error, signIn, signUp, signOut };
}
