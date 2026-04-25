import { useCallback, useEffect, useRef, useState } from 'react';
import type { Document, InlineProvocation } from '../types';
import ProvocationCard from './ProvocationCard';

interface DocumentReaderProps {
  document: Document;
  engagedProvocations: string[];
  onEngage: (id: string) => void;
  onHighlight: (text: string, note: string) => void;
}

interface SelectionPopover {
  text: string;
  x: number;
  y: number;
}

export default function DocumentReader({ document: doc, engagedProvocations, onEngage, onHighlight }: DocumentReaderProps) {
  const [openProv, setOpenProv] = useState<string | null>(null);
  const [selection, setSelection] = useState<SelectionPopover | null>(null);
  const [noteText, setNoteText] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const readerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleMouseUp = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.toString().trim()) {
      return;
    }

    const text = sel.toString().trim();
    if (text.length < 3) return;

    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const readerRect = readerRef.current?.getBoundingClientRect();
    if (!readerRect) return;

    setSelection({
      text,
      x: rect.left - readerRect.left + rect.width / 2,
      y: rect.top - readerRect.top - 8,
    });
    setShowNoteInput(false);
    setNoteText('');
  }, []);

  const handleSaveNote = useCallback(() => {
    if (!selection) return;
    onHighlight(selection.text, noteText);
    setSelection(null);
    setNoteText('');
    setShowNoteInput(false);
    window.getSelection()?.removeAllRanges();
  }, [selection, noteText, onHighlight]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setSelection(null);
        setShowNoteInput(false);
        setNoteText('');
      }
    };
    globalThis.document.addEventListener('mousedown', handleClickOutside);
    return () => globalThis.document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderTextWithProvocations = (body: string, provocations: InlineProvocation[]) => {
    if (provocations.length === 0) {
      return <p style={{ marginBottom: '1rem' }}>{body}</p>;
    }

    const parts: React.ReactNode[] = [];
    let remaining = body;
    let keyIdx = 0;

    const sorted = [...provocations].sort((a, b) => {
      const idxA = remaining.indexOf(a.phraseText);
      const idxB = remaining.indexOf(b.phraseText);
      return idxA - idxB;
    });

    for (const prov of sorted) {
      const idx = remaining.indexOf(prov.phraseText);
      if (idx === -1) continue;

      if (idx > 0) {
        parts.push(<span key={keyIdx++}>{remaining.slice(0, idx)}</span>);
      }

      const isEngaged = engagedProvocations.includes(prov.id);

      parts.push(
        <span key={keyIdx++}>
          <span
            onClick={() => setOpenProv(openProv === prov.id ? null : prov.id)}
            style={{
              textDecoration: 'underline',
              textDecorationColor: 'var(--color-rust)',
              textDecorationStyle: 'wavy',
              cursor: 'pointer',
              background: isEngaged ? 'rgba(45, 106, 79, 0.1)' : 'rgba(181, 74, 30, 0.08)',
              borderRadius: '2px',
              padding: '0 2px',
              position: 'relative',
            }}
          >
            <span style={{
              fontSize: '0.7rem',
              color: isEngaged ? 'var(--color-success)' : 'var(--color-rust)',
              marginRight: '2px',
              fontWeight: 700,
            }}>
              {isEngaged ? '✓' : '¿'}
            </span>
            {prov.phraseText}
          </span>
          {openProv === prov.id && (
            <ProvocationCard
              provocation={prov}
              isEngaged={isEngaged}
              onDismiss={() => setOpenProv(null)}
              onEngage={() => {
                onEngage(prov.id);
                setOpenProv(null);
              }}
            />
          )}
        </span>
      );

      remaining = remaining.slice(idx + prov.phraseText.length);
    }

    if (remaining) {
      parts.push(<span key={keyIdx++}>{remaining}</span>);
    }

    return <p style={{ marginBottom: '1rem', lineHeight: 1.8 }}>{parts}</p>;
  };

  return (
    <div
      ref={readerRef}
      onMouseUp={handleMouseUp}
      style={{ maxWidth: 'var(--doc-max-width)', fontFamily: 'var(--font-body)', fontSize: '1rem', position: 'relative' }}
    >
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.75rem',
        marginBottom: '0.25rem',
      }}>
        {doc.title}
      </h2>
      {doc.subtitle && (
        <p style={{
          color: 'var(--color-muted)',
          fontSize: '0.9rem',
          marginBottom: '2rem',
        }}>
          {doc.subtitle}
        </p>
      )}

      {doc.sections.map((section, idx) => (
        <section key={idx} style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            marginBottom: '0.75rem',
            color: 'var(--color-ink)',
          }}>
            {section.heading}
          </h3>
          {section.body.split('\n\n').map((paragraph, pIdx) => (
            <div key={pIdx}>
              {renderTextWithProvocations(
                paragraph,
                section.provocations.filter(() => true)
              )}
            </div>
          ))}
        </section>
      ))}

      {selection && (
        <div
          ref={popoverRef}
          style={{
            position: 'absolute',
            left: `${selection.x}px`,
            top: `${selection.y}px`,
            transform: 'translate(-50%, -100%)',
            background: 'var(--color-ink)',
            color: 'var(--color-paper)',
            borderRadius: '6px',
            padding: showNoteInput ? '0.5rem' : '0',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            zIndex: 50,
            minWidth: showNoteInput ? '240px' : 'auto',
          }}
        >
          {!showNoteInput ? (
            <div style={{ display: 'flex', gap: '2px' }}>
              <button
                onClick={() => setShowNoteInput(true)}
                style={{
                  background: 'transparent',
                  color: 'var(--color-paper)',
                  border: 'none',
                  padding: '0.4rem 0.65rem',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-ui)',
                  whiteSpace: 'nowrap',
                }}
              >
                + Add Note
              </button>
              <button
                onClick={() => {
                  onHighlight(selection.text, '');
                  setSelection(null);
                  window.getSelection()?.removeAllRanges();
                }}
                style={{
                  background: 'transparent',
                  color: 'var(--color-paper)',
                  border: 'none',
                  borderLeft: '1px solid rgba(255,255,255,0.2)',
                  padding: '0.4rem 0.65rem',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-ui)',
                  whiteSpace: 'nowrap',
                }}
              >
                Highlight
              </button>
            </div>
          ) : (
            <div>
              <p style={{
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '0.35rem',
                fontFamily: 'var(--font-ui)',
                maxWidth: '220px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                &ldquo;{selection.text.slice(0, 40)}{selection.text.length > 40 ? '...' : ''}&rdquo;
              </p>
              <textarea
                autoFocus
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write your note..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSaveNote();
                  }
                }}
                style={{
                  width: '100%',
                  padding: '0.35rem 0.4rem',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-body)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '4px',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'var(--color-paper)',
                  resize: 'vertical',
                  minHeight: '48px',
                  boxSizing: 'border-box',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.35rem', marginTop: '0.35rem' }}>
                <button
                  onClick={() => { setShowNoteInput(false); setNoteText(''); }}
                  style={{
                    background: 'transparent',
                    color: 'rgba(255,255,255,0.6)',
                    border: 'none',
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNote}
                  style={{
                    background: 'var(--color-rust)',
                    color: 'var(--color-paper)',
                    border: 'none',
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.7rem',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
