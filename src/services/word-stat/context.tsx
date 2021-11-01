import React from 'react';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';

import { useDataContext } from 'services/data/context';
import { STORAGE_KEY, WordsStatsService } from 'services/word-stat/service';
import { save } from 'utils/local-storage';

const WordsStatsContext = React.createContext<WordsStatsService | undefined>(undefined);

export const WordsStatsContextProvider: React.FC = observer(({ children }) => {
  const dataService = useDataContext();
  const wordsStatsService = new WordsStatsService();

  autorun(() => {
    save(
      STORAGE_KEY,
      wordsStatsService.stats.map((stat) => stat.serialize())
    );
  });

  React.useEffect(() => {
    if (dataService.words.length === 0) return;
    wordsStatsService.actualize(dataService.words);
  }, [dataService.words]);

  return (
    <WordsStatsContext.Provider value={wordsStatsService}>{children}</WordsStatsContext.Provider>
  );
});

export const useWordsStatsService = (): WordsStatsService => {
  const wordsStatsService = React.useContext(WordsStatsContext);
  if (!wordsStatsService) throw new Error('WordsStatsService undefined!');
  return wordsStatsService;
};
