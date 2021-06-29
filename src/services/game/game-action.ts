import React from 'react';

import { CategoryDTO } from 'types/category-dto';
import { WordDTO } from 'types/word-dto';
import { randomItem } from 'utils/random';

import { GameState, GameStatus, getInitialGameState } from './game-state';

export enum GameActionType {
  ENABLE = 'enable',
  DISABLE = 'disable',
  START = 'start',
  NEXT_WORD = 'next word',
  VOCALIZE = 'vocalize',
  TO_MATCHING = 'to matching',
  MATCH_WORD = 'match word',
  END = 'end',
}

type StartPayload = { words: WordDTO[]; category: CategoryDTO };

export type GameAction =
  | { type: GameActionType.ENABLE }
  | { type: GameActionType.DISABLE }
  | { type: GameActionType.START; payload: StartPayload }
  | { type: GameActionType.NEXT_WORD }
  | { type: GameActionType.VOCALIZE }
  | { type: GameActionType.TO_MATCHING }
  | { type: GameActionType.MATCH_WORD; payload: { word: WordDTO } }
  | { type: GameActionType.END };

export type GameDispatch = React.Dispatch<GameAction>;

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  console.log(state, action);
  switch (action.type) {
    case GameActionType.ENABLE:
      return { ...getInitialGameState(), status: GameStatus.READY };
    case GameActionType.DISABLE:
      return getInitialGameState();
    case GameActionType.START:
      return startGame(action.payload);
    case GameActionType.NEXT_WORD:
      return { ...state, status: GameStatus.VOCALIZE, activeWord: randomItem(state.words) };
    case GameActionType.VOCALIZE:
      return { ...state, status: GameStatus.VOCALIZE };
    case GameActionType.TO_MATCHING:
      return { ...state, status: GameStatus.MATCHING };
    case GameActionType.MATCH_WORD:
      return matchWord(state, action.payload.word);
    case GameActionType.END:
      return { ...state, status: GameStatus.READY };
    default:
      return state;
  }
};

function startGame({ words, category }: StartPayload): GameState {
  return {
    ...getInitialGameState(),
    status: GameStatus.START,
    activeCategory: category,
    words: [...words],
  };
}

function matchWord(state: GameState, word: WordDTO): GameState {
  const { activeWord, mistakes } = state;
  const isMatch = word.id === activeWord?.id;
  const status = isMatch ? GameStatus.HIT : GameStatus.MISS;
  const words = isMatch ? state.words.filter((dto) => dto.id !== word.id) : state.words;

  return {
    ...state,
    activeWord: isMatch ? null : activeWord,
    mistakes: isMatch ? mistakes : mistakes + 1,
    words,
    status,
  };
}
