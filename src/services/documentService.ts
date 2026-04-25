import { supabase } from '../lib/supabase';
import { DOCUMENT } from './mockData';
import type { Document } from '../types';

export async function getDocument(docId?: string): Promise<Document> {
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

/**
 * Validates that a document has the required structure.
 * Used for testing and data integrity checks.
 */
export function validateDocument(doc: Document): boolean {
  return !!(
    doc.id &&
    doc.title &&
    Array.isArray(doc.sections) &&
    doc.sections.length > 0 &&
    doc.sections.every(
      (s) =>
        s.heading &&
        s.body &&
        Array.isArray(s.provocations)
    )
  );
}
