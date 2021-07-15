import React from 'react';

import { GameActionType } from 'services/game/game-action';
import { useGameContext } from 'services/game/game-context';
import { isGameMode } from 'services/game/game-state';

import { ModeFirst, ModeSecond, StyledModeSwitch, Switch } from './mode-switch-style';

export const ModeSwitch = (): JSX.Element => {
  const { gameState, dispatch } = useGameContext();
  const isGame = isGameMode(gameState);

  const switchClassName = isGame ? 'second' : '';

  const handleChangeMode = () => {
    dispatch({ type: isGame ? GameActionType.DISABLE : GameActionType.ENABLE });
  };

  return (
    <StyledModeSwitch className={switchClassName} onClick={handleChangeMode}>
      <ModeFirst>train</ModeFirst>
      <ModeSecond>play</ModeSecond>
      <Switch />
    </StyledModeSwitch>
  );
};
