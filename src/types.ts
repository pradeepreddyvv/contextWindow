export type AppMode = 'study' | 'battle';
export type LensType = 'watch' | 'prereq' | 'misc' | 'explain';
export type BattlePhase = 1 | 2 | 3;

// Battle Rooms (Multiplayer)
export type RoomStatus = 'lobby' | 'battle' | 'reveal' | 'abandoned' | 'expired';
export type RoomRole = 'host' | 'player';

export interface BattleRoom {
  id: string;
  hostId: string;
  documentId: string | null;
  roomCode: string;
  status: RoomStatus;
  questionCount: number;
  questions: BattleRoomQuestion[];
  topic: string;
  createdAt: string;
}

export interface BattleRoomQuestion {
  id: string;
  text: string;
}

export interface BattleRoomParticipant {
  id: string;
  roomId: string;
  userId: string;
  displayName: string;
  answers: Record<number, string>;
  results: ParticipantResult[] | null;
  submittedAt: string | null;
  joinedAt: string;
  kicked: boolean;
}

export interface ParticipantResult {
  questionId: string;
  answer: string;
  score: number;
  verdict: {
    label: 'Strong reasoning' | 'Partial credit' | 'Needs rigor';
    note: string;
  };
}

export interface RoomState {
  room: BattleRoom | null;
  role: RoomRole | null;
  participants: BattleRoomParticipant[];
  myParticipant: BattleRoomParticipant | null;
  timerRemaining: number | null;
  currentQuestionIdx: number;
  error: string | null;
  displayName: string;
}

export interface DocumentSection {
  heading: string;
  body: string;
  provocations: InlineProvocation[];
}

export interface Document {
  id: string;
  title: string;
  subtitle: string;
  sections: DocumentSection[];
}

export interface InlineProvocation {
  id: string;
  phraseText: string;
  sectionIndex: number;
  question: string;
}

export interface Highlight {
  id: string;
  text: string;
  note: string;
}

export interface PinnedQuestion {
  id: string;
  lensId: LensType;
  text: string;
}

export interface BattleQuestion {
  text: string;
  author: string;
}

export interface BattleResult {
  question: BattleQuestion;
  myAnswer: string;
  score: number;
  verdict: {
    label: 'Strong reasoning' | 'Partial credit' | 'Needs rigor';
    color: string;
    note: string;
  };
  peerAnswers: { author: string; text: string }[];
}

export interface GuardrailResult {
  passed: boolean;
  sanitizedText: string;
  blockedReason?: string;
}

export interface OutlineState {
  highlights: Highlight[];
  pinnedQuestions: PinnedQuestion[];
  engagedProvocations: string[];
  explainText: string;
  explainRound: number;
}

export interface BattleState {
  phase: BattlePhase;
  acceptedQuestions: BattleQuestion[];
  answers: Record<number, string>;
  results: BattleResult[] | null;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
}

export interface AppState {
  mode: AppMode;
  activeLens: LensType;
  showHelp: boolean;

  highlights: Highlight[];
  pinnedQuestions: PinnedQuestion[];
  engagedProvocations: string[];

  explainText: string;
  explainProvocations: string[];
  explainRound: number;

  battlePhase: BattlePhase;
  draftQuestion: string;
  questionStatus: { ok: boolean; msg: string } | null;
  acceptedQuestions: BattleQuestion[];
  myAnswers: Record<number, string>;
  currentAnswerIdx: number;
  battleResults: BattleResult[] | null;

  userId: string;
  userName: string;

  // Battle Rooms (Multiplayer)
  roomState: RoomState;
}
