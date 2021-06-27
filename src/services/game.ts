import { Maybe } from 'types/abstract';

import { updateWordsStats, WordStats } from './word-stats';

function getWordId(CategoryId: number, cardId: number) {
  return CategoryId * 100 + cardId;
}

export interface GameState {
  stats: WordStats[];
  activeCategory: Maybe<number>;
  activeCard: Maybe<number>;
  cards: number[];
  solved: boolean;
}

export const initialGameState: GameState = {
  stats: [],
  activeCategory: null,
  activeCard: null,
  cards: [],
  solved: false,
};

export enum GameActionType {
  SELECT,
  ACTIVATE,
  CLICK,
}

export interface GameAction {
  type: GameActionType;
  payload: number;
}

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case GameActionType.SELECT:
      return activateCategory(state, action.payload);
    case GameActionType.ACTIVATE:
      return activateCard(state, action.payload);
    case GameActionType.CLICK:
      return solveCard(state, action.payload);
    default:
      return state;
  }
};

function activateCategory(state: GameState, id: number): GameState {
  if (id === state.activeCategory) return state;
  return { ...state, activeCategory: id };
}

function activateCard(state: GameState, id: number): GameState {
  if (id !== state.activeCard) return { ...state, activeCard: id };
  return state;
}

function solveCard(state: GameState, cardId: number): GameState {
  const { stats, activeCategory, activeCard } = state;
  if (!activeCategory) return state;
  const clickedWordId = getWordId(activeCategory, cardId);
  const isMatch = cardId === activeCard;
  const cards = isMatch ? state.cards.filter((id) => id === cardId) : state.cards;

  return {
    ...state,
    stats: updateWordsStats(stats, clickedWordId, isMatch),
    activeCard: isMatch ? null : activeCard,
    cards,
    solved: cards.length === 0,
  };
}
