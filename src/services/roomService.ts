import { supabase, isSupabaseReady } from '../lib/supabase';
import type { BattleRoom, BattleRoomParticipant, BattleRoomQuestion, ParticipantResult } from '../types';
import type { RealtimeChannel } from '@supabase/supabase-js';

// Valid room code characters: A-Z (no I, O) + 2-9 (no 0, 1)
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ2345679';

export function generateRoomCode(): string {
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

export function isValidRoomCode(code: string): boolean {
  return /^[ABCDEFGHJKLMNPQRSTUVWXYZ2345679]{4}$/.test(code);
}

// ── Room CRUD ──

export async function createRoom(
  hostId: string,
  documentId: string | null,
  questionCount: number,
  topic: string
): Promise<BattleRoom> {
  if (!isSupabaseReady() || !supabase) {
    throw new Error('Battle Rooms require Supabase. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }

  // Generate unique room code with retry
  let roomCode = generateRoomCode();
  let attempts = 0;
  while (attempts < 10) {
    const { data: existing } = await supabase
      .from('battle_rooms')
      .select('id')
      .eq('room_code', roomCode)
      .maybeSingle();
    if (!existing) break;
    roomCode = generateRoomCode();
    attempts++;
  }

  const { data, error } = await supabase
    .from('battle_rooms')
    .insert({
      host_id: hostId,
      document_id: documentId,
      room_code: roomCode,
      status: 'lobby',
      question_count: questionCount,
      topic,
    })
    .select()
    .single();

  if (error || !data) throw new Error(error?.message ?? 'Failed to create room');

  return mapRoom(data);
}

export async function findRoomByCode(roomCode: string): Promise<BattleRoom | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('battle_rooms')
    .select('*')
    .eq('room_code', roomCode.toUpperCase())
    .maybeSingle();

  if (error || !data) return null;
  return mapRoom(data);
}

export async function joinRoom(
  roomCode: string,
  userId: string,
  displayName: string
): Promise<{ room: BattleRoom; participant: BattleRoomParticipant }> {
  if (!supabase) {
    throw new Error('Battle Rooms require Supabase.');
  }

  const room = await findRoomByCode(roomCode);
  if (!room) throw new Error('Room not found. Check the code and try again.');
  if (room.status !== 'lobby') throw new Error('This battle has already started.');

  // Check participant count
  const { count } = await supabase
    .from('battle_room_participants')
    .select('*', { count: 'exact', head: true })
    .eq('room_id', room.id)
    .eq('kicked', false);

  if ((count ?? 0) >= 50) throw new Error('This room is full.');

  // Upsert participant (handles rejoin)
  const { data, error } = await supabase
    .from('battle_room_participants')
    .upsert({
      room_id: room.id,
      user_id: userId,
      display_name: displayName,
      kicked: false,
    }, { onConflict: 'room_id,user_id' })
    .select()
    .single();

  if (error || !data) throw new Error(error?.message ?? 'Failed to join room');

  return { room, participant: mapParticipant(data) };
}

export async function kickPlayer(roomId: string, participantUserId: string): Promise<void> {
  if (!supabase) return;

  await supabase
    .from('battle_room_participants')
    .update({ kicked: true })
    .eq('room_id', roomId)
    .eq('user_id', participantUserId);
}

export async function getParticipants(roomId: string): Promise<BattleRoomParticipant[]> {
  if (!supabase) return [];

  const { data } = await supabase
    .from('battle_room_participants')
    .select('*')
    .eq('room_id', roomId)
    .eq('kicked', false)
    .order('joined_at', { ascending: true });

  return (data ?? []).map(mapParticipant);
}

export async function updateRoomStatus(
  roomId: string,
  status: 'lobby' | 'battle' | 'reveal' | 'abandoned'
): Promise<void> {
  if (!supabase) return;

  await supabase
    .from('battle_rooms')
    .update({ status })
    .eq('id', roomId);
}

export async function setRoomQuestions(
  roomId: string,
  questions: BattleRoomQuestion[]
): Promise<void> {
  if (!supabase) return;

  await supabase
    .from('battle_rooms')
    .update({ questions, status: 'battle' })
    .eq('id', roomId);
}

export async function submitAnswers(
  participantId: string,
  answers: Record<number, string>
): Promise<void> {
  if (!supabase) return;

  await supabase
    .from('battle_room_participants')
    .update({ answers, submitted_at: new Date().toISOString() })
    .eq('id', participantId);
}

export async function saveParticipantResults(
  participantId: string,
  results: ParticipantResult[]
): Promise<void> {
  if (!supabase) return;

  await supabase
    .from('battle_room_participants')
    .update({ results })
    .eq('id', participantId);
}

// ── Supabase Realtime ──

export function subscribeToRoom(
  roomCode: string,
  callbacks: {
    onLobbyUpdate?: (participants: BattleRoomParticipant[]) => void;
    onGameStart?: (questions: BattleRoomQuestion[], timerMs: number) => void;
    onGameTick?: (remainingMs: number) => void;
    onPlayerProgress?: (userId: string, questionIdx: number) => void;
    onGameEnd?: (results: Map<string, ParticipantResult[]>) => void;
    onPresenceSync?: (online: string[]) => void;
    onKicked?: (userId: string) => void;
    onRoomClosed?: () => void;
  }
): RealtimeChannel | null {
  if (!supabase) return null;

  const channel = supabase.channel(`room:${roomCode}`, {
    config: { presence: { key: 'user_id' } },
  });

  channel
    .on('broadcast', { event: 'lobby:update' }, ({ payload }) => {
      callbacks.onLobbyUpdate?.(
        (payload.participants ?? []).map(mapParticipant)
      );
    })
    .on('broadcast', { event: 'game:start' }, ({ payload }) => {
      callbacks.onGameStart?.(payload.questions ?? [], payload.timerMs ?? 120000);
    })
    .on('broadcast', { event: 'game:tick' }, ({ payload }) => {
      callbacks.onGameTick?.(payload.remainingMs ?? 0);
    })
    .on('broadcast', { event: 'player:progress' }, ({ payload }) => {
      callbacks.onPlayerProgress?.(payload.userId, payload.questionIdx);
    })
    .on('broadcast', { event: 'game:end' }, ({ payload }) => {
      const resultsMap = new Map<string, ParticipantResult[]>();
      if (payload.results) {
        for (const [userId, res] of Object.entries(payload.results)) {
          resultsMap.set(userId, res as ParticipantResult[]);
        }
      }
      callbacks.onGameEnd?.(resultsMap);
    })
    .on('broadcast', { event: 'player:kicked' }, ({ payload }) => {
      callbacks.onKicked?.(payload.userId);
    })
    .on('broadcast', { event: 'room:closed' }, () => {
      callbacks.onRoomClosed?.();
    })
    .on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState();
      const online = Object.keys(state);
      callbacks.onPresenceSync?.(online);
    });

  channel.subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await channel.track({ online_at: new Date().toISOString() });
    }
  });

  return channel;
}

export function broadcastToRoom(
  channel: RealtimeChannel,
  event: string,
  payload: Record<string, unknown>
): void {
  channel.send({ type: 'broadcast', event, payload });
}

export function unsubscribeFromRoom(channel: RealtimeChannel | null): void {
  if (channel) {
    channel.untrack();
    channel.unsubscribe();
  }
}

// ── Mappers ──

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRoom(row: any): BattleRoom {
  return {
    id: row.id,
    hostId: row.host_id,
    documentId: row.document_id,
    roomCode: row.room_code,
    status: row.status,
    questionCount: row.question_count,
    questions: row.questions ?? [],
    topic: row.topic ?? '',
    createdAt: row.created_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapParticipant(row: any): BattleRoomParticipant {
  return {
    id: row.id,
    roomId: row.room_id,
    userId: row.user_id,
    displayName: row.display_name,
    answers: row.answers ?? {},
    results: row.results ?? null,
    submittedAt: row.submitted_at,
    joinedAt: row.joined_at,
    kicked: row.kicked ?? false,
  };
}
