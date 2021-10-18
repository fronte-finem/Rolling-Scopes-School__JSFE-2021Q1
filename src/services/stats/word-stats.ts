export type WordStats = readonly [
  id: number,
  ask: number,
  flip: number,
  game: number,
  match: number
];

export const getInitialWordStats = (id = 0): WordStats => [id, 0, 0, 0, 0];

type WordStatsUpdater = (wordStats: WordStats) => WordStats;

export const askClick: WordStatsUpdater = ([id, ask, flip, game, match]: WordStats) => [
  id,
  ask + 1,
  flip,
  game,
  match,
];
export const flipClick: WordStatsUpdater = ([id, ask, flip, game, match]: WordStats) => [
  id,
  ask,
  flip + 1,
  game,
  match,
];
export const gameClick: WordStatsUpdater = ([id, ask, flip, game, match]: WordStats) => [
  id,
  ask,
  flip,
  game + 1,
  match,
];
export const matchClick: WordStatsUpdater = ([id, ask, flip, game, match]: WordStats) => [
  id,
  ask,
  flip,
  game + 1,
  match + 1,
];

type AbstractWordsStatsUpdater = (
  id: number,
  words: WordStats[],
  updater: WordStatsUpdater
) => WordStats[];

export const updateWord: AbstractWordsStatsUpdater = (wordId, words, updater) => {
  const wordStats = words.find(([id]) => id === wordId) || getInitialWordStats(wordId);
  const filteredWords = words.filter(([id]) => id !== wordId);
  filteredWords.push(updater(wordStats));
  return filteredWords;
};

type WordsStatsUpdater = (id: number, words: WordStats[]) => WordStats[];

export const addAskClick: WordsStatsUpdater = (id, words) => updateWord(id, words, askClick);
export const addFlipClick: WordsStatsUpdater = (id, words) => updateWord(id, words, flipClick);
export const addGameClick: WordsStatsUpdater = (id, words) => updateWord(id, words, gameClick);
export const addMatchClick: WordsStatsUpdater = (id, words) => updateWord(id, words, matchClick);
