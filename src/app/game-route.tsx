import React from 'react';
import { Redirect } from 'react-router-dom';

import { FailPage, WinPage } from 'components/page-game-end/page-game-end';
import { PageWords } from 'components/page-words/page-words';
import { GameState, isEnd, isFail, isWin } from 'services/game/game-state';

interface GameRouteProps {
  state: GameState;
  isDifficultWords?: boolean;
}

export const GameRoute: React.FC<GameRouteProps> = ({ state, isDifficultWords }) => {
  if (isEnd(state)) return <Redirect to="/" />;
  if (isWin(state)) return <WinPage />;
  if (isFail(state)) return <FailPage />;
  return <PageWords isDifficultWords={isDifficultWords} />;
};
