import type { Highlight, PinnedQuestion, InlineProvocation } from '../types';
import { MOCK_PROVOCATIONS } from '../services/mockData';

interface OutlinePanelProps {
  pinnedQuestions: PinnedQuestion[];
  highlights: Highlight[];
  engagedProvocations: string[];
  onUpdateNote: (id: string, note: string) => void;
  onEnterBattle: () => void;
}

const lensLabels: Record<string, { label: string; color: string }> = {
  watch: { label: 'Watch For', color: 'var(--color-lens-watch)' },
  prereq: { label: 'Prereq', color: 'var(--color-lens-prereq)' },
  misc: { label: 'Misconception', color: 'var(--color-lens-misc)' },
  explain: { label: 'Explain', color: 'var(--color-lens-explain)' },
};

export default function OutlinePanel({
  pinnedQuestions,
  highlights,
  engagedProvocations,
  onUpdateNote,
  onEnterBattle,
}: OutlinePanelProps) {
  const allProvocations: InlineProvocation[] = MOCK_PROVOCATIONS;

  return (
    <aside style={{
      width: 'var(--outline-width)',
      padding: '1rem',
      borderLeft: '1px solid var(--color-border)',
      background: 'var(--color-paper)',
      minHeight: '100%',
      overflowY: 'auto',
    }}>
      <p className="label" style={{ marginBottom: '1rem', fontSize: '0.7rem' }}>Your Outline</p>

      {/* Pinned Questions */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p className="label" style={{ marginBottom: '0.5rem' }}>Pinned Questions</p>
        {pinnedQuestions.length === 0 ? (
          <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>
            Pin a lens question to save it here.
          </p>
        ) : (
          pinnedQuestions.map((q) => (
            <div key={q.id} style={{ marginBottom: '0.5rem', fontSize: '0.8rem' }}>
              <span
                className="label"
                style={{
                  color: lensLabels[q.lensId]?.color || 'var(--color-muted)',
                  marginRight: '0.25rem',
                }}
              >
                {lensLabels[q.lensId]?.label}
              </span>
              <span style={{ fontFamily: 'var(--font-body)' }}>{q.text}</span>
            </div>
          ))
        )}
      </div>

      {/* Highlights */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p className="label" style={{ marginBottom: '0.5rem' }}>Highlights</p>
        {highlights.length === 0 ? (
          <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>
            Select text in the document to highlight it.
          </p>
        ) : (
          highlights.map((h) => (
            <div key={h.id} style={{ marginBottom: '0.5rem' }}>
              <p style={{
                fontSize: '0.8rem',
                fontFamily: 'var(--font-body)',
                fontStyle: 'italic',
                color: 'var(--color-ink)',
              }}>
                "{h.text}"
              </p>
              <input
                type="text"
                value={h.note}
                onChange={(e) => onUpdateNote(h.id, e.target.value)}
                placeholder="Add a note..."
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.4rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '3px',
                  width: '100%',
                  marginTop: '0.25rem',
                }}
              />
            </div>
          ))
        )}
      </div>

      {/* Engaged Provocations */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p className="label" style={{ marginBottom: '0.5rem' }}>Engaged Provocations</p>
        {engagedProvocations.length === 0 ? (
          <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>
            Click "I've thought about this" on a provocation.
          </p>
        ) : (
          engagedProvocations.map((provId) => {
            const prov = allProvocations.find((p) => p.id === provId);
            return prov ? (
              <div key={provId} style={{ marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--color-success)', marginRight: '0.25rem' }}>✓</span>
                <span style={{ fontFamily: 'var(--font-body)' }}>{prov.question}</span>
              </div>
            ) : null;
          })
        )}
      </div>

      <button
        onClick={onEnterBattle}
        style={{
          width: '100%',
          background: 'var(--color-rust)',
          color: 'var(--color-paper)',
          border: 'none',
          padding: '0.6rem',
          fontSize: '0.7rem',
        }}
      >
        Enter Battle →
      </button>
    </aside>
  );
}
