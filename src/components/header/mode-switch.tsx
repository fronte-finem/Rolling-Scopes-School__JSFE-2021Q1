import React from 'react';
import { observer } from 'mobx-react-lite';

import { useGameContext } from 'services/game/context';

import { ModeFirst, ModeSecond, StyledModeSwitch, Switch } from './mode-switch-style';

enum ModeTitle {
  TRAIN = 'train',
  PLAY = 'play',
}

export const ModeSwitch: React.FC = observer(() => {
  const game = useGameContext();

  const switchClassName = game.isGameMode ? 'second' : '';

  const handleChangeMode = () => {
    game.isGameMode ? game.disable() : game.enable();
  };

  return (
    <StyledModeSwitch className={switchClassName} onClick={handleChangeMode}>
      <ModeFirst>{ModeTitle.TRAIN}</ModeFirst>
      <ModeSecond>{ModeTitle.PLAY}</ModeSecond>
      <Switch />
    </StyledModeSwitch>
  );
});
