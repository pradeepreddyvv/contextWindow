-- Battle Rooms — Multiplayer schema
-- Adds battle_rooms and battle_room_participants tables

-- Battle rooms table
CREATE TABLE public.battle_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id uuid REFERENCES auth.users(id) NOT NULL,
  document_id uuid REFERENCES public.documents(id),
  room_code text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'lobby'
    CHECK (status IN ('lobby', 'battle', 'reveal', 'abandoned', 'expired')),
  question_count int NOT NULL DEFAULT 3
    CHECK (question_count IN (3, 5, 7)),
  questions jsonb DEFAULT '[]'::jsonb,
  topic text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Room code format constraint: 4 chars, uppercase letters (no I/O) + digits (no 0/1)
ALTER TABLE public.battle_rooms
  ADD CONSTRAINT battle_rooms_code_format
  CHECK (
    char_length(room_code) = 4
    AND room_code ~ '^[ABCDEFGHJKLMNPQRSTUVWXYZ2345679]{4}$'
  );

-- Index for fast room code lookup
CREATE INDEX idx_battle_rooms_room_code ON public.battle_rooms (room_code);

-- Battle room participants table
CREATE TABLE public.battle_room_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES public.battle_rooms(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  display_name text NOT NULL DEFAULT 'Anonymous',
  answers jsonb DEFAULT '{}'::jsonb,
  results jsonb,
  submitted_at timestamptz,
  joined_at timestamptz DEFAULT now(),
  kicked boolean DEFAULT false,
  UNIQUE(room_id, user_id)
);

-- Row Level Security
ALTER TABLE public.battle_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.battle_room_participants ENABLE ROW LEVEL SECURITY;

-- Policies for battle_rooms
CREATE POLICY "Anyone can read active rooms"
  ON public.battle_rooms FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create rooms"
  ON public.battle_rooms FOR INSERT
  WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Host can update their rooms"
  ON public.battle_rooms FOR UPDATE
  USING (auth.uid() = host_id);

-- Policies for battle_room_participants
CREATE POLICY "Participants can read room participants"
  ON public.battle_room_participants FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.battle_room_participants p
      WHERE p.room_id = battle_room_participants.room_id
        AND p.user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM public.battle_rooms r
      WHERE r.id = battle_room_participants.room_id
        AND r.host_id = auth.uid()
    )
  );

CREATE POLICY "Users can join rooms"
  ON public.battle_room_participants FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own participation"
  ON public.battle_room_participants FOR UPDATE
  USING (auth.uid() = user_id);

-- Host can update any participant (for kicking)
CREATE POLICY "Host can update participants"
  ON public.battle_room_participants FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.battle_rooms r
      WHERE r.id = battle_room_participants.room_id
        AND r.host_id = auth.uid()
    )
  );
