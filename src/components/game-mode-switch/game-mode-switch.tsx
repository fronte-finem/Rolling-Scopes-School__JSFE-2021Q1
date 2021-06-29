import React, { useState } from 'react';

import { GameActionType } from 'services/game/game-action';
import { StyledProps } from 'types/styled';

import { useGameContext } from '../../services/game/game-context';
import { ModePlay, ModeTrain, StyledGameModeSwitch, Switch } from './style';

export const GameModeSwitch = ({ className }: StyledProps): JSX.Element => {
  const [play, setPlay] = useState(false);
  const { dispatch } = useGameContext();

  const switchClassName = `${className || ''} ${play ? 'play' : ''}`;

  const handleChangeMode = () => {
    setPlay(!play);
    dispatch({ type: play ? GameActionType.DISABLE : GameActionType.ENABLE });
  };

  return (
    <StyledGameModeSwitch className={switchClassName} onClick={handleChangeMode}>
      <ModeTrain>train</ModeTrain>
      <ModePlay>play</ModePlay>
      <Switch />
    </StyledGameModeSwitch>
  );
};
