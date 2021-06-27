export interface WordStats {
  wordId: number;
  clicks: number;
  solved: number;
}

export function updateWordsStats(
  oldStats: WordStats[],
  clickedWordId: number,
  isSolved: boolean
): WordStats[] {
  const wordStats = oldStats.find(({ wordId }) => wordId === clickedWordId);
  if (!wordStats) return [...oldStats, newWordStats(clickedWordId, isSolved)];
  const newStats = oldStats.filter(({ wordId }) => wordId !== clickedWordId);
  newStats.push(updateWordStats(wordStats, isSolved));
  return newStats;
}

function updateWordStats({ wordId, clicks, solved }: WordStats, isSolved: boolean): WordStats {
  return {
    wordId,
    clicks: clicks + 1,
    solved: isSolved ? solved + 1 : solved,
  };
}

function newWordStats(clickedWordId: number, isSolved: boolean): WordStats {
  return { wordId: clickedWordId, clicks: 1, solved: isSolved ? 1 : 0 };
}
