import { useState } from 'react';
import type { BattleQuestion } from '../types';
import { evaluateQuestion } from '../services/questionEvaluatorService';
import { DOCUMENT } from '../services/mockData';
import QuestionPool from './QuestionPool';

interface AuthorPhaseProps {
  draftQuestion: string;
  questionStatus: { ok: boolean; msg: string } | null;
  acceptedQuestions: BattleQuestion[];
  onSetDraft: (text: string) => void;
  onSetStatus: (status: { ok: boolean; msg: string } | null) => void;
  onAccept: (q: BattleQuestion) => void;
  onEnterBattle: () => void;
}

export default function AuthorPhase({
  draftQuestion,
  questionStatus,
  acceptedQuestions,
  onSetDraft,
  onSetStatus,
  onAccept,
  onEnterBattle,
}: AuthorPhaseProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const docContext = DOCUMENT.sections.map((s) => s.body).join('\n');
    const result = await evaluateQuestion(draftQuestion, docContext);
    if (result.accepted) {
      onAccept({ text: draftQuestion.trim(), author: 'You' });
    }
    onSetStatus({ ok: result.accepted, msg: result.message });
    setLoading(false);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '2rem' }}>
      <div>
        <p className="label" style={{ marginBottom: '0.75rem' }}>Write a question about the document</p>
        <textarea
          value={draftQuestion}
          onChange={(e) => { onSetDraft(e.target.value); onSetStatus(null); }}
          placeholder="Ask about a mechanism, consequence, or comparison — not recall..."
          rows={3}
          style={{ marginBottom: '0.5rem' }}
        />

        {questionStatus && (
          <div style={{
            padding: '0.5rem 0.75rem',
            marginBottom: '0.75rem',
            borderLeft: `3px solid ${questionStatus.ok ? 'var(--color-success)' : 'var(--color-error)'}`,
            background: questionStatus.ok ? 'rgba(45,106,79,0.06)' : 'rgba(139,58,58,0.06)',
            borderRadius: '0 4px 4px 0',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-body)',
          }}>
            {questionStatus.msg}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!draftQuestion.trim() || loading}
          style={{
            background: 'var(--color-rust)',
            color: 'var(--color-paper)',
            border: 'none',
          }}
        >
          {loading ? 'Evaluating...' : 'Submit Question'}
        </button>

        {acceptedQuestions.length >= 3 && (
          <button
            onClick={onEnterBattle}
            style={{
              marginLeft: '0.75rem',
              background: 'var(--color-success)',
              color: 'var(--color-paper)',
              border: 'none',
            }}
          >
            Enter Battle →
          </button>
        )}
      </div>

      <QuestionPool acceptedQuestions={acceptedQuestions} />
    </div>
  );
}
