import type { AppState, LensType, AppMode, BattlePhase, Highlight, PinnedQuestion, BattleQuestion, BattleResult } from './types';

export type Action =
  | { type: 'SET_MODE'; payload: AppMode }
  | { type: 'SET_LENS'; payload: LensType }
  | { type: 'TOGGLE_HELP' }
  | { type: 'PIN_QUESTION'; payload: PinnedQuestion }
  | { type: 'ADD_HIGHLIGHT'; payload: Highlight }
  | { type: 'UPDATE_HIGHLIGHT_NOTE'; payload: { id: string; note: string } }
  | { type: 'ENGAGE_PROVOCATION'; payload: string }
  | { type: 'SET_EXPLAIN_TEXT'; payload: string }
  | { type: 'SET_EXPLAIN_PROVOCATIONS'; payload: string[] }
  | { type: 'INCREMENT_EXPLAIN_ROUND' }
  | { type: 'SET_DRAFT_QUESTION'; payload: string }
  | { type: 'SET_QUESTION_STATUS'; payload: { ok: boolean; msg: string } | null }
  | { type: 'ADD_ACCEPTED_QUESTION'; payload: BattleQuestion }
  | { type: 'SET_ANSWER'; payload: { idx: number; text: string } }
  | { type: 'SET_CURRENT_ANSWER_IDX'; payload: number }
  | { type: 'SET_BATTLE_RESULTS'; payload: BattleResult[] }
  | { type: 'SET_BATTLE_PHASE'; payload: BattlePhase }
  | { type: 'SET_USER'; payload: string }
  | { type: 'RESET_BATTLE' }
  | { type: 'RESET_SESSION' };

export const initialState: AppState = {
  mode: 'study',
  activeLens: 'watch',
  showHelp: false,
  highlights: [],
  pinnedQuestions: [],
  engagedProvocations: [],
  explainText: '',
  explainProvocations: [],
  explainRound: 0,
  battlePhase: 1,
  draftQuestion: '',
  questionStatus: null,
  acceptedQuestions: [],
  myAnswers: {},
  currentAnswerIdx: 0,
  battleResults: null,
  userId: 'mock-user',
};

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload };
    case 'SET_LENS':
      return { ...state, activeLens: action.payload };
    case 'TOGGLE_HELP':
      return { ...state, showHelp: !state.showHelp };
    case 'PIN_QUESTION':
      if (state.pinnedQuestions.some((q) => q.id === action.payload.id)) return state;
      return { ...state, pinnedQuestions: [...state.pinnedQuestions, action.payload] };
    case 'ADD_HIGHLIGHT':
      return { ...state, highlights: [...state.highlights, action.payload] };
    case 'UPDATE_HIGHLIGHT_NOTE':
      return {
        ...state,
        highlights: state.highlights.map((h) =>
          h.id === action.payload.id ? { ...h, note: action.payload.note } : h
        ),
      };
    case 'ENGAGE_PROVOCATION':
      if (state.engagedProvocations.includes(action.payload)) return state;
      return { ...state, engagedProvocations: [...state.engagedProvocations, action.payload] };
    case 'SET_EXPLAIN_TEXT':
      return { ...state, explainText: action.payload };
    case 'SET_EXPLAIN_PROVOCATIONS':
      return { ...state, explainProvocations: action.payload };
    case 'INCREMENT_EXPLAIN_ROUND':
      return { ...state, explainRound: state.explainRound + 1 };
    case 'SET_DRAFT_QUESTION':
      return { ...state, draftQuestion: action.payload };
    case 'SET_QUESTION_STATUS':
      return { ...state, questionStatus: action.payload };
    case 'ADD_ACCEPTED_QUESTION':
      return { ...state, acceptedQuestions: [...state.acceptedQuestions, action.payload], draftQuestion: '', questionStatus: null };
    case 'SET_ANSWER':
      return { ...state, myAnswers: { ...state.myAnswers, [action.payload.idx]: action.payload.text } };
    case 'SET_CURRENT_ANSWER_IDX':
      return { ...state, currentAnswerIdx: action.payload };
    case 'SET_BATTLE_RESULTS':
      return { ...state, battleResults: action.payload, battlePhase: 3 };
    case 'SET_BATTLE_PHASE':
      return { ...state, battlePhase: action.payload };
    case 'SET_USER':
      return { ...state, userId: action.payload };
    case 'RESET_BATTLE':
      return { ...state, battlePhase: 1, acceptedQuestions: [], myAnswers: {}, currentAnswerIdx: 0, battleResults: null, draftQuestion: '', questionStatus: null };
    case 'RESET_SESSION':
      return { ...initialState };
    default:
      return state;
  }
}
