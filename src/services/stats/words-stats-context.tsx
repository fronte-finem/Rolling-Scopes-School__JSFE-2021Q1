import React from 'react';

import { useDataContextWithChecks } from 'services/data/data-context';
import { useLocalStorage } from 'utils/local-storage-hook';

import {
  addAskClick,
  addFlipClick,
  addGameClick,
  addMatchClick,
  getInitialWordStats,
  WordStats,
} from './word-stats';

type WordsStatsUpdater = (id: number, words: WordStats[]) => WordStats[];
type WordsStatsPersist = (id: number) => void;

const factoryPersistUpdater = (
  words: WordStats[],
  updater: WordsStatsUpdater,
  persist: React.Dispatch<React.SetStateAction<WordStats[]>>
): WordsStatsPersist => {
  return (id: number): void => {
    const updatedWords = updater(id, words);
    persist(updatedWords);
  };
};

interface IWordsStatsContext {
  wordsStats: WordStats[];
  askClick: WordsStatsPersist;
  flipClick: WordsStatsPersist;
  gameClick: WordsStatsPersist;
  matchClick: WordsStatsPersist;
  resetStats: () => void;
}

const WordsStatsContext = React.createContext<IWordsStatsContext | undefined>(undefined);

const STORAGE_KEY = 'fronte-finem--efk--words-stats';

export const WordsStatsContextProvider: React.FC = ({ children }) => {
  const [, wordsData] = useDataContextWithChecks();
  const initialWordsStats = wordsData.map((dto) => getInitialWordStats(dto.id));
  const [wordsStats, setWordsStats] = useLocalStorage<WordStats[]>(STORAGE_KEY, initialWordsStats);

  if (wordsStats.length === 0 && initialWordsStats.length > 0) {
    setWordsStats(initialWordsStats);
  }

  const initialValue: IWordsStatsContext = {
    wordsStats,
    askClick: factoryPersistUpdater(wordsStats, addAskClick, setWordsStats),
    flipClick: factoryPersistUpdater(wordsStats, addFlipClick, setWordsStats),
    gameClick: factoryPersistUpdater(wordsStats, addGameClick, setWordsStats),
    matchClick: factoryPersistUpdater(wordsStats, addMatchClick, setWordsStats),
    resetStats: () => setWordsStats(wordsStats.map(([id]) => getInitialWordStats(id))),
  };

  return <WordsStatsContext.Provider value={initialValue}>{children}</WordsStatsContext.Provider>;
};

export const useWordsStatsContext = (): IWordsStatsContext => {
  const context = React.useContext(WordsStatsContext);

  if (context === undefined) {
    throw Error('WordsStatsContext must be used inside of a WordsStatsContextProvider');
  }

  return context;
};
