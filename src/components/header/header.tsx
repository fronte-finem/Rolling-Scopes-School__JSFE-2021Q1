import React from 'react';
import { useLocation } from 'react-router-dom';

import { ModeSwitch } from 'components/header/mode-switch';
import { getWords } from 'services/data/data-context';
import { GameActionType } from 'services/game/game-action';
import { useGameContext } from 'services/game/game-context';
import { isGameMode, isGameReady, isGameStarted } from 'services/game/game-state';
import { useWordsStatsContext } from 'services/stats/words-stats-context';
import { StyledProps } from 'types/styled';

import { BtnStartRepeat } from './btn-start-repeat';
import {
  BtnStartRepeatWrapper,
  ModeSwitchWrapper,
  StyledHeader,
  StyledHeading,
  Wrapper,
} from './header-style';

const isCategory = (routePath: string) => routePath.startsWith('/category');
const isDifficultWords = (routePath: string) => routePath.startsWith('/difficult');

const getCategoryName = (routePath: string): string => {
  return isCategory(routePath) ? routePath.replace(/^\/category\//, '') : '';
};

export const Header = ({ className }: StyledProps): JSX.Element => {
  const { wordsData, categoriesData, getDifficultWords } = useWordsStatsContext();
  const { pathname } = useLocation();
  const { gameState, dispatch } = useGameContext();

  const isDifficult = isDifficultWords(pathname);
  const categoryName = getCategoryName(pathname);

  const handleChangeMode = (isSecond: boolean) => {
    dispatch({ type: isSecond ? GameActionType.DISABLE : GameActionType.ENABLE });
  };

  const handleStartGame = () => {
    if (categoryName || isDifficult) {
      if (isGameReady(gameState)) {
        const words = isDifficult
          ? getDifficultWords()
          : getWords(categoryName, categoriesData, wordsData);
        dispatch({ type: GameActionType.START, payload: { routePath: pathname, words } });
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
