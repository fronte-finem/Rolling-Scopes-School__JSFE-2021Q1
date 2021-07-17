import { action, makeAutoObservable, observable, runInAction } from 'mobx';

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
import { load } from 'utils/local-storage';

export const STORAGE_KEY = 'fronte-finem--efk--words-stats-v2';
const DEFAULT_MAX_COUNT_DIFFICULT_WORDS = 8;

type Update<State> = (state: State) => State;

export class WordsStatsService {
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
    const difficultWordsStats = this.stats.filter((stat) => stat.errorPercent > 0);
    return sort(Order.DESC, difficultWordsStats, 'errorPercent')
      .slice(0, count)
      .map((stat) => words.find((wordDoc) => wordDoc._id === stat.id))
      .filter((word) => word !== undefined) as WordDocument[];
  };
}
