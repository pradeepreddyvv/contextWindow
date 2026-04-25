import type { Highlight } from '../types';

interface HighlightsProps {
  highlights: Highlight[];
  onUpdateNote: (id: string, note: string) => void;
}

export default function Highlights({ highlights, onUpdateNote }: HighlightsProps) {
  if (highlights.length === 0) {
    return (
      <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>
        Select text in the document to highlight it.
      </p>
    );
  }

  return (
    <div>
      {highlights.map((h) => (
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
      ))}
    </div>
  );
}
