import React from 'react';

import { Game } from 'services/game/service';
import { useWordsStatsService } from 'services/word-stat/context';

const GameContext = React.createContext<Game | undefined>(undefined);

export const GameContextProvider: React.FC = ({ children }) => {
  const wordsStatsService = useWordsStatsService();
  const game = new Game(wordsStatsService);

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};

export const useGameContext = (): Game => {
  const game = React.useContext(GameContext);
  if (!game) throw new Error('GameContext undefined!');
  return game;
};
