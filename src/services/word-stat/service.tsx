import { action, autorun, makeAutoObservable, observable, runInAction } from 'mobx';

import { load, save } from 'services/local-storage/local-storage';
import { CategoryDocument } from 'services/rest-api/category-api';
import { WordDocument } from 'services/rest-api/word-api';
import {
  getActualStats,
  getViewWordsStats,
  initWordStat,
  ViewWordStat,
  WordStat,
  WordStatTuple,
} from 'services/word-stat/model';
import { Order } from 'types/order';
import { sort, updateItemById } from 'utils/array';
import React from 'react';
import { useDataContext } from 'services/data/data-context';

const STORAGE_KEY = 'fronte-finem--efk--words-stats-v2';
const DEFAULT_MAX_COUNT_DIFFICULT_WORDS = 8;

type Update<State> = (state: State) => State;

class WordsStatsService {
  @observable public stats: WordStat[] = load<WordStatTuple[]>(STORAGE_KEY, []).map((data) =>
    WordStat.deserialize(data)
  );

  public constructor() {
    makeAutoObservable(this);
  }

  private updateStat =
    (update: Update<WordStat>) =>
    (id: string): void => {
      runInAction(() => {
        this.stats = updateItemById(id, this.stats, update);
      });
    };

  public listenInc = this.updateStat((stat) => stat.listenInc());

  public translateInc = this.updateStat((stat) => stat.translateInc());

  public matchInc = this.updateStat((stat) => stat.matchInc());

  public errorInc = this.updateStat((stat) => stat.errorInc());

  @action public reset = (): void => {
    this.stats = this.stats.map(({ id, index }) => initWordStat(id, index));
  };

  public actualize = (words: WordDocument[]): void => {
    runInAction(() => {
      this.stats = getActualStats(words, this.stats);
    });
  };

  public getViewWordsStats = (
    words: WordDocument[],
    categories: CategoryDocument[]
  ): ViewWordStat[] => getViewWordsStats(words, categories, this.stats);

  public getDifficultWords = (
    words: WordDocument[],
    count = DEFAULT_MAX_COUNT_DIFFICULT_WORDS
  ): WordDocument[] => {
    const difficultWordsStats = this.stats.filter((stat) => stat.errorPercent > 0).slice(0, count);
    return sort(Order.DESC, difficultWordsStats, 'errorPercent')
      .map((stat) => words.find((wordDoc) => wordDoc._id === stat.id))
      .filter((word) => word !== undefined) as WordDocument[];
  };
}

const WordsStatsContext = React.createContext<WordsStatsService | undefined>(undefined);

export const WordsStatsContextProvider: React.FC = ({ children }) => {
  const wordsStatsService = new WordsStatsService();
  const { allWords } = useDataContext();

  autorun(() => {
    save(
      STORAGE_KEY,
      wordsStatsService.stats.map((stat) => stat.serialize())
    );
  });

  React.useEffect(() => {
    if (allWords.length === 0) return;
    wordsStatsService.actualize(allWords);
  }, [allWords]);

  return (
    <WordsStatsContext.Provider value={wordsStatsService}>{children}</WordsStatsContext.Provider>
  );
};

export const useWordsStatsService = (): WordsStatsService => {
  const wordsStatsService = React.useContext(WordsStatsContext);
  if (!wordsStatsService) throw new Error('WordsStatsService undefined!');
  return wordsStatsService;
};
