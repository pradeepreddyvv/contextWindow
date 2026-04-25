import type { AppState } from '../types';
import type { Action } from '../reducer';
import BattleProgressBar from './BattleProgressBar';
import AuthorPhase from './AuthorPhase';
import BattlePhaseComponent from './BattlePhase';
import RevealPhase from './RevealPhase';
import { scoreAllAnswers } from '../services/answerScorerService';
import { DOCUMENT } from '../services/mockData';

interface BattleModeProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export default function BattleMode({ state, dispatch }: BattleModeProps) {
  const handleSubmitAll = async () => {
    const docContext = DOCUMENT.sections.map((s) => s.body).join('\n');
    const results = await scoreAllAnswers(state.acceptedQuestions, state.myAnswers, docContext);
    dispatch({ type: 'SET_BATTLE_RESULTS', payload: results });
  };

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '1.5rem 2rem',
      minHeight: 'calc(100vh - 52px)',
    }}>
      <button
        onClick={() => dispatch({ type: 'SET_MODE', payload: 'study' })}
        style={{
          fontSize: '0.6rem',
          padding: '0.25rem 0.5rem',
          marginBottom: '1rem',
          background: 'transparent',
        }}
      >
        ← Back to Study
      </button>

      <BattleProgressBar phase={state.battlePhase} />

      {state.battlePhase === 1 && (
        <AuthorPhase
          draftQuestion={state.draftQuestion}
          questionStatus={state.questionStatus}
          acceptedQuestions={state.acceptedQuestions}
          onSetDraft={(t) => dispatch({ type: 'SET_DRAFT_QUESTION', payload: t })}
          onSetStatus={(s) => dispatch({ type: 'SET_QUESTION_STATUS', payload: s })}
          onAccept={(q) => dispatch({ type: 'ADD_ACCEPTED_QUESTION', payload: q })}
          onEnterBattle={() => dispatch({ type: 'SET_BATTLE_PHASE', payload: 2 })}
        />
      )}

      {state.battlePhase === 2 && (
        <BattlePhaseComponent
          questions={state.acceptedQuestions}
          answers={state.myAnswers}
          currentIdx={state.currentAnswerIdx}
          onSetAnswer={(idx, text) => dispatch({ type: 'SET_ANSWER', payload: { idx, text } })}
          onSetIdx={(idx) => dispatch({ type: 'SET_CURRENT_ANSWER_IDX', payload: idx })}
          onSubmitAll={handleSubmitAll}
        />
      )}

      {state.battlePhase === 3 && state.battleResults && (
        <RevealPhase
          results={state.battleResults}
          onPlayAgain={() => dispatch({ type: 'RESET_BATTLE' })}
        />
      )}
    </div>
  );
}
