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
  StyledLink,
  Wrapper,
} from './header-style';

const isCategoryPath = (routePath: string) => routePath.startsWith('/category');
const isDifficultWordsPath = (routePath: string) => routePath.startsWith('/difficult');

const getCategoryName = (routePath: string): string => {
  return isCategoryPath(routePath) ? routePath.replace(/^\/category\//, '') : '';
};

export const Header = ({ className }: StyledProps): JSX.Element => {
  const { wordsData, categoriesData, getDifficultWords } = useWordsStatsContext();
  const { pathname } = useLocation();
  const { gameState, dispatch } = useGameContext();
  const [hideBtnStart, setHideBtnStart] = React.useState(true);

  const isCategory = isCategoryPath(pathname);
  const isDifficultWords = isDifficultWordsPath(pathname);
  const categoryName = getCategoryName(pathname);

  React.useEffect(() => {
    if (isDifficultWords && getDifficultWords().length === 0) {
      setHideBtnStart(true);
      return;
    }
    setHideBtnStart(!(isCategory || isDifficultWords) || !isGameMode(gameState));
  }, [isCategory, isDifficultWords, gameState]);

  const handleChangeMode = (isSecond: boolean) => {
    dispatch({ type: isSecond ? GameActionType.DISABLE : GameActionType.ENABLE });
  };

  const handleStartGame = () => {
    if (isCategory || isDifficultWords) {
      if (isGameReady(gameState)) {
        const words = isDifficultWords
          ? getDifficultWords()
          : getWords(categoryName, categoriesData, wordsData);
        dispatch({ type: GameActionType.START, payload: { routePath: pathname, words } });
      } else {
        dispatch({ type: GameActionType.VOCALIZE });
      }
    }
  };

  return (
    <StyledHeader className={className}>
      <Wrapper>
        <StyledHeading>
          <StyledLink to="/">English for kids</StyledLink>
        </StyledHeading>
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
