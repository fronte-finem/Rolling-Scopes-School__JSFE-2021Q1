import React from 'react';

import { useDataContextWithChecks } from 'services/data/data-context';
import { useWordsStatsContext } from 'services/stats/words-stats-context';

import { TableHeader } from './table-header';
import { TableRow } from './table-row';
import { StyledTable, Tbody } from './table-style';

export const Table: React.FC = () => {
  const [categoriesData, wordsData] = useDataContextWithChecks();
  const { wordsStats } = useWordsStatsContext();

  return (
    <StyledTable>
      <TableHeader />
      <Tbody>
        {wordsData.map((wordDTO, index): null | JSX.Element => {
          const category = categoriesData.find(({ id }) => id === wordDTO.categoryId)?.category;
          if (!category) return null;
          const stats = wordsStats.find(([id]) => id === wordDTO.id);
          if (!stats) return null;
          return (
            <TableRow
              key={wordDTO.id}
              index={index}
              category={category}
              word={wordDTO.word}
              translation={wordDTO.translation}
              stats={stats}
            />
          );
        })}
      </Tbody>
    </StyledTable>
  );
};
