import { Maybe } from 'types/abstract';
import { CategoryDTO } from 'types/category-dto';
import { WordDTO } from 'types/word-dto';

export enum GameStatus {
  INITIAL = 'initial',
  READY = 'ready',
  START = 'start',
  VOCALIZE = 'vocalize',
  MATCHING = 'matching',
  HIT = 'hit',
  MISS = 'miss',
  WIN = 'win',
  FAIL = 'fail',
}

export interface GameState {
  status: GameStatus;
  activeCategory: Maybe<CategoryDTO>;
  activeWord: Maybe<WordDTO>;
  words: WordDTO[];
  mistakes: number;
}

export const getInitialGameState = (): GameState => {
  return {
    status: GameStatus.INITIAL,
    activeCategory: null,
    activeWord: null,
    words: [],
    mistakes: 0,
  };
};

type GameCheck = (state: GameState) => boolean;
type WordCheck = (state: GameState, wordId: number) => boolean;
type CategoryCheck = (state: GameState, categoryPath: string) => boolean;

export const isGameMode: GameCheck = ({ status }) => status !== GameStatus.INITIAL;

export const isGameReady: GameCheck = ({ status }) => status === GameStatus.READY;

export const isGamePlay: GameCheck = ({ status }) => status === GameStatus.MATCHING;

export const isWin: GameCheck = ({ status }) => status === GameStatus.WIN;

export const isFail: GameCheck = ({ status }) => status === GameStatus.FAIL;

export const isWaiting: GameCheck = ({ status }) =>
  status === GameStatus.VOCALIZE || status === GameStatus.HIT || status === GameStatus.MISS;

export const isGameStarted: GameCheck = (state) =>
  isGameMode(state) && state.status !== GameStatus.READY;

export const isWordSolved: WordCheck = (state, wordId) =>
  isGameStarted(state) && state.words.every((dto) => dto.id !== wordId);

export const isOtherCategory: CategoryCheck = (state, categoryPath) =>
  !!state.activeCategory && state.activeCategory.path !== categoryPath;
