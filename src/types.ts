export type AppMode = 'study' | 'battle';
export type LensType = 'watch' | 'prereq' | 'misc' | 'explain';
export type BattlePhase = 1 | 2 | 3;

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
}
