import type { BattleQuestion } from '../types';

interface QuestionPoolProps {
  acceptedQuestions: BattleQuestion[];
}

export default function QuestionPool({ acceptedQuestions }: QuestionPoolProps) {
  return (
    <div>
      <p
        className="label"
        style={{
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-ui)',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
          color: 'var(--color-muted)',
        }}
      >
        Question Pool ({acceptedQuestions.length} / 3)
      </p>

      {acceptedQuestions.length === 0 ? (
        <p
          style={{
            color: 'var(--color-muted)',
            fontSize: '0.8rem',
            fontStyle: 'italic',
            fontFamily: 'var(--font-body)',
          }}
        >
          Submit 3 accepted questions to proceed.
        </p>
      ) : (
        acceptedQuestions.map((q, i) => (
          <div
            key={i}
            style={{
              padding: '0.5rem 0.75rem',
              marginBottom: '0.5rem',
              borderLeft: '3px solid var(--color-success)',
              background: 'rgba(45,106,79,0.06)',
              borderRadius: '0 4px 4px 0',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--color-ink)',
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-ui)',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                marginBottom: '0.25rem',
                letterSpacing: '0.04em',
              }}
            >
              {q.author}
            </span>
            {q.text}
          </div>
        ))
      )}
    </div>
  );
}
