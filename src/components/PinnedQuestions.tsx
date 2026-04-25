import type { PinnedQuestion } from '../types';

interface PinnedQuestionsProps {
  questions: PinnedQuestion[];
}

const lensLabels: Record<string, { label: string; color: string }> = {
  watch: { label: 'Watch For', color: 'var(--color-lens-watch)' },
  prereq: { label: 'Prereq', color: 'var(--color-lens-prereq)' },
  misc: { label: 'Misconception', color: 'var(--color-lens-misc)' },
  explain: { label: 'Explain', color: 'var(--color-lens-explain)' },
};

export default function PinnedQuestions({ questions }: PinnedQuestionsProps) {
  if (questions.length === 0) {
    return (
      <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>
        Pin a lens question to save it here.
      </p>
    );
  }

  return (
    <div>
      {questions.map((q) => (
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
      ))}
    </div>
  );
}
