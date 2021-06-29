import React, { FC } from 'react';

import { GameAction } from './game-action';
import { useGameCycle } from './game-cycle';
import { GameState } from './game-state';

export type GameDispatch = React.Dispatch<GameAction>;

interface GameContextInterface {
  gameState: GameState;
  dispatch: GameDispatch;
}

const GameContext = React.createContext<GameContextInterface | undefined>(undefined);

export const GameContextProvider: FC = ({ children }) => {
  const [gameState, dispatch] = useGameCycle();

  return <GameContext.Provider value={{ gameState, dispatch }}>{children}</GameContext.Provider>;
};

export const useGameContext = (): GameContextInterface => {
  const context = React.useContext(GameContext);

  if (context === undefined) {
    throw Error('GameContext must be used inside of a GameContextProvider');
  }

  return context;
};
