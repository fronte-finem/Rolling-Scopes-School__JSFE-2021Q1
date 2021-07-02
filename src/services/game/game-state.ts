import { CategoryDTO } from 'services/data/dto-category';
import { WordDTO } from 'services/data/dto-word';
import { Maybe } from 'types/abstract';

export enum GameStatus {
  INITIAL = 'initial',
  READY = 'ready',
  START = 'start',
  ASYNC_OPERATION = 'async operation',
  VOCALIZE = 'vocalize',
  MATCHING = 'matching',
  HIT = 'hit',
  MISS = 'miss',
  END = 'end',
}

export interface GameState {
  status: GameStatus;
  activeCategory: Maybe<CategoryDTO>;
  activeWord: Maybe<WordDTO>;
  words: WordDTO[];
  mistakes: number;
  cancelAsync: null | (() => void);
}

export const getInitialGameState = (): GameState => {
  return {
    status: GameStatus.INITIAL,
    activeCategory: null,
    activeWord: null,
    words: [],
    mistakes: 0,
    cancelAsync: null,
  };
};

type GameCheck = (state: GameState) => boolean;
type WordCheck = (state: GameState, wordId: number) => boolean;
type CategoryCheck = (state: GameState, categoryPath: string) => boolean;

export const isGameMode: GameCheck = ({ status }) => status !== GameStatus.INITIAL;

export const isGameReady: GameCheck = ({ status }) => status === GameStatus.READY;

export const isGamePlay: GameCheck = ({ status }) => status === GameStatus.MATCHING;

export const isGameStarted: GameCheck = (state) => isGameMode(state) && !isGameReady(state);

export const isGameEnd: GameCheck = (state) => isGameStarted(state) && state.words.length === 0;

export const isWin: GameCheck = (state) => isGameEnd(state) && state.mistakes === 0;

export const isFail: GameCheck = (state) => isGameEnd(state) && state.mistakes > 0;

export const isEnd: GameCheck = ({ status }) => status === GameStatus.END;

export const isWaiting: GameCheck = ({ status }) => status === GameStatus.ASYNC_OPERATION;

export const isWordSolved: WordCheck = (state, wordId) =>
  isGameStarted(state) && state.words.every((dto) => dto.id !== wordId);

export const isOtherCategory: CategoryCheck = (state, categoryPath) =>
  !!state.activeCategory && state.activeCategory.path !== categoryPath;
