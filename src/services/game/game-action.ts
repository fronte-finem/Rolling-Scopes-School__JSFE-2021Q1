import React from 'react';

import { CategoryDTO } from 'services/data/dto-category';
import { WordDTO } from 'services/data/dto-word';
import { randomItem } from 'utils/random';

import { GameState, GameStatus, getInitialGameState, isGameMode } from './game-state';

export enum GameActionType {
  ENABLE = 'enable',
  DISABLE = 'disable',
  ASYNC_OPERATION = 'async operation',
  START = 'start',
  TO_NEXT_WORD = 'to next word',
  VOCALIZE = 'vocalize',
  TO_MATCHING = 'to matching',
  MATCH_WORD = 'match word',
  TO_MAIN_PAGE = 'to main page',
  RESET = 'reset',
}

type AsyncOperationPayload = { cancel: () => void };
type StartPayload = { words: WordDTO[]; category: CategoryDTO };
type MatchWordPayload = { word: WordDTO };

export type GameAction =
  | { type: GameActionType.ENABLE }
  | { type: GameActionType.DISABLE }
  | { type: GameActionType.ASYNC_OPERATION; payload: AsyncOperationPayload }
  | { type: GameActionType.START; payload: StartPayload }
  | { type: GameActionType.TO_NEXT_WORD }
  | { type: GameActionType.VOCALIZE }
  | { type: GameActionType.TO_MATCHING }
  | { type: GameActionType.MATCH_WORD; payload: MatchWordPayload }
  | { type: GameActionType.TO_MAIN_PAGE }
  | { type: GameActionType.RESET };

export type GameDispatch = React.Dispatch<GameAction>;

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case GameActionType.ENABLE:
      return { ...getInitialGameState(), status: GameStatus.READY };
    case GameActionType.DISABLE:
      return disable(state);
    case GameActionType.ASYNC_OPERATION:
      return { ...state, status: GameStatus.ASYNC_OPERATION, cancelAsync: action.payload.cancel };
    case GameActionType.START:
      return startGame(action.payload);
    case GameActionType.TO_NEXT_WORD:
      return { ...state, status: GameStatus.VOCALIZE, activeWord: randomItem(state.words) };
    case GameActionType.VOCALIZE:
      return { ...state, status: GameStatus.VOCALIZE };
    case GameActionType.TO_MATCHING:
      return toMatching(state);
    case GameActionType.MATCH_WORD:
      return matchWord(state, action.payload);
    case GameActionType.TO_MAIN_PAGE:
      return toMainPage(state);
    case GameActionType.RESET:
      return { ...state, status: GameStatus.READY };
    default:
      return state;
  }
};

function disable(state: GameState): GameState {
  state.cancelAsync?.();
  return getInitialGameState();
}

function toMatching(state: GameState): GameState {
  return isGameMode(state) ? { ...state, status: GameStatus.MATCHING } : state;
}

function toMainPage(state: GameState): GameState {
  return isGameMode(state) ? { ...state, status: GameStatus.END } : state;
}

function startGame({ words, category }: StartPayload): GameState {
  return {
    ...getInitialGameState(),
    status: GameStatus.START,
    activeCategory: category,
    words: [...words],
  };
}

function matchWord(state: GameState, { word }: MatchWordPayload): GameState {
  state.cancelAsync?.();
  const { activeWord, mistakes } = state;
  const isMatch = word.id === activeWord?.id;
  const words = isMatch ? state.words.filter((dto) => dto.id !== word.id) : state.words;
  return {
    ...state,
    status: isMatch ? GameStatus.HIT : GameStatus.MISS,
    activeWord: isMatch ? null : activeWord,
    mistakes: isMatch ? mistakes : mistakes + 1,
    words,
  };
}
