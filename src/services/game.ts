import React, { useEffect, useReducer } from 'react';

import { Maybe } from 'types/abstract';
import { WordDTO } from 'types/word-dto';
import { randomItem } from 'utils/random';

import { CategoryDTO } from '../types/category-dto';

export enum GameStatus {
  INITIAL = 'initial',
  MATCHING = 'matching',
  NEXT_WORD = 'next word',
  VOCALIZE = 'vocalize',
  SOLVED = 'solved',
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

export enum GameActionType {
  START = 'start',
  NEXT_WORD = 'next word',
  VOCALIZE = 'vocalize',
  TO_MATCHING = 'to matching',
  MATCH_WORD = 'match word',
  END = 'end',
}

type StartPayload = { words: WordDTO[]; category: CategoryDTO };

export type GameAction =
  | { type: GameActionType.START; payload: StartPayload }
  | { type: GameActionType.NEXT_WORD }
  | { type: GameActionType.VOCALIZE }
  | { type: GameActionType.TO_MATCHING }
  | { type: GameActionType.MATCH_WORD; payload: { word: WordDTO } }
  | { type: GameActionType.END };

export type GameDispatch = React.Dispatch<GameAction>;

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case GameActionType.START:
      return startGame(state, action.payload);
    case GameActionType.NEXT_WORD:
      return nextWord(state);
    case GameActionType.VOCALIZE:
      return vocalize(state);
    case GameActionType.TO_MATCHING:
      return toMatching(state);
    case GameActionType.MATCH_WORD:
      return matchWord(state, action.payload.word);
    case GameActionType.END:
      return endGame(state);
    default:
      return state;
  }
};

function startGame(state: GameState, { words, category }: StartPayload): GameState {
  return { ...state, status: GameStatus.NEXT_WORD, activeCategory: category, words };
}

function nextWord(state: GameState): GameState {
  return { ...state, status: GameStatus.VOCALIZE, activeWord: randomItem(state.words) };
}

function vocalize(state: GameState): GameState {
  return { ...state, status: GameStatus.VOCALIZE };
}

function toMatching(state: GameState): GameState {
  return { ...state, status: GameStatus.MATCHING };
}

function matchWord(state: GameState, word: WordDTO): GameState {
  const { activeWord, mistakes } = state;
  const isMatch = word.id === activeWord?.id;
  const status = isMatch ? GameStatus.NEXT_WORD : GameStatus.MATCHING;
  const words = isMatch ? state.words.filter((dto) => dto.id !== word.id) : state.words;

  return {
    ...state,
    activeWord: isMatch ? null : activeWord,
    mistakes: isMatch ? mistakes + 1 : mistakes,
    words,
    status: words.length === 0 ? GameStatus.SOLVED : status,
  };
}

function endGame(state: GameState): GameState {
  return { ...state, status: GameStatus.INITIAL };
}

interface GameContextInterface {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export const GameContext = React.createContext<GameContextInterface>(undefined!);

export function useGameCycle(): readonly [GameState, React.Dispatch<GameAction>] {
  const [gameState, dispatch] = useReducer(gameReducer, getInitialGameState());

  useEffect(() => {
    switch (gameState.status) {
      case GameStatus.NEXT_WORD: {
        dispatch({ type: GameActionType.NEXT_WORD });
        break;
      }
      case GameStatus.VOCALIZE: {
        (async () => {
          if (gameState.activeWord) await new Audio(gameState.activeWord?.audio).play();
          dispatch({ type: GameActionType.TO_MATCHING });
        })();
        break;
      }
      default:
        break;
    }
  });

  return [gameState, dispatch] as const;
}
