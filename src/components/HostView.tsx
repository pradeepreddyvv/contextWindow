import { useState } from 'react';
import type { BattleRoom, BattleRoomParticipant, BattleRoomQuestion, ParticipantResult } from '../types';

interface HostViewProps {
  room: BattleRoom;
  participants: BattleRoomParticipant[];
  myParticipant: BattleRoomParticipant | null;
  timerRemaining: number | null;
  currentQuestionIdx: number;
  onKickPlayer: (userId: string) => void;
  onStartBattle: () => void;
  onSubmitAnswer: (idx: number, text: string) => void;
  onSubmitAllAnswers: () => void;
  onNewBattle: () => void;
  startingBattle: boolean;
}

export default function HostView({
  room,
  participants,
  myParticipant,
  timerRemaining,
  currentQuestionIdx,
  onKickPlayer,
  onStartBattle,
  onSubmitAnswer,
  onSubmitAllAnswers,
  onNewBattle,
  startingBattle,
}: HostViewProps) {
  if (room.status === 'lobby') {
    return (
      <HostLobby
        room={room}
        participants={participants}
        onKickPlayer={onKickPlayer}
        onStartBattle={onStartBattle}
        startingBattle={startingBattle}
      />
    );
  }

  if (room.status === 'battle') {
    return (
      <HostBattle
        room={room}
        participants={participants}
        myParticipant={myParticipant}
        timerRemaining={timerRemaining}
        currentQuestionIdx={currentQuestionIdx}
        onSubmitAnswer={onSubmitAnswer}
        onSubmitAllAnswers={onSubmitAllAnswers}
      />
    );
  }

  if (room.status === 'reveal') {
    return (
      <HostReveal
        room={room}
        participants={participants}
        onNewBattle={onNewBattle}
      />
    );
  }

  return null;
}

// ── Host Lobby (projection-optimized) ──

function HostLobby({
  room,
  participants,
  onKickPlayer,
  onStartBattle,
  startingBattle,
}: {
  room: BattleRoom;
  participants: BattleRoomParticipant[];
  onKickPlayer: (userId: string) => void;
  onStartBattle: () => void;
  startingBattle: boolean;
}) {
  const joinUrl = `${window.location.origin}/play/${room.roomCode}`;
  const activeParticipants = participants.filter((p) => !p.kicked && p.userId !== room.hostId);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '36px',
        color: 'var(--color-ink)',
        marginBottom: '0.5rem',
      }}>
        Battle Room
      </h2>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '24px',
        color: 'var(--color-muted)',
        marginBottom: '2rem',
      }}>
        {room.topic || 'Waiting for players...'}
      </p>

      {/* Room Code — large for projection */}
      <div style={{
        display: 'inline-block',
        padding: '1rem 2.5rem',
        border: '3px solid var(--color-ink)',
        borderRadius: '12px',
        marginBottom: '1rem',
      }}>
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'var(--color-muted)',
          marginBottom: '0.25rem',
        }}>
          Room Code
        </p>
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '72px',
          fontWeight: 700,
          letterSpacing: '0.3em',
          color: 'var(--color-ink)',
          lineHeight: 1,
        }}>
          {room.roomCode}
        </p>
      </div>

      {/* Join link */}
      <p style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '14px',
        color: 'var(--color-muted)',
        marginBottom: '2rem',
        wordBreak: 'break-all',
      }}>
        {joinUrl}
      </p>

      {/* Participant list */}
      <div style={{
        maxWidth: '600px',
        margin: '0 auto 2rem',
        textAlign: 'left',
      }}>
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-muted)',
          marginBottom: '0.75rem',
        }}>
          Players ({activeParticipants.length} / 50)
        </p>
        {activeParticipants.length === 0 ? (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '24px',
            color: 'var(--color-muted)',
            textAlign: 'center',
            padding: '2rem 0',
          }}>
            Waiting for players to join...
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {activeParticipants.map((p, i) => (
              <li
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: i % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'transparent',
                  borderRadius: '4px',
                  fontSize: '24px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span>{p.displayName}</span>
                <button
                  onClick={() => onKickPlayer(p.userId)}
                  style={{
                    padding: '0.4rem 0.8rem',
                    fontSize: '14px',
                    background: 'transparent',
                    border: '1px solid var(--color-error)',
                    color: 'var(--color-error)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    minWidth: '48px',
                    minHeight: '48px',
                  }}
                  aria-label={`Kick ${p.displayName}`}
                >
                  Kick
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Config summary */}
      <p style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '14px',
        color: 'var(--color-muted)',
        marginBottom: '1.5rem',
      }}>
        {room.questionCount} questions · {room.topic}
      </p>

      <button
        onClick={onStartBattle}
        disabled={startingBattle}
        style={{
          padding: '1rem 3rem',
          fontSize: '24px',
          fontFamily: 'var(--font-display)',
          background: startingBattle ? 'var(--color-muted)' : 'var(--color-rust)',
          color: 'var(--color-paper)',
          border: 'none',
          borderRadius: '8px',
          cursor: startingBattle ? 'not-allowed' : 'pointer',
          minHeight: '48px',
        }}
      >
        {startingBattle ? 'Generating Questions...' : 'Start Battle'}
      </button>
    </div>
  );
}

// ── Host Battle (progress dashboard + own answer interface) ──

function HostBattle({
  room,
  participants,
  myParticipant,
  timerRemaining,
  currentQuestionIdx,
  onSubmitAnswer,
  onSubmitAllAnswers,
}: {
  room: BattleRoom;
  participants: BattleRoomParticipant[];
  myParticipant: BattleRoomParticipant | null;
  timerRemaining: number | null;
  currentQuestionIdx: number;
  onSubmitAnswer: (idx: number, text: string) => void;
  onSubmitAllAnswers: () => void;
}) {
  const [localAnswer, setLocalAnswer] = useState('');
  const questions = room.questions;
  const currentQ = questions[currentQuestionIdx];
  const totalQuestions = questions.length;
  const myAnswers = myParticipant?.answers ?? {};
  const allAnswered = Object.keys(myAnswers).length >= totalQuestions &&
    Object.values(myAnswers).every((a) => a.trim().length > 0);

  const wordCount = localAnswer.trim().split(/\s+/).filter(Boolean).length;
  const meetsMinimum = wordCount >= 15;

  const formatTime = (ms: number) => {
    const s = Math.ceil(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  };

  // Progress: how many participants completed each question
  const progressByQuestion = questions.map((_, qi) => {
    return participants.filter((p) => {
      const ans = p.answers?.[qi];
      return ans && ans.trim().length > 0;
    }).length;
  });

  const handleNext = () => {
    if (meetsMinimum) {
      onSubmitAnswer(currentQuestionIdx, localAnswer);
      setLocalAnswer('');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      {/* Timer */}
      {timerRemaining !== null && (
        <div style={{
          textAlign: 'center',
          fontFamily: 'var(--font-ui)',
          fontSize: '48px',
          fontWeight: 700,
          color: timerRemaining < 30000 ? 'var(--color-error)' : 'var(--color-ink)',
          marginBottom: '1.5rem',
        }}>
          {formatTime(timerRemaining)}
        </div>
      )}

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Left: Progress dashboard */}
        <div style={{ flex: '0 0 300px' }}>
          <h3 style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-muted)',
            marginBottom: '1rem',
          }}>
            Live Progress
          </h3>
          {questions.map((q: BattleRoomQuestion, qi: number) => (
            <div key={q.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem 0',
              fontSize: '24px',
              fontFamily: 'var(--font-body)',
            }}>
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '14px',
                color: qi === currentQuestionIdx ? 'var(--color-rust)' : 'var(--color-muted)',
              }}>
                Q{qi + 1}
              </span>
              <div style={{
                flex: 1,
                height: '8px',
                background: 'var(--color-border)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${participants.length > 0 ? (progressByQuestion[qi] / participants.length) * 100 : 0}%`,
                  height: '100%',
                  background: 'var(--color-success)',
                  borderRadius: '4px',
                  transition: 'width 0.3s',
                }} />
              </div>
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '14px',
                color: 'var(--color-muted)',
                minWidth: '40px',
              }}>
                {progressByQuestion[qi]}/{participants.length}
              </span>
            </div>
          ))}

          {/* Player status list */}
          <div style={{ marginTop: '1.5rem' }}>
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--color-muted)',
              marginBottom: '0.5rem',
            }}>
              Players
            </p>
            {participants.filter((p) => p.userId !== room.hostId).map((p) => {
              const answeredCount = Object.keys(p.answers ?? {}).length;
              const done = p.submittedAt !== null;
              return (
                <div key={p.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.3rem 0',
                  fontSize: '18px',
                  fontFamily: 'var(--font-body)',
                  color: done ? 'var(--color-success)' : 'var(--color-ink)',
                }}>
                  <span>{p.displayName}</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '12px' }}>
                    {done ? '✓ Done' : `${answeredCount}/${totalQuestions}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Host's own answer interface */}
        <div style={{ flex: 1 }}>
          {currentQ && !allAnswered && (
            <>
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '14px',
                color: 'var(--color-muted)',
                marginBottom: '0.5rem',
              }}>
                Question {currentQuestionIdx + 1} of {totalQuestions}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '24px',
                color: 'var(--color-ink)',
                marginBottom: '1rem',
                lineHeight: 1.4,
              }}>
                {currentQ.text}
              </p>
              <textarea
                value={localAnswer}
                onChange={(e) => setLocalAnswer(e.target.value)}
                placeholder="Type your reasoning..."
                rows={5}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '0.5rem',
              }}>
                <span className="badge" style={{
                  color: meetsMinimum ? 'var(--color-success)' : 'var(--color-muted)',
                }}>
                  {wordCount} / 15 words minimum
                </span>
                <button
                  onClick={handleNext}
                  disabled={!meetsMinimum}
                  style={{
                    padding: '0.6rem 1.5rem',
                    background: meetsMinimum ? 'var(--color-rust)' : 'var(--color-muted)',
                    color: 'var(--color-paper)',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: meetsMinimum ? 'pointer' : 'not-allowed',
                    minHeight: '48px',
                  }}
                >
                  {currentQuestionIdx < totalQuestions - 1 ? 'Next' : 'Done'}
                </button>
              </div>
            </>
          )}

          {allAnswered && (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '24px',
                color: 'var(--color-success)',
                marginBottom: '1rem',
              }}>
                All answers submitted!
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                color: 'var(--color-muted)',
              }}>
                Waiting for other players to finish...
              </p>
              <button
                onClick={onSubmitAllAnswers}
                style={{
                  marginTop: '1.5rem',
                  padding: '0.75rem 2rem',
                  background: 'var(--color-rust)',
                  color: 'var(--color-paper)',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '18px',
                  cursor: 'pointer',
                  minHeight: '48px',
                }}
              >
                End Battle &amp; Reveal Scores
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Host Reveal (leaderboard + per-question breakdowns) ──

function HostReveal({
  room,
  participants,
  onNewBattle,
}: {
  room: BattleRoom;
  participants: BattleRoomParticipant[];
  onNewBattle: () => void;
}) {
  // Build leaderboard from participant results
  const leaderboard = participants
    .filter((p) => !p.kicked && p.results)
    .map((p) => {
      const totalScore = (p.results ?? []).reduce((sum: number, r: ParticipantResult) => sum + r.score, 0);
      const maxScore = room.questions.length * 5;
      return { ...p, totalScore, maxScore };
    })
    .sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '36px',
        textAlign: 'center',
        color: 'var(--color-ink)',
        marginBottom: '2rem',
      }}>
        🎉 Battle Results
      </h2>

      {/* Leaderboard */}
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-muted)',
          marginBottom: '1rem',
        }}>
          Leaderboard
        </h3>
        {leaderboard.map((p, rank) => (
          <div
            key={p.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              background: rank % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'transparent',
              borderRadius: '4px',
              fontSize: '24px',
              fontFamily: 'var(--font-body)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '18px',
                fontWeight: 700,
                color: rank === 0 ? 'var(--color-rust)' : 'var(--color-muted)',
                minWidth: '30px',
              }}>
                #{rank + 1}
              </span>
              <span>{p.displayName}</span>
            </div>
            <span style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--color-ink)',
            }}>
              {p.totalScore} / {p.maxScore}
            </span>
          </div>
        ))}
      </div>

      {/* Per-question breakdowns */}
      {room.questions.map((q: BattleRoomQuestion, qi: number) => (
        <div key={q.id} style={{
          marginBottom: '2rem',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '1.25rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-muted)',
            marginBottom: '0.25rem',
          }}>
            Question {qi + 1}
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '20px',
            color: 'var(--color-ink)',
            marginBottom: '1rem',
            lineHeight: 1.4,
          }}>
            {q.text}
          </p>

          {leaderboard.map((p) => {
            const result = p.results?.[qi];
            if (!result) return null;
            const verdictColor =
              result.verdict.label === 'Strong reasoning' ? 'var(--color-success)' :
              result.verdict.label === 'Partial credit' ? 'var(--color-warning)' :
              'var(--color-error)';
            return (
              <div key={p.id} style={{
                padding: '0.75rem',
                marginBottom: '0.5rem',
                borderLeft: `3px solid ${verdictColor}`,
                background: 'rgba(0,0,0,0.01)',
                borderRadius: '0 4px 4px 0',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.25rem',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '12px',
                    color: 'var(--color-muted)',
                  }}>
                    {p.displayName}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '12px',
                    color: verdictColor,
                    fontWeight: 700,
                  }}>
                    {result.verdict.label} ({result.score}/5)
                  </span>
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  color: 'var(--color-ink)',
                  lineHeight: 1.4,
                }}>
                  {result.answer}
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--color-muted)',
                  fontStyle: 'italic',
                  marginTop: '0.25rem',
                }}>
                  {result.verdict.note}
                </p>
              </div>
            );
          })}
        </div>
      ))}

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          onClick={onNewBattle}
          style={{
            padding: '0.75rem 2rem',
            fontSize: '24px',
            fontFamily: 'var(--font-display)',
            background: 'var(--color-rust)',
            color: 'var(--color-paper)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            minHeight: '48px',
          }}
        >
          New Battle
        </button>
      </div>
    </div>
  );
}
