import React from 'react';

import { useDataContext } from 'services/data/data-context';
import { CategoryDocument } from 'services/rest-api/category-api';
import { WordDocument } from 'services/rest-api/word-api';
import {
  addAskClick,
  addFlipClick,
  addGameClick,
  addMatchClick,
  getInitialWordStats,
  WordStats,
} from 'services/stats/word-stats';
import {
  getExtendedWordsStats,
  sortExtendedWordsStats,
  StatsField,
  WordStatsExtend,
} from 'services/stats/word-stats-extend';
import { Order } from 'types/order';
import { useLocalStorage } from 'utils/local-storage-hook';

type WordsStatsUpdater = (id: string, words: WordStats[]) => WordStats[];
type WordsStatsPersist = (id: string) => void;

type DifficultWordsGetter = (count?: number) => WordDocument[];

const DEFAULT_MAX_COUNT_DIFFICULT_WORDS = 8;

const factoryPersistUpdater = (
  words: WordStats[],
  updater: WordsStatsUpdater,
  persist: React.Dispatch<React.SetStateAction<WordStats[]>>
): WordsStatsPersist => {
  return (id: string): void => {
    const updatedWords = updater(id, words);
    persist(updatedWords);
  };
};

const STORAGE_KEY = 'fronte-finem--efk--words-stats';

interface IWordsStatsContext {
  categoriesData: CategoryDocument[];
  wordsData: WordDocument[];
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
  const { categoriesData, allWords } = useDataContext();
  const categories = categoriesData.map(({ category }) => category);
  const initialWordsStats = allWords.map((word) => getInitialWordStats(word._id));
  const [wordsStats, setWordsStats] = useLocalStorage<WordStats[]>(STORAGE_KEY, initialWordsStats);
  const [extendedWordsStats, setExtendedWordsStats] = React.useState(
    getExtendedWordsStats(allWords, categories, wordsStats)
  );
  let getDifficultWords = getGetterDifficultWords(extendedWordsStats, allWords);

  console.log('WordsStatsContextProvider', categories, allWords);

  React.useEffect(() => {
    const stats = getExtendedWordsStats(allWords, categories, wordsStats);
    setExtendedWordsStats(stats);
    getDifficultWords = getGetterDifficultWords(stats, allWords);
  }, [allWords, categoriesData, wordsStats]);

  if (wordsStats.length === 0 && initialWordsStats.length > 0) {
    setWordsStats(initialWordsStats);
  }

  const initialValue: IWordsStatsContext = {
    categoriesData: categories,
    wordsData: allWords,
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
  wordsData: WordDocument[]
): DifficultWordsGetter {
  return (count = DEFAULT_MAX_COUNT_DIFFICULT_WORDS) =>
    sortExtendedWordsStats(extendedWordsStats, StatsField.ERROR_PERCENT, Order.DESC)
      .slice(0, count)
      .filter((stats) => stats.data[StatsField.ERROR_PERCENT] > 0)
      .map(({ id }) => wordsData.find((doc) => doc._id === id) as WordDocument);
}
