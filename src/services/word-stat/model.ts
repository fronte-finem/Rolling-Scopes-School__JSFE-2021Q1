import { CategoryDocument } from 'services/rest-api/category-api';
import { WordDocument } from 'services/rest-api/word-api';
import { Order } from 'types/order';
import { sort } from 'utils/array';

export interface TrainStat {
  readonly listenCount: number;
  readonly translateCount: number;
}

export interface GameStat {
  readonly matchCount: number;
  readonly errorCount: number;
}

export interface MinimalViewWordStat extends TrainStat, GameStat {
  category: string;
  word: string;
  translation: string;
  totalTrain: number;
  listenPercent: number;
  translatePercent: number;
  totalGame: number;
  matchPercent: number;
  errorPercent: number;
}

export interface IWordStat extends TrainStat, GameStat {
  readonly id: string;
  readonly index: number;
}

export interface ViewWordStat extends IWordStat, MinimalViewWordStat {}

export type WordStatTuple = [
  index: number,
  id: string,
  listenCount: number,
  translateCount: number,
  matchCount: number,
  errorCount: number
];

const calcPercent = (num: number, total: number): number => Math.round(100 * (num / total || 0));

export class WordStat implements IWordStat {
  public readonly id: string;
  public readonly index: number;
  public readonly listenCount: number;
  public readonly translateCount: number;
  public readonly matchCount: number;
  public readonly errorCount: number;

  public constructor({
    id,
    index,
    listenCount,
    translateCount,
    matchCount,
    errorCount,
  }: IWordStat) {
    this.id = id;
    this.index = index;
    this.listenCount = listenCount;
    this.translateCount = translateCount;
    this.matchCount = matchCount;
    this.errorCount = errorCount;
  }

  public serialize(): WordStatTuple {
    return [
      this.index,
      this.id,
      this.listenCount,
      this.translateCount,
      this.matchCount,
      this.errorCount,
    ];
  }

  public static deserialize([
    index,
    id,
    listenCount,
    translateCount,
    matchCount,
    errorCount,
  ]: WordStatTuple): WordStat {
    return new WordStat({
      index,
      id,
      listenCount,
      translateCount,
      matchCount,
      errorCount,
    });
  }

  public get trainStat(): TrainStat {
    return { listenCount: this.listenCount, translateCount: this.translateCount };
  }

  public get gameStat(): GameStat {
    return { matchCount: this.matchCount, errorCount: this.errorCount };
  }

  public get totalTrain(): number {
    return this.listenCount + this.translateCount;
  }

  public get totalGame(): number {
    return this.matchCount + this.errorCount;
  }

  public get listenPercent(): number {
    return calcPercent(this.listenCount, this.totalTrain);
  }

  public get translatePercent(): number {
    return calcPercent(this.translateCount, this.totalTrain);
  }

  public get matchPercent(): number {
    return calcPercent(this.matchCount, this.totalGame);
  }

  public get errorPercent(): number {
    return calcPercent(this.errorCount, this.totalGame);
  }

  public listenInc(): WordStat {
    return new WordStat({ ...this, listenCount: this.listenCount + 1 });
  }

  public translateInc(): WordStat {
    return new WordStat({ ...this, translateCount: this.translateCount + 1 });
  }

  public matchInc(): WordStat {
    return new WordStat({ ...this, matchCount: this.matchCount + 1 });
  }

  public errorInc(): WordStat {
    return new WordStat({ ...this, errorCount: this.errorCount + 1 });
  }

  public getViewWordStat(wordDoc: WordDocument, category: string): ViewWordStat {
    return {
      id: this.id,
      index: this.index,
      category,
      word: wordDoc.word,
      translation: wordDoc.translation,
      totalTrain: this.totalTrain,
      listenCount: this.listenCount,
      listenPercent: this.listenPercent,
      translateCount: this.translateCount,
      translatePercent: this.translatePercent,
      totalGame: this.totalGame,
      matchPercent: this.matchPercent,
      matchCount: this.matchCount,
      errorCount: this.errorCount,
      errorPercent: this.errorPercent,
    };
  }
}

export const initWordStat = (id: string, index: number): WordStat =>
  new WordStat({ id, index, listenCount: 0, translateCount: 0, matchCount: 0, errorCount: 0 });

const getActualStat = (stats: WordStat[], wordId: string, index: number) => {
  const stat = stats.find(({ id }) => id === wordId);
  return stat ? new WordStat({ ...stat, index }) : initWordStat(wordId, index);
};

export const getActualStats = (words: WordDocument[], stats: WordStat[]): WordStat[] => {
  return words.map((word, index) => getActualStat(stats, word._id, index));
};

const getCategoryName = (word: WordDocument, categories: CategoryDocument[]): string =>
  categories.find(({ _id }) => _id === (word.category as unknown as string))?.name || '';

export const getViewWordsStats = (
  words: WordDocument[],
  categories: CategoryDocument[],
  stats: WordStat[]
): ViewWordStat[] => {
  return words.map((word, index): ViewWordStat => {
    const actualStat = getActualStat(stats, word._id, index);
    return actualStat.getViewWordStat(word, getCategoryName(word, categories));
  });
};

export const sortViewWordStat = (
  order: Order,
  stats: ViewWordStat[],
  key: keyof ViewWordStat
): ViewWordStat[] => {
  if (order === Order.NONE) return sort(Order.ASC, stats, 'index');
  return sort(order, stats, key);
};
