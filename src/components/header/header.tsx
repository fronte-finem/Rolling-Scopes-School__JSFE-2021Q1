import React from 'react';

import { useCategoryLocation } from 'components/category/category-link';
import { useWordsData } from 'services/data/data-context';
import { GameActionType } from 'services/game/game-action';
import { useGameContext } from 'services/game/game-context';
import { isGameMode, isGameReady, isGameStarted } from 'services/game/game-state';
import { StyledProps } from 'types/styled';

import { BtnStart, StyledHeader, StyledHeading, StyledModeSwitch, Wrapper } from './header-style';

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

  return (
    <StyledHeader className={className}>
      <Wrapper>
        <StyledHeading>English for kids</StyledHeading>
        {isCategory && isGameMode(gameState) && (
          <BtnStart onClick={handleStartGame}>
            {isGameStarted(gameState) ? 'REPEAT WORD' : 'START GAME'}
          </BtnStart>
        )}
        <StyledModeSwitch firstName="train" secondName="play" changeMode={handleChangeMode} />
      </Wrapper>
    </StyledHeader>
  );
};
