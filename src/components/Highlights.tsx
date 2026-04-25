import { useState } from 'react';
import type { Highlight } from '../types';

interface HighlightsProps {
  highlights: Highlight[];
  onUpdateNote: (id: string, note: string) => void;
}

export default function Highlights({ highlights, onUpdateNote }: HighlightsProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

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
        <div key={h.id} style={{
          marginBottom: '0.6rem',
          padding: '0.5rem',
          borderLeft: '3px solid var(--color-rust)',
          background: 'rgba(181, 74, 30, 0.04)',
          borderRadius: '0 4px 4px 0',
        }}>
          <p style={{
            fontSize: '0.78rem',
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            color: 'var(--color-ink)',
            lineHeight: 1.4,
            margin: 0,
          }}>
            &ldquo;{h.text.length > 80 ? h.text.slice(0, 80) + '...' : h.text}&rdquo;
          </p>

          {editingId === h.id ? (
            <div style={{ marginTop: '0.3rem' }}>
              <textarea
                autoFocus
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    onUpdateNote(h.id, editText);
                    setEditingId(null);
                  }
                  if (e.key === 'Escape') setEditingId(null);
                }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  padding: '0.3rem 0.4rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '3px',
                  width: '100%',
                  minHeight: '40px',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                }}
              />
              <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.2rem' }}>
                <button
                  onClick={() => setEditingId(null)}
                  style={{
                    fontSize: '0.65rem',
                    padding: '0.15rem 0.4rem',
                    background: 'transparent',
                    border: '1px solid var(--color-border)',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    color: 'var(--color-muted)',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onUpdateNote(h.id, editText);
                    setEditingId(null);
                  }}
                  style={{
                    fontSize: '0.65rem',
                    padding: '0.15rem 0.4rem',
                    background: 'var(--color-ink)',
                    color: 'var(--color-paper)',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => {
                setEditingId(h.id);
                setEditText(h.note);
              }}
              style={{
                marginTop: '0.25rem',
                fontSize: '0.73rem',
                fontFamily: 'var(--font-body)',
                color: h.note ? 'var(--color-ink)' : 'var(--color-muted)',
                cursor: 'pointer',
                lineHeight: 1.4,
              }}
            >
              {h.note || 'Click to add a note...'}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
