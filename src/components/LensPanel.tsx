import { useState, useEffect } from 'react';
import type { LensType, PinnedQuestion } from '../types';
import { generateLensQuestions } from '../services/lensService';

interface LensPanelProps {
  activeLens: Exclude<LensType, 'explain'>;
  documentText: string;
  onPin: (q: PinnedQuestion) => void;
  pinnedIds: string[];
}

export default function LensPanel({ activeLens, documentText, onPin, pinnedIds }: LensPanelProps) {
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    generateLensQuestions(documentText, activeLens).then((qs) => {
      if (!cancelled) {
        setQuestions(qs);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [activeLens, documentText]);

  const lensColors: Record<string, string> = {
    watch: 'var(--color-lens-watch)',
    prereq: 'var(--color-lens-prereq)',
    misc: 'var(--color-lens-misc)',
  };

  if (loading) {
    return <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-ui)', fontSize: '0.7rem' }}>Loading questions...</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
      {questions.map((q, i) => {
        const qId = `${activeLens}-${i}`;
        const isPinned = pinnedIds.includes(qId);
        return (
          <div
            key={qId}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '0.75rem',
              padding: '0.5rem 0.75rem',
              borderLeft: `3px solid ${lensColors[activeLens] || 'var(--color-border)'}`,
              background: 'rgba(255,255,255,0.5)',
              borderRadius: '0 4px 4px 0',
            }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', flex: 1 }}>{q}</p>
            <button
              disabled={isPinned}
              onClick={() =>
                onPin({ id: qId, lensId: activeLens, text: q })
              }
              style={{
                fontSize: '0.6rem',
                padding: '0.25rem 0.5rem',
                whiteSpace: 'nowrap',
                background: isPinned ? 'var(--color-muted)' : undefined,
                color: isPinned ? 'var(--color-paper)' : undefined,
              }}
            >
              {isPinned ? 'Pinned' : 'Pin'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
