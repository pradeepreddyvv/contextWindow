import { useState } from 'react';
import type { Document } from '../types';

interface RoomCreationProps {
  document: Document;
  onCreateRoom: (documentId: string, questionCount: number, topic: string) => void;
  onCancel: () => void;
  loading: boolean;
  error: string | null;
}

export default function RoomCreation({ document, onCreateRoom, onCancel, loading, error }: RoomCreationProps) {
  const [questionCount, setQuestionCount] = useState<number>(3);
  const [topic, setTopic] = useState(document.title);

  return (
    <div style={{
      maxWidth: '500px',
      margin: '2rem auto',
      padding: '2rem',
      border: '1px solid var(--color-border)',
      borderRadius: '8px',
      background: 'var(--color-paper)',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.5rem',
        marginBottom: '1.5rem',
        color: 'var(--color-ink)',
      }}>
        Host a Battle Room
      </h2>

      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-muted)',
          display: 'block',
          marginBottom: '0.4rem',
        }}>
          Document
        </label>
        <div style={{
          padding: '0.6rem 0.8rem',
          border: '1px solid var(--color-border)',
          borderRadius: '4px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          color: 'var(--color-ink)',
          background: 'rgba(0,0,0,0.02)',
        }}>
          {document.title}
        </div>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-muted)',
          display: 'block',
          marginBottom: '0.4rem',
        }}>
          Topic
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{
            width: '100%',
            padding: '0.6rem 0.8rem',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-muted)',
          display: 'block',
          marginBottom: '0.5rem',
        }}>
          Number of Questions
        </label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[3, 5, 7].map((n) => (
            <button
              key={n}
              onClick={() => setQuestionCount(n)}
              style={{
                flex: 1,
                padding: '0.6rem',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                background: questionCount === n ? 'var(--color-ink)' : 'transparent',
                color: questionCount === n ? 'var(--color-paper)' : 'var(--color-ink)',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p style={{
          color: 'var(--color-error)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          marginBottom: '1rem',
        }}>
          {error}
        </p>
      )}

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          onClick={onCancel}
          style={{
            flex: 1,
            padding: '0.6rem',
            background: 'transparent',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => onCreateRoom(document.id, questionCount, topic)}
          disabled={loading || !topic.trim()}
          className="btn-primary"
          style={{
            flex: 1,
            padding: '0.6rem',
            background: loading ? 'var(--color-muted)' : 'var(--color-rust)',
            color: 'var(--color-paper)',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Creating...' : 'Create Room'}
        </button>
      </div>
    </div>
  );
}
