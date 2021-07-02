import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { CardsField } from 'components/cards-field/cards-field';
import { FailPage, WinPage } from 'components/page-game-end/page-game-end';
import { GameState, isEnd, isFail, isWin } from 'services/game/game-state';

export const GameRoute: FC<{ state: GameState }> = ({ state }) => {
  if (isEnd(state)) return <Redirect to="/" />;
  if (isWin(state)) return <WinPage />;
  if (isFail(state)) return <FailPage />;
  return <CardsField />;
};
