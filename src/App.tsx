import { useReducer, useEffect } from 'react';
import { reducer, initialState } from './reducer';
import { useAuth } from './hooks/useAuth';
import Header from './components/Header';
import StudyMode from './components/StudyMode';
import BattleMode from './components/BattleMode';

const STORAGE_KEY = 'scaffold-state';

function loadPersistedState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...initialState, ...parsed };
    }
  } catch {
    // ignore
  }
  return initialState;
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState, loadPersistedState);
  const { user, loading, signInAnonymously } = useAuth();

  useEffect(() => {
    if (!user && !loading) {
      signInAnonymously();
    }
    if (user) {
      dispatch({ type: 'SET_USER', payload: user.id });
    }
  }, [user, loading, signInAnonymously]);

  useEffect(() => {
    try {
      const { userId: _, ...rest } = state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
    } catch {
      // localStorage unavailable
    }
  }, [state]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'var(--font-ui)',
        fontSize: '0.8rem',
        color: 'var(--color-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        mode={state.mode}
        onSetMode={(mode) => dispatch({ type: 'SET_MODE', payload: mode })}
        onReset={() => {
          dispatch({ type: 'RESET_SESSION' });
          try { localStorage.removeItem(STORAGE_KEY); } catch { /* */ }
        }}
      />
      {state.mode === 'study' ? (
        <StudyMode state={state} dispatch={dispatch} />
      ) : (
        <BattleMode state={state} dispatch={dispatch} />
      )}
    </div>
  );
}
