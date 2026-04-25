import { useReducer, useEffect } from 'react';
import { reducer, initialState } from './reducer';
import { useAuth } from './hooks/useAuth';
import AuthGate from './components/AuthGate';
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
  const { user, loading, error, signIn, signUp, signOut } = useAuth();

  useEffect(() => {
    if (user) {
      dispatch({ type: 'SET_USER', payload: { id: user.id, name: user.displayName } });
    }
  }, [user]);

  useEffect(() => {
    try {
      const { userId: _, userName: _n, ...rest } = state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
    } catch {
      // localStorage unavailable
    }
  }, [state]);

  return (
    <AuthGate user={user} loading={loading} error={error} onSignIn={signIn} onSignUp={signUp}>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header
          mode={state.mode}
          userName={state.userName}
          onSetMode={(mode) => dispatch({ type: 'SET_MODE', payload: mode })}
          onSignOut={signOut}
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
    </AuthGate>
  );
}
