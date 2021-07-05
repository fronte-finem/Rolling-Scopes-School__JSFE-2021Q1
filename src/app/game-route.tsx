import React from 'react';
import { Redirect } from 'react-router-dom';

import { PageCardsField } from 'components/page-cards-field/page-cards-field';
import { FailPage, WinPage } from 'components/page-game-end/page-game-end';
import { GameState, isEnd, isFail, isWin } from 'services/game/game-state';

interface GameRouteProps {
  state: GameState;
  isDifficultWords?: boolean;
}

export const GameRoute: React.FC<GameRouteProps> = ({ state, isDifficultWords }) => {
  if (isEnd(state)) return <Redirect to="/" />;
  if (isWin(state)) return <WinPage />;
  if (isFail(state)) return <FailPage />;
  return <PageCardsField isDifficultWords={isDifficultWords} />;
};
