export interface WordStats {
  word: string;
  clicks: number;
  solved: number;
}

export function updateWordsStats(
  oldStats: WordStats[],
  testWord: string,
  isMatch: boolean
): WordStats[] {
  const wordStats = oldStats.find(({ word }) => word === testWord);
  if (!wordStats) return [...oldStats, newWordStats(testWord, isMatch)];
  const newStats = oldStats.filter(({ word }) => word !== testWord);
  newStats.push(updateWordStats(wordStats, isMatch));
  return newStats;
}

function updateWordStats({ word, clicks, solved }: WordStats, isMatch: boolean): WordStats {
  return {
    word,
    clicks: clicks + 1,
    solved: isMatch ? solved + 1 : solved,
  };
}

function newWordStats(word: string, isSolved: boolean): WordStats {
  return { word, clicks: 1, solved: isSolved ? 1 : 0 };
}
