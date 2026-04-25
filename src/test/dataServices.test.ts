import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getDocument } from '../services/documentService';
import { loadOutline, saveOutline } from '../services/outlineService';
import { loadBattle, saveBattle } from '../services/battleService';
import type { OutlineState, BattleState } from '../types';

// All tests run in Mock Mode (no Supabase env vars in test environment)

// Provide a real localStorage-like store for jsdom environments that lack .clear()
function makeLocalStorageMock() {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
    get length() { return Object.keys(store).length; },
    key: (i: number) => Object.keys(store)[i] ?? null,
  };
}

const localStorageMock = makeLocalStorageMock();
vi.stubGlobal('localStorage', localStorageMock);

describe('documentService (mock mode)', () => {
  it('returns a document', async () => {
    const doc = await getDocument();
    expect(doc).toBeDefined();
    expect(doc.title).toBeTruthy();
  });

  it('returns a document with exactly 3 sections', async () => {
    const doc = await getDocument();
    expect(doc.sections).toHaveLength(3);
  });

  it('each section has a heading, body, and provocations', async () => {
    const doc = await getDocument();
    for (const section of doc.sections) {
      expect(section.heading).toBeTruthy();
      expect(section.body).toBeTruthy();
      expect(Array.isArray(section.provocations)).toBe(true);
    }
  });

  it('returns same document regardless of docId in mock mode', async () => {
    const doc1 = await getDocument();
    const doc2 = await getDocument('some-other-id');
    expect(doc1.id).toBe(doc2.id);
  });
});

describe('outlineService (mock mode — localStorage)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns default outline when nothing saved', async () => {
    const outline = await loadOutline('user-1', 'doc-1');
    expect(outline.highlights).toEqual([]);
    expect(outline.pinnedQuestions).toEqual([]);
    expect(outline.engagedProvocations).toEqual([]);
    expect(outline.explainText).toBe('');
    expect(outline.explainRound).toBe(0);
  });

  it('save/load round-trip preserves data', async () => {
    const outline: OutlineState = {
      highlights: [{ id: 'h1', text: 'some phrase', note: 'my note' }],
      pinnedQuestions: [{ id: 'pq1', lensId: 'watch', text: 'Why does this matter?' }],
      engagedProvocations: ['prov-1a'],
      explainText: 'useEffect runs after render',
      explainRound: 2,
    };

    await saveOutline('user-1', 'doc-1', outline);

    // Wait for debounce
    await new Promise((r) => setTimeout(r, 400));

    const loaded = await loadOutline('user-1', 'doc-1');
    expect(loaded.highlights).toEqual(outline.highlights);
    expect(loaded.pinnedQuestions).toEqual(outline.pinnedQuestions);
    expect(loaded.engagedProvocations).toEqual(outline.engagedProvocations);
    expect(loaded.explainText).toBe(outline.explainText);
    expect(loaded.explainRound).toBe(outline.explainRound);
  });

  it('different userId/docId combinations are isolated', async () => {
    const outline1: OutlineState = {
      highlights: [{ id: 'h1', text: 'phrase A', note: '' }],
      pinnedQuestions: [],
      engagedProvocations: [],
      explainText: '',
      explainRound: 0,
    };

    await saveOutline('user-1', 'doc-1', outline1);
    await new Promise((r) => setTimeout(r, 400));

    const loaded2 = await loadOutline('user-2', 'doc-1');
    expect(loaded2.highlights).toEqual([]);
  });
});

describe('battleService (mock mode — localStorage)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns null when no battle saved', async () => {
    const battle = await loadBattle('user-1', 'doc-1');
    expect(battle).toBeNull();
  });

  it('save/load round-trip preserves data', async () => {
    const battle: BattleState = {
      phase: 2,
      acceptedQuestions: [
        { text: 'Why does cleanup matter?', author: 'You' },
        { text: 'How does Strict Mode expose bugs?', author: 'You' },
        { text: 'What happens if dependencies are objects?', author: 'You' },
      ],
      answers: { 0: 'Because it prevents memory leaks.', 1: 'It double-invokes effects.' },
      results: null,
    };

    await saveBattle('user-1', 'doc-1', battle);

    const loaded = await loadBattle('user-1', 'doc-1');
    expect(loaded).not.toBeNull();
    expect(loaded!.phase).toBe(2);
    expect(loaded!.acceptedQuestions).toHaveLength(3);
    expect(loaded!.answers[0]).toBe('Because it prevents memory leaks.');
  });

  it('overwrites previous save on second save', async () => {
    const battle1: BattleState = {
      phase: 1,
      acceptedQuestions: [],
      answers: {},
      results: null,
    };
    const battle2: BattleState = {
      phase: 3,
      acceptedQuestions: [{ text: 'Why?', author: 'You' }],
      answers: { 0: 'Because...' },
      results: null,
    };

    await saveBattle('user-1', 'doc-1', battle1);
    await saveBattle('user-1', 'doc-1', battle2);

    const loaded = await loadBattle('user-1', 'doc-1');
    expect(loaded!.phase).toBe(3);
  });
});
