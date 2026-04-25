import { useEffect, useRef, useState, useCallback } from 'react';
import type { AppState, BattleRoomParticipant } from '../types';
import type { Action } from '../reducer';
import type { RealtimeChannel } from '@supabase/supabase-js';
import {
  createRoom,
  joinRoom,
  kickPlayer,
  getParticipants,
  setRoomQuestions,
  updateRoomStatus,
  submitAnswers,
  saveParticipantResults,
  subscribeToRoom,
  broadcastToRoom,
  unsubscribeFromRoom,
} from '../services/roomService';
import { generateBattleQuestions } from '../services/aiQuestionGeneratorService';
import { scoreAnswer } from '../services/answerScorerService';
import { checkContent } from '../services/guardrailService';
import RoomCreation from './RoomCreation';
import RoomJoin from './RoomJoin';
import HostView from './HostView';
import PlayerView from './PlayerView';

type RoomScreen = 'menu' | 'create' | 'join' | 'active';

interface BattleRoomProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export default function BattleRoom({ state, dispatch }: BattleRoomProps) {
  const [screen, setScreen] = useState<RoomScreen>('menu');
  const [loading, setLoading] = useState(false);
  const [startingBattle, setStartingBattle] = useState(false);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { roomState } = state;
  const { room, role, participants, myParticipant } = roomState;
  const document = state.currentDocument!;
  const docContext = document.sections.map((s) => s.body).join('\n');

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      unsubscribeFromRoom(channelRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Subscribe to room channel when we have an active room
  const setupChannel = useCallback((roomCode: string) => {
    unsubscribeFromRoom(channelRef.current);

    const channel = subscribeToRoom(roomCode, {
      onLobbyUpdate: (updatedParticipants) => {
        dispatch({ type: 'SET_ROOM_PARTICIPANTS', payload: updatedParticipants });
      },
      onGameStart: (questions, timerMs) => {
        if (room) {
          dispatch({ type: 'SET_ROOM', payload: { ...room, status: 'battle', questions } });
          dispatch({ type: 'SET_ROOM_TIMER', payload: timerMs });
        }
      },
      onGameTick: (remainingMs) => {
        dispatch({ type: 'SET_ROOM_TIMER', payload: remainingMs });
      },
      onGameEnd: () => {
        if (room) {
          dispatch({ type: 'SET_ROOM', payload: { ...room, status: 'reveal' } });
        }
      },
      onKicked: (userId) => {
        if (userId === state.userId) {
          dispatch({ type: 'SET_ROOM_ERROR', payload: 'You have been removed from this room by the host.' });
          dispatch({ type: 'LEAVE_ROOM' });
          setScreen('menu');
        }
      },
      onRoomClosed: () => {
        dispatch({ type: 'SET_ROOM_ERROR', payload: 'The host has left. This room is now closed.' });
        dispatch({ type: 'LEAVE_ROOM' });
        setScreen('menu');
      },
    });

    channelRef.current = channel;
  }, [dispatch, room, state.userId]);

  // ── Host Actions ──

  const handleCreateRoom = async (documentId: string, questionCount: number, topic: string) => {
    setLoading(true);
    dispatch({ type: 'SET_ROOM_ERROR', payload: null });
    try {
      const newRoom = await createRoom(state.userId, documentId, questionCount, topic);
      dispatch({ type: 'SET_ROOM', payload: newRoom });
      dispatch({ type: 'SET_ROOM_ROLE', payload: 'host' });

      // Host also joins as participant
      const { participant } = await joinRoom(newRoom.roomCode, state.userId, 'Host');
      dispatch({ type: 'SET_MY_PARTICIPANT', payload: participant });

      // Fetch initial participants
      const parts = await getParticipants(newRoom.id);
      dispatch({ type: 'SET_ROOM_PARTICIPANTS', payload: parts });

      setupChannel(newRoom.roomCode);
      setScreen('active');
    } catch (err) {
      dispatch({ type: 'SET_ROOM_ERROR', payload: (err as Error).message });
    } finally {
      setLoading(false);
    }
  };

  const handleStartBattle = async () => {
    if (!room) return;
    setStartingBattle(true);
    try {
      // Generate AI questions
      const docText = docContext;
      const questions = await generateBattleQuestions(docText, room.topic, room.questionCount);

      // Save questions and transition to battle
      await setRoomQuestions(room.id, questions);

      const updatedRoom = { ...room, status: 'battle' as const, questions };
      dispatch({ type: 'SET_ROOM', payload: updatedRoom });

      // Start timer (2 min per question)
      const totalMs = questions.length * 120000;
      dispatch({ type: 'SET_ROOM_TIMER', payload: totalMs });

      // Broadcast game start
      if (channelRef.current) {
        broadcastToRoom(channelRef.current, 'game:start', {
          questions,
          timerMs: totalMs,
        });
      }

      // Start countdown
      const startTime = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, totalMs - elapsed);
        dispatch({ type: 'SET_ROOM_TIMER', payload: remaining });

        if (channelRef.current) {
          broadcastToRoom(channelRef.current, 'game:tick', { remainingMs: remaining });
        }

        if (remaining <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleEndBattle();
        }
      }, 1000);
    } catch (err) {
      dispatch({ type: 'SET_ROOM_ERROR', payload: (err as Error).message });
    } finally {
      setStartingBattle(false);
    }
  };

  const handleKickPlayer = async (userId: string) => {
    if (!room) return;
    await kickPlayer(room.id, userId);

    // Broadcast kick
    if (channelRef.current) {
      broadcastToRoom(channelRef.current, 'player:kicked', { userId });
    }

    // Refresh participants
    const parts = await getParticipants(room.id);
    dispatch({ type: 'SET_ROOM_PARTICIPANTS', payload: parts });

    if (channelRef.current) {
      broadcastToRoom(channelRef.current, 'lobby:update', { participants: parts });
    }
  };

  // ── Player Actions ──

  const handleJoinRoom = async (roomCode: string, displayName: string) => {
    setLoading(true);
    dispatch({ type: 'SET_ROOM_ERROR', payload: null });
    try {
      const { room: joinedRoom, participant } = await joinRoom(roomCode, state.userId, displayName);
      dispatch({ type: 'SET_ROOM', payload: joinedRoom });
      dispatch({ type: 'SET_ROOM_ROLE', payload: 'player' });
      dispatch({ type: 'SET_MY_PARTICIPANT', payload: participant });
      dispatch({ type: 'SET_DISPLAY_NAME', payload: displayName });

      const parts = await getParticipants(joinedRoom.id);
      dispatch({ type: 'SET_ROOM_PARTICIPANTS', payload: parts });

      setupChannel(joinedRoom.roomCode);
      setScreen('active');
    } catch (err) {
      dispatch({ type: 'SET_ROOM_ERROR', payload: (err as Error).message });
    } finally {
      setLoading(false);
    }
  };

  // ── Shared Actions ──

  const handleSubmitAnswer = async (idx: number, text: string) => {
    dispatch({ type: 'SET_ROOM_ANSWER', payload: { idx, text } });

    if (myParticipant) {
      const updatedAnswers = { ...myParticipant.answers, [idx]: text };
      await submitAnswers(myParticipant.id, updatedAnswers);
      dispatch({ type: 'SET_MY_PARTICIPANT', payload: { ...myParticipant, answers: updatedAnswers } });
    }

    // Advance question index
    if (room && idx < room.questions.length - 1) {
      dispatch({ type: 'SET_ROOM_QUESTION_IDX', payload: idx + 1 });
    }

    // Broadcast progress
    if (channelRef.current) {
      broadcastToRoom(channelRef.current, 'player:progress', {
        userId: state.userId,
        questionIdx: idx,
      });
    }
  };

  const handleSubmitAllAnswers = async () => {
    if (!myParticipant || !room) return;
    await submitAnswers(myParticipant.id, myParticipant.answers);

    // If host, trigger end battle
    if (role === 'host') {
      handleEndBattle();
    }
  };

  const handleEndBattle = async () => {
    if (!room) return;
    if (timerRef.current) clearInterval(timerRef.current);

    // Score all participants' answers
    const parts = await getParticipants(room.id);

    for (const p of parts) {
      if (p.kicked) continue;
      const results = [];
      for (let qi = 0; qi < room.questions.length; qi++) {
        const answer = p.answers?.[qi] ?? '';
        const scored = await scoreAnswer(room.questions[qi].text, answer, docContext);
        const noteCheck = checkContent(scored.note);
        results.push({
          questionId: room.questions[qi].id,
          answer,
          score: scored.score,
          verdict: {
            label: scored.label as 'Strong reasoning' | 'Partial credit' | 'Needs rigor',
            note: noteCheck.passed ? noteCheck.sanitizedText : 'Your answer was evaluated on reasoning rigor.',
          },
        });
      }
      await saveParticipantResults(p.id, results);
    }

    // Transition to reveal
    await updateRoomStatus(room.id, 'reveal');
    dispatch({ type: 'SET_ROOM', payload: { ...room, status: 'reveal' } });

    // Refresh participants with results
    const updatedParts = await getParticipants(room.id);
    dispatch({ type: 'SET_ROOM_PARTICIPANTS', payload: updatedParts });

    // Update my participant
    const me = updatedParts.find((p: BattleRoomParticipant) => p.userId === state.userId);
    if (me) dispatch({ type: 'SET_MY_PARTICIPANT', payload: me });

    // Broadcast game end
    if (channelRef.current) {
      broadcastToRoom(channelRef.current, 'game:end', { results: {} });
    }
  };

  const handleLeaveRoom = () => {
    unsubscribeFromRoom(channelRef.current);
    channelRef.current = null;
    if (timerRef.current) clearInterval(timerRef.current);
    dispatch({ type: 'LEAVE_ROOM' });
    setScreen('menu');
  };

  // ── Render ──

  // Menu screen: Host / Join / Solo options
  if (screen === 'menu') {
    return (
      <div style={{
        maxWidth: '500px',
        margin: '3rem auto',
        padding: '2rem',
        textAlign: 'center',
      }}>
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

        {roomState.error && (
          <p style={{
            color: 'var(--color-error)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            marginBottom: '1rem',
            padding: '0.5rem',
            border: '1px solid var(--color-error)',
            borderRadius: '4px',
          }}>
            {roomState.error}
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            onClick={() => setScreen('create')}
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
            onClick={() => setScreen('join')}
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
        </div>
      </div>
    );
  }

  if (screen === 'create') {
    return (
      <RoomCreation
        document={document}
        onCreateRoom={handleCreateRoom}
        onCancel={() => setScreen('menu')}
        loading={loading}
        error={roomState.error}
      />
    );
  }

  if (screen === 'join') {
    return (
      <RoomJoin
        onJoin={handleJoinRoom}
        onCancel={() => setScreen('menu')}
        loading={loading}
        error={roomState.error}
      />
    );
  }

  // Active room
  if (screen === 'active' && room) {
    return (
      <div style={{
        minHeight: 'calc(100vh - 52px)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 1.5rem',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <button
            onClick={handleLeaveRoom}
            style={{
              fontSize: '0.6rem',
              padding: '0.25rem 0.5rem',
              background: 'transparent',
            }}
          >
            ← Leave Room
          </button>
          <span style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-muted)',
          }}>
            Room {room.roomCode} · {room.status}
          </span>
        </div>

        {role === 'host' ? (
          <HostView
            room={room}
            participants={participants}
            myParticipant={myParticipant}
            timerRemaining={roomState.timerRemaining}
            currentQuestionIdx={roomState.currentQuestionIdx}
            onKickPlayer={handleKickPlayer}
            onStartBattle={handleStartBattle}
            onSubmitAnswer={handleSubmitAnswer}
            onSubmitAllAnswers={handleSubmitAllAnswers}
            onNewBattle={handleLeaveRoom}
            startingBattle={startingBattle}
          />
        ) : myParticipant ? (
          <PlayerView
            room={room}
            participant={myParticipant}
            participants={participants}
            timerRemaining={roomState.timerRemaining}
            currentQuestionIdx={roomState.currentQuestionIdx}
            onSetQuestionIdx={(idx) => dispatch({ type: 'SET_ROOM_QUESTION_IDX', payload: idx })}
            onSubmitAnswer={handleSubmitAnswer}
            onSubmitAllAnswers={handleSubmitAllAnswers}
            onPlayAgain={handleLeaveRoom}
          />
        ) : null}
      </div>
    );
  }

  return null;
}
