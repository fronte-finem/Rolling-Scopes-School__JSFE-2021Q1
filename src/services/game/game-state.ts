import { WordDocument } from 'services/rest-api/word-api';
import { Maybe } from 'types/abstract';

export enum GameStatus {
  INITIAL = 'initial',
  READY = 'ready',
  START = 'start',
  VOCALIZE = 'vocalize',
  MATCHING = 'matching',
  HIT = 'hit',
  MISS = 'miss',
  SHOW_RESULT = 'show result',
  END = 'end',
}

export interface GameState {
  status: GameStatus;
  activeRoutePath: string;
  activeWord: Maybe<WordDocument>;
  words: WordDocument[];
  mistakes: number;
  asyncOperation: null | Promise<void>;
  cancelAsyncOperation: null | (() => void);
}

export const getInitialGameState = (): GameState => {
  return {
    status: GameStatus.INITIAL,
    activeRoutePath: '',
    activeWord: null,
    words: [],
    mistakes: 0,
    asyncOperation: null,
    cancelAsyncOperation: null,
  };
};

type GameCheck = (state: GameState) => boolean;
type WordCheck = (state: GameState, wordId: string) => boolean;
type CategoryCheck = (state: GameState, currentRoutePath: string) => boolean;

export const isGameMode: GameCheck = ({ status }) => status !== GameStatus.INITIAL;

export const isGameReady: GameCheck = ({ status }) => status === GameStatus.READY;

export const isGamePlay: GameCheck = ({ status }) => status === GameStatus.MATCHING;

export const isGameStarted: GameCheck = (state) => isGameMode(state) && !isGameReady(state);

export const isGameEnd: GameCheck = (state) => isGameStarted(state) && state.words.length === 0;

export const isWin: GameCheck = (state) => isGameEnd(state) && state.mistakes === 0;

export const isFail: GameCheck = (state) => isGameEnd(state) && state.mistakes > 0;

export const isEnd: GameCheck = ({ status }) => status === GameStatus.END;

export const isWordMatch: WordCheck = (state, wordId) =>
  isGameStarted(state) && wordId === state.activeWord?._id;

export const isWordSolved: WordCheck = (state, wordId) =>
  isGameStarted(state) && state.words.every((word) => word._id !== wordId);

export const isOtherRoutePath: CategoryCheck = (state, currentRoutePath) =>
  !!state.activeRoutePath && state.activeRoutePath !== currentRoutePath;
