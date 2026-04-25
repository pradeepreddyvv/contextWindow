import { useState } from 'react';
import { generateProvocations } from '../services/explainBackService';

interface ExplainItBackProps {
  documentText: string;
  explainText: string;
  explainRound: number;
  explainProvocations: string[];
  onSetText: (text: string) => void;
  onSetProvocations: (provocations: string[]) => void;
  onIncrementRound: () => void;
}

export default function ExplainItBack({
  documentText,
  explainText,
  explainRound,
  explainProvocations,
  onSetText,
  onSetProvocations,
  onIncrementRound,
}: ExplainItBackProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(explainProvocations.length > 0);

  const handleSubmit = async () => {
    setLoading(true);
    const provs = await generateProvocations(explainText, documentText, explainRound);
    onSetProvocations(provs);
    onIncrementRound();
    setSubmitted(true);
    setLoading(false);
  };

  const handleRevise = () => {
    onSetProvocations([]);
    setSubmitted(false);
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <p className="label" style={{ color: 'var(--color-lens-explain)' }}>Explain It Back</p>
        <span className="label">Round {explainRound + 1}</span>
      </div>

      <textarea
        value={explainText}
        onChange={(e) => onSetText(e.target.value)}
        placeholder="Explain this section in your own words..."
        rows={4}
        disabled={submitted}
        style={{ marginBottom: '0.5rem' }}
      />

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!explainText.trim() || loading}
          style={{
            background: 'var(--color-lens-explain)',
            color: 'var(--color-paper)',
            border: 'none',
          }}
        >
          {loading ? 'Thinking...' : 'Submit'}
        </button>
      )}

      {submitted && explainProvocations.length > 0 && (
        <div style={{ marginTop: '0.75rem' }}>
          <p className="label" style={{ marginBottom: '0.5rem' }}>Provocations</p>
          {explainProvocations.map((p, i) => (
            <div
              key={i}
              style={{
                padding: '0.5rem 0.75rem',
                borderLeft: '3px solid var(--color-lens-explain)',
                background: 'rgba(123, 94, 42, 0.06)',
                borderRadius: '0 4px 4px 0',
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
              }}
            >
              {p}
            </div>
          ))}
          <button onClick={handleRevise} style={{ marginTop: '0.5rem' }}>
            Revise
          </button>
        </div>
      )}
    </div>
  );
}
