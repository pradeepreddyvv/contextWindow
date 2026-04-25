import { useState } from 'react';
import type { AppState } from '../types';
import type { Action } from '../reducer';
import { isMockMode } from '../lib/supabase';
import BattleProgressBar from './BattleProgressBar';
import AuthorPhase from './AuthorPhase';
import BattlePhaseComponent from './BattlePhase';
import RevealPhase from './RevealPhase';
import BattleRoom from './BattleRoom';
import { scoreAllAnswers } from '../services/answerScorerService';
import { DOCUMENT } from '../services/mockData';

type BattleScreen = 'menu' | 'solo' | 'multiplayer';

interface BattleModeProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export default function BattleMode({ state, dispatch }: BattleModeProps) {
  const [battleScreen, setBattleScreen] = useState<BattleScreen>('menu');

  const handleSubmitAll = async () => {
    const docContext = DOCUMENT.sections.map((s) => s.body).join('\n');
    const results = await scoreAllAnswers(state.acceptedQuestions, state.myAnswers, docContext);
    dispatch({ type: 'SET_BATTLE_RESULTS', payload: results });
  };

  // If already in a solo battle phase, show it directly
  if (battleScreen === 'solo' || (battleScreen === 'menu' && state.battlePhase > 1)) {
    return (
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '1.5rem 2rem',
        minHeight: 'calc(100vh - 52px)',
      }}>
        <button
          onClick={() => {
            if (state.battlePhase === 1) {
              setBattleScreen('menu');
            } else {
              dispatch({ type: 'SET_MODE', payload: 'study' });
            }
          }}
          style={{
            fontSize: '0.6rem',
            padding: '0.25rem 0.5rem',
            marginBottom: '1rem',
            background: 'transparent',
          }}
        >
          ← {state.battlePhase === 1 ? 'Back' : 'Back to Study'}
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
            onPlayAgain={() => {
              dispatch({ type: 'RESET_BATTLE' });
              setBattleScreen('menu');
            }}
          />
        )}
      </div>
    );
  }

  // Multiplayer mode
  if (battleScreen === 'multiplayer') {
    return <BattleRoom state={state} dispatch={dispatch} />;
  }

  // Menu: choose solo or multiplayer
  return (
    <div style={{
      maxWidth: '500px',
      margin: '3rem auto',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <button
        onClick={() => dispatch({ type: 'SET_MODE', payload: 'study' })}
        style={{
          fontSize: '0.6rem',
          padding: '0.25rem 0.5rem',
          marginBottom: '1.5rem',
          background: 'transparent',
          display: 'block',
        }}
      >
        ← Back to Study
      </button>

      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.75rem',
        color: 'var(--color-ink)',
        marginBottom: '0.5rem',
      }}>
        Battle Mode
      </h2>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        color: 'var(--color-muted)',
        marginBottom: '2rem',
      }}>
        Prove your understanding through reasoning.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <button
          onClick={() => setBattleScreen('solo')}
          style={{
            padding: '1rem',
            fontSize: '1rem',
            fontFamily: 'var(--font-display)',
            background: 'var(--color-ink)',
            color: 'var(--color-paper)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            minHeight: '48px',
          }}
        >
          Solo Battle
        </button>

        {!isMockMode() && (
          <>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              margin: '0.25rem 0',
            }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.6rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-muted)',
              }}>
                Multiplayer
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
            </div>

            <button
              onClick={() => setBattleScreen('multiplayer')}
              style={{
                padding: '1rem',
                fontSize: '1rem',
                fontFamily: 'var(--font-display)',
                background: 'var(--color-rust)',
                color: 'var(--color-paper)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                minHeight: '48px',
              }}
            >
              Host a Room
            </button>
            <button
              onClick={() => setBattleScreen('multiplayer')}
              style={{
                padding: '1rem',
                fontSize: '1rem',
                fontFamily: 'var(--font-display)',
                background: 'transparent',
                color: 'var(--color-ink)',
                border: '2px solid var(--color-ink)',
                borderRadius: '8px',
                cursor: 'pointer',
                minHeight: '48px',
              }}
            >
              Join a Room
            </button>
          </>
        )}

        {isMockMode() && (
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-muted)',
            marginTop: '0.5rem',
          }}>
            Multiplayer requires Supabase configuration
          </p>
        )}
      </div>
    </div>
  );
}
