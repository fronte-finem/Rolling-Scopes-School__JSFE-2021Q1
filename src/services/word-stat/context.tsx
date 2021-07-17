import React from 'react';
import { autorun } from 'mobx';

import { useDataContext } from 'services/data/data-context';
import { STORAGE_KEY, WordsStatsService } from 'services/word-stat/service';
import { save } from 'utils/local-storage';

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
