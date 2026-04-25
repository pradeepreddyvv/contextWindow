-- Scaffold (Provoke) — Initial Database Schema
-- Supabase project: kiro (awktgaehmdpgkubykdvn)

-- Documents table (hardcoded study texts, extensible later)
CREATE TABLE public.documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  sections jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Student outline entries (per user per document)
CREATE TABLE public.outlines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  document_id uuid REFERENCES public.documents(id),
  pinned_questions jsonb DEFAULT '[]'::jsonb,
  highlights jsonb DEFAULT '[]'::jsonb,
  engaged_provocations text[] DEFAULT ARRAY[]::text[],
  explain_text text DEFAULT '',
  explain_round int DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, document_id)
);

-- Battle sessions (per user per document)
CREATE TABLE public.battle_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  document_id uuid REFERENCES public.documents(id),
  phase int DEFAULT 1,
  accepted_questions jsonb DEFAULT '[]'::jsonb,
  answers jsonb DEFAULT '{}'::jsonb,
  results jsonb,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, document_id)
);

-- Row Level Security
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.battle_sessions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read documents" ON public.documents FOR SELECT USING (true);
CREATE POLICY "Users own their outlines" ON public.outlines FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their battles" ON public.battle_sessions FOR ALL USING (auth.uid() = user_id);
