import { supabase, isMockMode } from '../lib/supabase';
import { DOCUMENT } from './mockData';
import type { Document } from '../types';

export async function getDocument(docId?: string): Promise<Document> {
  if (isMockMode() || !supabase) {
    return DOCUMENT;
  }

  try {
    const query = supabase.from('documents').select('*');
    const { data, error } = docId
      ? await query.eq('id', docId).single()
      : await query.limit(1).single();

    if (error || !data) {
      console.warn('[documentService] Supabase fetch failed, falling back to mock:', error?.message);
      return DOCUMENT;
    }

    return {
      id: data.id,
      title: data.title,
      subtitle: data.subtitle ?? '',
      sections: data.sections,
    };
  } catch (err) {
    console.warn('[documentService] Unexpected error, falling back to mock:', err);
    return DOCUMENT;
  }
}
