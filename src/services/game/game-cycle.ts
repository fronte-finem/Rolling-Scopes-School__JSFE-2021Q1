import React, { useEffect, useReducer } from 'react';

import { playAudio, playAudioAsyncCancelable } from 'services/audio';
import { useWordsStatsContext } from 'services/stats/words-stats-context';

import { GameAction, GameActionType, GameDispatch, gameReducer } from './game-action';
import { GameState, GameStatus, getInitialGameState, isGameEnd, isWin } from './game-state';

const SOUND_YES = './sfx/yes.mp3';
const SOUND_NO = './sfx/no.mp3';
const SOUND_WIN = './sfx/win.mp3';
const SOUND_FAIL = './sfx/fail.mp3';

type GameCycleResult = readonly [GameState, React.Dispatch<GameAction>];

export function useGameCycle(): GameCycleResult {
  const { gameClick, matchClick } = useWordsStatsContext();
  const [gameState, dispatch] = useReducer(gameReducer, getInitialGameState());

  useEffect(() => {
    (async () => {
      switch (gameState.status) {
        case GameStatus.START:
          dispatch({ type: GameActionType.TO_NEXT_WORD });
          break;
        case GameStatus.VOCALIZE:
          handleVocalize(gameState, dispatch);
          break;
        case GameStatus.HIT:
          gameState.activeWord && matchClick(gameState.activeWord.id);
          handleHit(gameState, dispatch);
          break;
        case GameStatus.MISS:
          gameState.activeWord && gameClick(gameState.activeWord.id);
          handleMiss(dispatch);
          break;
        case GameStatus.SHOW_RESULT:
          await handleShowResult(gameState, dispatch);
          break;
        default:
          break;
      }
    })();
  }, [gameState]);

  return [gameState, dispatch] as const;
}

function handleVocalize(gameState: GameState, dispatch: GameDispatch): void {
  playAudio(gameState.activeWord?.audio || null);
  dispatch({ type: GameActionType.TO_MATCHING });
}

function handleMiss(dispatch: GameDispatch): void {
  playAudio(SOUND_NO);
  dispatch({ type: GameActionType.TO_MATCHING });
}

function handleHit(gameState: GameState, dispatch: GameDispatch): void {
  if (!isGameEnd(gameState)) {
    void playAudio(SOUND_YES);
    dispatch({ type: GameActionType.TO_NEXT_WORD });
  } else {
    const soundSrc = isWin(gameState) ? SOUND_WIN : SOUND_FAIL;
    const [promise, cancel] = playAudioAsyncCancelable(soundSrc);
    dispatch({ type: GameActionType.TO_RESULT_PAGE, payload: { promise, cancel } });
  }
}

async function handleShowResult(
  { asyncOperation }: GameState,
  dispatch: GameDispatch
): Promise<void> {
  await asyncOperation;
  dispatch({ type: GameActionType.TO_MAIN_PAGE });
}
