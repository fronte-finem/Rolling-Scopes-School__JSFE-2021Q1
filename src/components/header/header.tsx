import React from 'react';

import { useCategoryLocation } from 'components/category/category-link';
import { ModeSwitch } from 'components/header/mode-switch';
import { useWordsData } from 'services/data/data-context';
import { GameActionType } from 'services/game/game-action';
import { useGameContext } from 'services/game/game-context';
import { isGameMode, isGameReady, isGameStarted } from 'services/game/game-state';
import { StyledProps } from 'types/styled';

import { BtnStartRepeat } from './btn-start-repeat';
import {
  BtnStartRepeatWrapper,
  ModeSwitchWrapper,
  StyledHeader,
  StyledHeading,
  Wrapper,
} from './header-style';

export const Header = ({ className }: StyledProps): JSX.Element => {
  const categoryName = useCategoryLocation();
  const result = useWordsData(categoryName);
  const { gameState, dispatch } = useGameContext();
  const isCategory = typeof result !== 'string';

  const handleChangeMode = (isSecond: boolean) => {
    dispatch({ type: isSecond ? GameActionType.DISABLE : GameActionType.ENABLE });
  };

  const handleStartGame = () => {
    if (typeof result !== 'string') {
      if (isGameReady(gameState)) {
        const [category, words] = result;
        dispatch({ type: GameActionType.START, payload: { category, words } });
      } else {
        dispatch({ type: GameActionType.VOCALIZE });
      }
    }
  };

  const hideBtnStart = !isCategory || !isGameMode(gameState);

  return (
    <StyledHeader className={className}>
      <Wrapper>
        <StyledHeading>English for kids</StyledHeading>
        <BtnStartRepeatWrapper isHidden={hideBtnStart}>
          <BtnStartRepeat onClick={handleStartGame} isStart={!isGameStarted(gameState)} />
        </BtnStartRepeatWrapper>
        <ModeSwitchWrapper>
          <ModeSwitch firstName="train" secondName="play" changeMode={handleChangeMode} />
        </ModeSwitchWrapper>
      </Wrapper>
    </StyledHeader>
  );
};
