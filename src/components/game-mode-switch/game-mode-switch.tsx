import React, { useState } from 'react';

import { StyledProps } from 'types/styled';

import { ModePlay, ModeTrain, StyledGameModeSwitch, Switch } from './style';

export const GameModeSwitch = ({ className }: StyledProps): JSX.Element => {
  const [play, setPlay] = useState(false);

  const switchClassName = `${className || ''} ${play ? 'play' : ''}`;

  const handleChangeMode = () => {
    setPlay(!play);
  };

  return (
    <StyledGameModeSwitch className={switchClassName} onClick={handleChangeMode}>
      <ModeTrain>train</ModeTrain>
      <ModePlay>play</ModePlay>
      <Switch />
    </StyledGameModeSwitch>
  );
};
