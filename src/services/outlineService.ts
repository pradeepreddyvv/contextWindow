import { supabase, isMockMode } from '../lib/supabase';
import type { OutlineState } from '../types';

const DEFAULT_OUTLINE: OutlineState = {
  highlights: [],
  pinnedQuestions: [],
  engagedProvocations: [],
  explainText: '',
  explainRound: 0,
};

function localKey(userId: string, docId: string) {
  return `outline-${userId}-${docId}`;
}

let saveTimer: ReturnType<typeof setTimeout> | null = null;

export async function loadOutline(userId: string, docId: string): Promise<OutlineState> {
  // Mock mode or offline: use localStorage
  if (isMockMode() || !supabase) {
    return loadFromLocalStorage(userId, docId);
  }

  try {
    const { data, error } = await supabase
      .from('outlines')
      .select('*')
      .eq('user_id', userId)
      .eq('document_id', docId)
      .single();

    if (error || !data) return { ...DEFAULT_OUTLINE };

    return {
      highlights: data.highlights ?? [],
      pinnedQuestions: data.pinned_questions ?? [],
      engagedProvocations: data.engaged_provocations ?? [],
      explainText: data.explain_text ?? '',
      explainRound: data.explain_round ?? 0,
    };
  } catch (err) {
    console.warn('[outlineService] Supabase load failed, falling back to localStorage:', err);
    return loadFromLocalStorage(userId, docId);
  }
}

function loadFromLocalStorage(userId: string, docId: string): OutlineState {
  try {
    const raw = localStorage.getItem(localKey(userId, docId));
    return raw ? (JSON.parse(raw) as OutlineState) : { ...DEFAULT_OUTLINE };
  } catch (err) {
    console.warn('[outlineService] localStorage read failed:', err);
    return { ...DEFAULT_OUTLINE };
  }
}

export async function saveOutline(
  userId: string,
  docId: string,
  outline: OutlineState
): Promise<void> {
  // Debounce: cancel any pending save and schedule a new one
  if (saveTimer) clearTimeout(saveTimer);

  saveTimer = setTimeout(async () => {
    // Mock mode or offline: use localStorage
    if (isMockMode() || !supabase) {
      saveToLocalStorage(userId, docId, outline);
      return;
    }

    try {
      await supabase.from('outlines').upsert({
        user_id: userId,
        document_id: docId,
        highlights: outline.highlights,
        pinned_questions: outline.pinnedQuestions,
        engaged_provocations: outline.engagedProvocations,
        explain_text: outline.explainText,
        explain_round: outline.explainRound,
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('[outlineService] Supabase save failed, falling back to localStorage:', err);
      saveToLocalStorage(userId, docId, outline);
    }
  }, 300);
}

function saveToLocalStorage(userId: string, docId: string, outline: OutlineState): void {
  try {
    localStorage.setItem(localKey(userId, docId), JSON.stringify(outline));
  } catch (err) {
    console.warn('[outlineService] localStorage write failed:', err);
  }
}
