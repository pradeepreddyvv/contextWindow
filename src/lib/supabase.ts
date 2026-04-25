import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let _supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  _supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = _supabase as SupabaseClient;

export function isSupabaseReady(): boolean {
  return _supabase !== null;
}
