import { CategoryDocument } from 'services/rest-api/category-api';
import { WordDocument } from 'services/rest-api/word-api';
import { WordStats } from 'services/stats/word-stats';
import { Order } from 'types/order';

export enum StatsField {
  CATEGORY,
  WORD,
  TRANSLATION,
  TRAIN,
  ASK_COUNT,
  ASK_PERCENT,
  FLIP_COUNT,
  FLIP_PERCENT,
  GAME,
  MATCH_COUNT,
  MATCH_PERCENT,
  ERROR_COUNT,
  ERROR_PERCENT,
}

export interface WordStatsExtend {
  id: string;
  data: Record<StatsField, string | number>;
}

const calcPercents = (all: number, part: number) => Math.round((part / all) * 100) || 0;

export function getExtendedWordStats(
  category: string,
  wordDoc: WordDocument,
  stats: WordStats
): WordStatsExtend {
  const [, ask, flip, game, match] = stats;
  const train = ask + flip;
  const error = game - match;
  return {
    id: wordDoc._id,
    data: {
      [StatsField.CATEGORY]: category,
      [StatsField.WORD]: wordDoc.word,
      [StatsField.TRANSLATION]: wordDoc.translation,
      [StatsField.TRAIN]: train,
      [StatsField.ASK_COUNT]: ask,
      [StatsField.ASK_PERCENT]: calcPercents(train, ask),
      [StatsField.FLIP_COUNT]: flip,
      [StatsField.FLIP_PERCENT]: calcPercents(train, flip),
      [StatsField.GAME]: game,
      [StatsField.MATCH_COUNT]: match,
      [StatsField.MATCH_PERCENT]: calcPercents(game, match),
      [StatsField.ERROR_COUNT]: error,
      [StatsField.ERROR_PERCENT]: calcPercents(game, error),
    },
  };
}

export const getExtendedWordsStats = (
  words: WordDocument[],
  categories: CategoryDocument[],
  wordsStats: WordStats[]
): WordStatsExtend[] => {
  return words
    .map((doc): null | WordStatsExtend => {
      const category = categories.find(({ _id }) => _id === (doc.category as unknown as string));
      if (!category) return null;
      const stats = wordsStats.find(([id]) => id === doc._id);
      if (!stats) return null;
      return getExtendedWordStats(category.name, doc, stats);
    })
    .filter((props) => props !== null) as WordStatsExtend[];
};

type Comparator = (a: WordStatsExtend, b: WordStatsExtend) => number;

function compare(order: Order, key: StatsField): Comparator {
  return function comparator(a: WordStatsExtend, b: WordStatsExtend) {
    if (order === Order.NONE) return 0;
    const [propA, propB] = [a.data[key], b.data[key]];
    if (typeof propA === 'string' && typeof propB === 'string')
      return order === Order.ASC ? propA.localeCompare(propB) : propB.localeCompare(propA);
    if (typeof propA === 'number' && typeof propB === 'number')
      return order === Order.ASC ? propA - propB : propB - propA;
    return 0;
  };
}

export const sortExtendedWordsStats = (
  stats: WordStatsExtend[],
  field: StatsField,
  order: Order
): WordStatsExtend[] => {
  if (order === Order.NONE) return [...stats].sort((a, b) => a.id.localeCompare(b.id));
  return [...stats].sort(compare(order, field));
};
