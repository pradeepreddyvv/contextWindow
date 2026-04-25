import type { InlineProvocation } from '../types';
import { MOCK_PROVOCATIONS } from '../services/mockData';

interface EngagedProvocationsProps {
  engagedIds: string[];
}

export default function EngagedProvocations({ engagedIds }: EngagedProvocationsProps) {
  const allProvocations: InlineProvocation[] = MOCK_PROVOCATIONS;

  if (engagedIds.length === 0) {
    return (
      <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>
        Click "I've thought about this" on a provocation.
      </p>
    );
  }

  return (
    <div>
      {engagedIds.map((provId) => {
        const prov = allProvocations.find((p) => p.id === provId);
        return prov ? (
          <div key={provId} style={{ marginBottom: '0.5rem', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--color-success)', marginRight: '0.25rem' }}>✓</span>
            <span style={{ fontFamily: 'var(--font-body)' }}>{prov.question}</span>
          </div>
        ) : null;
      })}
    </div>
  );
}
