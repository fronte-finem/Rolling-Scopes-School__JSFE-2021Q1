import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { useWordsData } from 'services/data-context';
import { GameActionType } from 'services/game/game-action';
import { useGameContext } from 'services/game/game-context';
import { isGameMode, isGameReady, isGameStarted, isOtherCategory } from 'services/game/game-state';
import { StyledProps } from 'types/styled';

import { StyledGameModeSwitch, StyledHeader, StyledHeading, Wrapper } from './style';

const HeaderWithoutRouter = ({
  className,
  location,
}: StyledProps & RouteComponentProps): JSX.Element => {
  const categoryPath = location.pathname.slice(1);
  const result = useWordsData(categoryPath);
  const { gameState, dispatch } = useGameContext();
  const isCategory = typeof result !== 'string';

  useEffect(() => {
    if (isGameStarted(gameState) && isOtherCategory(gameState, categoryPath)) {
      dispatch({ type: GameActionType.END });
    }
  }, [categoryPath]);

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
        {isCategory && isGameMode(gameState) ? (
          <button type="button" onClick={handleStartGame}>
            {isGameStarted(gameState) ? 'REPEAT WORD' : 'START GAME'}
          </button>
        ) : (
          <StyledHeading>English for kids</StyledHeading>
        )}
        <StyledGameModeSwitch />
      </Wrapper>
    </StyledHeader>
  );
};

export const Header = withRouter(HeaderWithoutRouter);
