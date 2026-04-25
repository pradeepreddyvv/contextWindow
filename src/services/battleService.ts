import { supabase, isMockMode } from '../lib/supabase';
import type { BattleState } from '../types';

function localKey(userId: string, docId: string) {
  return `battle-${userId}-${docId}`;
}

export async function loadBattle(userId: string, docId: string): Promise<BattleState | null> {
  if (isMockMode() || !supabase) {
    try {
      const raw = localStorage.getItem(localKey(userId, docId));
      return raw ? (JSON.parse(raw) as BattleState) : null;
    } catch {
      return null;
    }
  }

  try {
    const { data, error } = await supabase
      .from('battle_sessions')
      .select('*')
      .eq('user_id', userId)
      .eq('document_id', docId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) return null;

    return {
      phase: data.phase ?? 1,
      acceptedQuestions: data.accepted_questions ?? [],
      answers: data.answers ?? {},
      results: data.results ?? null,
    };
  } catch {
    return null;
  }
}

export async function saveBattle(
  userId: string,
  docId: string,
  battle: BattleState
): Promise<void> {
  if (isMockMode() || !supabase) {
    try {
      localStorage.setItem(localKey(userId, docId), JSON.stringify(battle));
    } catch {
      // localStorage unavailable — continue in-memory
    }
    return;
  }

  try {
    await supabase.from('battle_sessions').upsert({
      user_id: userId,
      document_id: docId,
      phase: battle.phase,
      accepted_questions: battle.acceptedQuestions,
      answers: battle.answers,
      results: battle.results,
    });
  } catch (err) {
    console.warn('[battleService] Save failed:', err);
  }
}
