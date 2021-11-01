import React from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { FailPage, WinPage } from 'components/page-game-end/page-game-end';
import { PageWords } from 'components/page-words/page-words';
import { useGameContext } from 'services/game/context';

interface GameRouteProps {
  isDifficultWords?: boolean;
}

export const GameRoute = observer(({ isDifficultWords }: GameRouteProps) => {
  const game = useGameContext();
  if (game.isEnd) return <Redirect to="/" />;
  if (game.isWin) return <WinPage />;
  if (game.isFail) return <FailPage />;
  return <PageWords isDifficultWords={isDifficultWords} />;
});
