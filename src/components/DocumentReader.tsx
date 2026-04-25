import { useState } from 'react';
import type { Document, InlineProvocation } from '../types';
import ProvocationCard from './ProvocationCard';

interface DocumentReaderProps {
  document: Document;
  engagedProvocations: string[];
  onEngage: (id: string) => void;
  onHighlight: (text: string) => void;
}

export default function DocumentReader({ document, engagedProvocations, onEngage, onHighlight: _onHighlight }: DocumentReaderProps) {
  const [openProv, setOpenProv] = useState<string | null>(null);

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
    <div style={{ maxWidth: 'var(--doc-max-width)', fontFamily: 'var(--font-body)', fontSize: '1rem' }}>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.75rem',
        marginBottom: '0.25rem',
      }}>
        {document.title}
      </h2>
      {document.subtitle && (
        <p style={{
          color: 'var(--color-muted)',
          fontSize: '0.9rem',
          marginBottom: '2rem',
        }}>
          {document.subtitle}
        </p>
      )}

      {document.sections.map((section, idx) => (
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
    </div>
  );
}
