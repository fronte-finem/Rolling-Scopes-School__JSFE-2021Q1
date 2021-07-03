import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { PageCardsField } from 'components/page-cards-field/page-cards-field';
import { FailPage, WinPage } from 'components/page-game-end/page-game-end';
import { GameState, isEnd, isFail, isWin } from 'services/game/game-state';

export const GameRoute: FC<{ state: GameState }> = ({ state }) => {
  if (isEnd(state)) return <Redirect to="/" />;
  if (isWin(state)) return <WinPage />;
  if (isFail(state)) return <FailPage />;
  return <PageCardsField />;
};
