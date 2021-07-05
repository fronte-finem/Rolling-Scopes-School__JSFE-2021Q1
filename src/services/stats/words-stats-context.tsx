import React, { useEffect, useState } from 'react';

import { useDataContextWithChecks } from 'services/data/data-context';
import { CategoryDTO } from 'services/data/dto-category';
import { WordDTO } from 'services/data/dto-word';
import { Order } from 'types/order';
import { useLocalStorage } from 'utils/local-storage-hook';

import {
  addAskClick,
  addFlipClick,
  addGameClick,
  addMatchClick,
  getInitialWordStats,
  WordStats,
} from './word-stats';
import {
  getExtendedWordsStats,
  sortExtendedWordsStats,
  StatsField,
  WordStatsExtend,
} from './word-stats-extend';

type WordsStatsUpdater = (id: number, words: WordStats[]) => WordStats[];
type WordsStatsPersist = (id: number) => void;

type DifficultWordsGetter = (count?: number) => WordDTO[];

const DEFAULT_MAX_COUNT_DIFFICULT_WORDS = 8;

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

const STORAGE_KEY = 'fronte-finem--efk--words-stats';

interface IWordsStatsContext {
  categoriesData: CategoryDTO[];
  wordsData: WordDTO[];
  wordsStats: WordStats[];
  extendedWordsStats: WordStatsExtend[];
  askClick: WordsStatsPersist;
  flipClick: WordsStatsPersist;
  gameClick: WordsStatsPersist;
  matchClick: WordsStatsPersist;
  resetStats: () => void;
  setExtendedWordsStats: React.Dispatch<React.SetStateAction<WordStatsExtend[]>>;
  getDifficultWords: DifficultWordsGetter;
}

const WordsStatsContext = React.createContext<IWordsStatsContext | undefined>(undefined);

export const WordsStatsContextProvider: React.FC = ({ children }) => {
  const [categoriesData, wordsData] = useDataContextWithChecks();
  const initialWordsStats = wordsData.map((dto) => getInitialWordStats(dto.id));
  const [wordsStats, setWordsStats] = useLocalStorage<WordStats[]>(STORAGE_KEY, initialWordsStats);
  const [extendedWordsStats, setExtendedWordsStats] = useState(
    getExtendedWordsStats(wordsData, categoriesData, wordsStats)
  );
  let getDifficultWords = getGetterDifficultWords(extendedWordsStats, wordsData);

  useEffect(() => {
    const stats = getExtendedWordsStats(wordsData, categoriesData, wordsStats);
    setExtendedWordsStats(stats);
    getDifficultWords = getGetterDifficultWords(stats, wordsData);
  }, [wordsData, categoriesData, wordsStats]);

  if (wordsStats.length === 0 && initialWordsStats.length > 0) {
    setWordsStats(initialWordsStats);
  }

  const initialValue: IWordsStatsContext = {
    categoriesData,
    wordsData,
    wordsStats,
    extendedWordsStats,
    setExtendedWordsStats,
    askClick: factoryPersistUpdater(wordsStats, addAskClick, setWordsStats),
    flipClick: factoryPersistUpdater(wordsStats, addFlipClick, setWordsStats),
    gameClick: factoryPersistUpdater(wordsStats, addGameClick, setWordsStats),
    matchClick: factoryPersistUpdater(wordsStats, addMatchClick, setWordsStats),
    resetStats: () => setWordsStats(wordsStats.map(([id]) => getInitialWordStats(id))),
    getDifficultWords,
  };

  return <WordsStatsContext.Provider value={initialValue}>{children}</WordsStatsContext.Provider>;
};

export const useWordsStatsContext = (): IWordsStatsContext => {
  const context = React.useContext(WordsStatsContext);

  if (context === undefined) {
    throw Error(
      'ExtendedWordsStatsContext must be used inside of a ExtendedWordsStatsContextProvider'
    );
  }

  return context;
};

function getGetterDifficultWords(
  extendedWordsStats: WordStatsExtend[],
  wordsData: WordDTO[]
): DifficultWordsGetter {
  return (count = DEFAULT_MAX_COUNT_DIFFICULT_WORDS) =>
    sortExtendedWordsStats(extendedWordsStats, StatsField.ERROR_PERCENT, Order.DESC)
      .slice(0, count)
      .filter((stats) => stats.data[StatsField.ERROR_PERCENT] > 0)
      .map(({ id }) => wordsData.find((dto) => dto.id === id) as WordDTO);
}
