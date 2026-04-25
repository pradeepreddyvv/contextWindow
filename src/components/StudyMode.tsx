import type { AppState } from '../types';
import type { Action } from '../reducer';
import ResourcesSidebar from './ResourcesSidebar';
import LensTabs from './LensTabs';
import LensPanel from './LensPanel';
import ExplainItBack from './ExplainItBack';
import DocumentReader from './DocumentReader';
import OutlinePanel from './OutlinePanel';

interface StudyModeProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export default function StudyMode({ state, dispatch }: StudyModeProps) {
  const document = state.currentDocument!;
  const documentText = document.sections.map((s) => s.body).join('\n');

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'var(--sidebar-width) 1fr var(--outline-width)',
      height: 'calc(100vh - 52px)',
      overflow: 'hidden',
    }}>
      <ResourcesSidebar document={document} />

      <main style={{
        padding: '1.5rem 2rem',
        overflowY: 'auto',
      }}>
        <LensTabs
          activeLens={state.activeLens}
          onSetLens={(lens) => dispatch({ type: 'SET_LENS', payload: lens })}
        />

        {state.activeLens !== 'explain' ? (
          <LensPanel
            activeLens={state.activeLens}
            documentText={documentText}
            onPin={(q) => dispatch({ type: 'PIN_QUESTION', payload: q })}
            pinnedIds={state.pinnedQuestions.map((q) => q.id)}
          />
        ) : (
          <ExplainItBack
            documentText={documentText}
            explainText={state.explainText}
            explainRound={state.explainRound}
            explainProvocations={state.explainProvocations}
            onSetText={(t) => dispatch({ type: 'SET_EXPLAIN_TEXT', payload: t })}
            onSetProvocations={(p) => dispatch({ type: 'SET_EXPLAIN_PROVOCATIONS', payload: p })}
            onIncrementRound={() => dispatch({ type: 'INCREMENT_EXPLAIN_ROUND' })}
          />
        )}

        <DocumentReader
          document={document}
          engagedProvocations={state.engagedProvocations}
          onEngage={(id) => dispatch({ type: 'ENGAGE_PROVOCATION', payload: id })}
          onHighlight={(text, note) =>
            dispatch({
              type: 'ADD_HIGHLIGHT',
              payload: { id: `hl-${Date.now()}`, text, note },
            })
          }
        />
      </main>

      <OutlinePanel
        document={document}
        pinnedQuestions={state.pinnedQuestions}
        highlights={state.highlights}
        engagedProvocations={state.engagedProvocations}
        onUpdateNote={(id, note) => dispatch({ type: 'UPDATE_HIGHLIGHT_NOTE', payload: { id, note } })}
        onEnterBattle={() => dispatch({ type: 'SET_MODE', payload: 'battle' })}
      />
    </div>
  );
}
