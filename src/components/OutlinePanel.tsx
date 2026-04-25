import type { Highlight, PinnedQuestion } from '../types';
import PinnedQuestions from './PinnedQuestions';
import Highlights from './Highlights';
import EngagedProvocations from './EngagedProvocations';

interface OutlinePanelProps {
  pinnedQuestions: PinnedQuestion[];
  highlights: Highlight[];
  engagedProvocations: string[];
  onUpdateNote: (id: string, note: string) => void;
  onEnterBattle: () => void;
}

export default function OutlinePanel({
  pinnedQuestions,
  highlights,
  engagedProvocations,
  onUpdateNote,
  onEnterBattle,
}: OutlinePanelProps) {

  return (
    <aside style={{
      width: 'var(--outline-width)',
      padding: '1rem',
      borderLeft: '1px solid var(--color-border)',
      background: 'var(--color-paper)',
      minHeight: '100%',
      overflowY: 'auto',
    }}>
      <p className="label" style={{ marginBottom: '1rem', fontSize: '0.7rem' }}>Your Outline</p>

      {/* Pinned Questions */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p className="label" style={{ marginBottom: '0.5rem' }}>Pinned Questions</p>
        <PinnedQuestions questions={pinnedQuestions} />
      </div>

      {/* Highlights */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p className="label" style={{ marginBottom: '0.5rem' }}>Highlights</p>
        <Highlights highlights={highlights} onUpdateNote={onUpdateNote} />
      </div>

      {/* Engaged Provocations */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p className="label" style={{ marginBottom: '0.5rem' }}>Engaged Provocations</p>
        <EngagedProvocations engagedIds={engagedProvocations} />
      </div>

      <button
        onClick={onEnterBattle}
        style={{
          width: '100%',
          background: 'var(--color-rust)',
          color: 'var(--color-paper)',
          border: 'none',
          padding: '0.6rem',
          fontSize: '0.7rem',
        }}
      >
        Enter Battle →
      </button>
    </aside>
  );
}
