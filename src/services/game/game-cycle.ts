import React, { useEffect, useReducer } from 'react';

import { playAudio } from '../audio';
import { GameAction, GameActionType, GameDispatch, gameReducer } from './game-action';
import { GameState, GameStatus, getInitialGameState } from './game-state';

const SOUND_YES = './sfx/yes.mp3';
const SOUND_NO = './sfx/no.mp3';
const SOUND_WIN = './sfx/win.mp3';
const SOUND_FAIL = './sfx/fail.mp3';

type GameCycleResult = readonly [GameState, React.Dispatch<GameAction>];

export function useGameCycle(): GameCycleResult {
  const [gameState, dispatch] = useReducer(gameReducer, getInitialGameState());

  useEffect(() => {
    (async () => {
      switch (gameState.status) {
        case GameStatus.START:
          dispatch({ type: GameActionType.TO_NEXT_WORD });
          break;
        case GameStatus.VOCALIZE:
          await handleVocalize(gameState, dispatch);
          break;
        case GameStatus.HIT:
          await handleHit(gameState, dispatch);
          break;
        case GameStatus.MISS:
          await handleMiss(dispatch);
          break;
        default:
          break;
      }
    })();
  }, [gameState]);

  return [gameState, dispatch] as const;
}

async function handleVocalize(gameState: GameState, dispatch: GameDispatch) {
  await playAudio(gameState.activeWord?.audio);
  dispatch({ type: GameActionType.TO_MATCHING });
}

async function handleMiss(dispatch: GameDispatch) {
  await playAudio(SOUND_NO);
  dispatch({ type: GameActionType.TO_MATCHING });
}

async function handleHit(gameState: GameState, dispatch: GameDispatch) {
  await playAudio(SOUND_YES);
  if (gameState.words.length > 0) {
    dispatch({ type: GameActionType.TO_NEXT_WORD });
  } else {
    const isWin = gameState.mistakes === 0;
    dispatch({ type: GameActionType.TO_RESULT_PAGE, payload: { win: isWin } });
    await playAudio(isWin ? SOUND_WIN : SOUND_FAIL);
    dispatch({ type: GameActionType.TO_MAIN_PAGE });
  }
}
