import { useState } from 'react';
import type { BattleRoom, BattleRoomParticipant, BattleRoomQuestion, ParticipantResult } from '../types';

interface PlayerViewProps {
  room: BattleRoom;
  participant: BattleRoomParticipant;
  participants: BattleRoomParticipant[];
  timerRemaining: number | null;
  currentQuestionIdx: number;
  onSetQuestionIdx: (idx: number) => void;
  onSubmitAnswer: (idx: number, text: string) => void;
  onSubmitAllAnswers: () => void;
  onPlayAgain: () => void;
}

export default function PlayerView({
  room,
  participant,
  participants,
  timerRemaining,
  currentQuestionIdx,
  onSetQuestionIdx,
  onSubmitAnswer,
  onSubmitAllAnswers,
  onPlayAgain,
}: PlayerViewProps) {
  if (room.status === 'lobby') {
    return (
      <PlayerLobby
        room={room}
        participantCount={participants.filter((p) => !p.kicked).length}
      />
    );
  }

  if (room.status === 'battle') {
    return (
      <PlayerBattle
        room={room}
        participant={participant}
        timerRemaining={timerRemaining}
        currentQuestionIdx={currentQuestionIdx}
        onSetQuestionIdx={onSetQuestionIdx}
        onSubmitAnswer={onSubmitAnswer}
        onSubmitAllAnswers={onSubmitAllAnswers}
      />
    );
  }

  if (room.status === 'reveal') {
    return (
      <PlayerReveal
        room={room}
        participant={participant}
        participants={participants}
        onPlayAgain={onPlayAgain}
      />
    );
  }

  return null;
}

// ── Player Lobby (waiting screen) ──

function PlayerLobby({
  room,
  participantCount,
}: {
  room: BattleRoom;
  participantCount: number;
}) {
  return (
    <div style={{
      maxWidth: '500px',
      margin: '3rem auto',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.5rem',
        color: 'var(--color-ink)',
        marginBottom: '0.5rem',
      }}>
        Waiting for Host
      </h2>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        color: 'var(--color-muted)',
        marginBottom: '2rem',
      }}>
        The host will start the battle when everyone is ready.
      </p>

      <div style={{
        padding: '1.5rem',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        marginBottom: '1.5rem',
      }}>
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-muted)',
          marginBottom: '0.25rem',
        }}>
          Document
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.1rem',
          color: 'var(--color-ink)',
          marginBottom: '1rem',
        }}>
          {room.topic}
        </p>
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-muted)',
          marginBottom: '0.25rem',
        }}>
          Players Joined
        </p>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          color: 'var(--color-ink)',
        }}>
          {participantCount}
        </p>
      </div>

      <p style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '0.7rem',
        color: 'var(--color-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        {room.questionCount} questions · Room {room.roomCode}
      </p>
    </div>
  );
}

// ── Player Battle (one question at a time, mobile-friendly) ──

function PlayerBattle({
  room,
  participant,
  timerRemaining,
  currentQuestionIdx,
  onSetQuestionIdx,
  onSubmitAnswer,
  onSubmitAllAnswers,
}: {
  room: BattleRoom;
  participant: BattleRoomParticipant;
  timerRemaining: number | null;
  currentQuestionIdx: number;
  onSetQuestionIdx: (idx: number) => void;
  onSubmitAnswer: (idx: number, text: string) => void;
  onSubmitAllAnswers: () => void;
}) {
  const [localAnswer, setLocalAnswer] = useState('');
  const questions = room.questions;
  const currentQ = questions[currentQuestionIdx];
  const totalQuestions = questions.length;
  const myAnswers = participant.answers ?? {};
  const allAnswered = Object.keys(myAnswers).length >= totalQuestions &&
    Object.values(myAnswers).every((a) => a.trim().length > 0);

  const wordCount = localAnswer.trim().split(/\s+/).filter(Boolean).length;
  const meetsMinimum = wordCount >= 15;

  const formatTime = (ms: number) => {
    const s = Math.ceil(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (meetsMinimum) {
      onSubmitAnswer(currentQuestionIdx, localAnswer);
      setLocalAnswer('');
      if (currentQuestionIdx < totalQuestions - 1) {
        onSetQuestionIdx(currentQuestionIdx + 1);
      }
    }
  };

  return (
    <div style={{
      maxWidth: '680px',
      margin: '0 auto',
      padding: '1rem',
    }}>
      {/* Fixed timer */}
      {timerRemaining !== null && (
        <div style={{
          position: 'sticky',
          top: 0,
          background: 'var(--color-paper)',
          padding: '0.5rem 0',
          textAlign: 'center',
          borderBottom: '1px solid var(--color-border)',
          zIndex: 10,
        }}>
          <span style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: timerRemaining < 30000 ? 'var(--color-error)' : 'var(--color-ink)',
          }}>
            {formatTime(timerRemaining)}
          </span>
        </div>
      )}

      {!allAnswered && currentQ && (
        <>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-muted)',
            marginTop: '1rem',
            marginBottom: '0.5rem',
          }}>
            Question {currentQuestionIdx + 1} / {totalQuestions}
          </p>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.15rem',
            color: 'var(--color-ink)',
            lineHeight: 1.5,
            marginBottom: '1rem',
          }}>
            {currentQ.text}
          </p>

          <textarea
            value={localAnswer}
            onChange={(e) => setLocalAnswer(e.target.value)}
            placeholder="Type your reasoning..."
            rows={6}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              resize: 'vertical',
              boxSizing: 'border-box',
              minHeight: '44px',
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
                minHeight: '44px',
              }}
            >
              {currentQuestionIdx < totalQuestions - 1 ? 'Next' : 'Submit'}
            </button>
          </div>
        </>
      )}

      {allAnswered && (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.25rem',
            color: 'var(--color-success)',
            marginBottom: '0.75rem',
          }}>
            All answers submitted!
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--color-muted)',
          }}>
            Waiting for other players to finish...
          </p>
          <button
            onClick={onSubmitAllAnswers}
            style={{
              marginTop: '1rem',
              padding: '0.6rem 1.5rem',
              background: 'var(--color-rust)',
              color: 'var(--color-paper)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              minHeight: '44px',
            }}
          >
            Confirm Submission
          </button>
        </div>
      )}
    </div>
  );
}

// ── Player Reveal (personal results + peer comparisons) ──

function PlayerReveal({
  room,
  participant,
  participants,
  onPlayAgain,
}: {
  room: BattleRoom;
  participant: BattleRoomParticipant;
  participants: BattleRoomParticipant[];
  onPlayAgain: () => void;
}) {
  const myResults = participant.results ?? [];
  const totalScore = myResults.reduce((sum: number, r: ParticipantResult) => sum + r.score, 0);
  const maxScore = room.questions.length * 5;

  // Calculate rank
  const allScores = participants
    .filter((p) => !p.kicked && p.results)
    .map((p) => (p.results ?? []).reduce((sum: number, r: ParticipantResult) => sum + r.score, 0))
    .sort((a, b) => b - a);
  const myRank = allScores.indexOf(totalScore) + 1;

  return (
    <div style={{
      maxWidth: '680px',
      margin: '0 auto',
      padding: '1rem',
    }}>
      {/* Score header */}
      <div style={{
        textAlign: 'center',
        padding: '1.5rem 0',
        marginBottom: '1.5rem',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          color: 'var(--color-ink)',
          marginBottom: '0.25rem',
        }}>
          {totalScore} / {maxScore}
        </p>
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-muted)',
        }}>
          Rank #{myRank} of {allScores.length}
        </p>
      </div>

      {/* Per-question results */}
      {room.questions.map((q: BattleRoomQuestion, qi: number) => {
        const result = myResults[qi];
        if (!result) return null;

        const verdictColor =
          result.verdict.label === 'Strong reasoning' ? 'var(--color-success)' :
          result.verdict.label === 'Partial credit' ? 'var(--color-warning)' :
          'var(--color-error)';

        // Get anonymized peer answers (up to 2, excluding self)
        const peerAnswers = participants
          .filter((p) => p.userId !== participant.userId && !p.kicked && p.results?.[qi])
          .slice(0, 2)
          .map((p, i) => ({
            author: `Peer ${i + 1}`,
            text: p.results![qi].answer,
            verdict: p.results![qi].verdict,
            score: p.results![qi].score,
          }));

        return (
          <div key={q.id} style={{
            marginBottom: '1.5rem',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            <div style={{ padding: '1rem' }}>
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-muted)',
                marginBottom: '0.25rem',
              }}>
                Question {qi + 1}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--color-ink)',
                lineHeight: 1.4,
                marginBottom: '0.75rem',
              }}>
                {q.text}
              </p>

              {/* My answer (highlighted) */}
              <div style={{
                padding: '0.75rem',
                borderLeft: `3px solid ${verdictColor}`,
                background: 'rgba(181, 74, 30, 0.04)',
                borderRadius: '0 4px 4px 0',
                marginBottom: '0.5rem',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.25rem',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.6rem',
                    textTransform: 'uppercase',
                    color: 'var(--color-rust)',
                    fontWeight: 700,
                  }}>
                    Your Answer
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.6rem',
                    color: verdictColor,
                    fontWeight: 700,
                  }}>
                    {result.verdict.label} ({result.score}/5)
                  </span>
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--color-ink)',
                  lineHeight: 1.4,
                }}>
                  {result.answer}
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  color: 'var(--color-muted)',
                  fontStyle: 'italic',
                  marginTop: '0.25rem',
                }}>
                  {result.verdict.note}
                </p>
              </div>

              {/* Peer answers */}
              {peerAnswers.map((peer, pi) => {
                const peerVerdictColor =
                  peer.verdict.label === 'Strong reasoning' ? 'var(--color-success)' :
                  peer.verdict.label === 'Partial credit' ? 'var(--color-warning)' :
                  'var(--color-error)';
                return (
                  <div key={pi} style={{
                    padding: '0.75rem',
                    borderLeft: `3px solid ${peerVerdictColor}`,
                    background: 'rgba(0,0,0,0.01)',
                    borderRadius: '0 4px 4px 0',
                    marginBottom: '0.5rem',
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.25rem',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.6rem',
                        textTransform: 'uppercase',
                        color: 'var(--color-muted)',
                      }}>
                        {peer.author}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.6rem',
                        color: peerVerdictColor,
                      }}>
                        {peer.verdict.label} ({peer.score}/5)
                      </span>
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: 'var(--color-ink)',
                      lineHeight: 1.4,
                    }}>
                      {peer.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: '2rem' }}>
        <button
          onClick={onPlayAgain}
          style={{
            padding: '0.6rem 1.5rem',
            background: 'var(--color-rust)',
            color: 'var(--color-paper)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            minHeight: '44px',
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
