import React from 'react';
import { observer } from 'mobx-react-lite';

import { useDataContext } from 'services/data/data-context';
import { useWordsStatsService } from 'services/word-stat/context';
import { MinimalViewWordStat, sortViewWordStat } from 'services/word-stat/model';
import { Order } from 'types/order';

import { TableHeader } from './table-header';
import { Row } from './table-row';
import { StyledTable, Tbody } from './table-style';

export const Table: React.FC = observer(() => {
  const { allWords, getCategories } = useDataContext();
  const wordsStatsService = useWordsStatsService();
  const [stats, setStats] = React.useState(
    wordsStatsService.getViewWordsStats(allWords, getCategories())
  );

  React.useEffect(
    () => setStats(wordsStatsService.getViewWordsStats(allWords, getCategories())),
    [allWords, wordsStatsService.stats]
  );

  const handleOrderChange = (field: keyof MinimalViewWordStat, order: Order) => {
    setStats(
      sortViewWordStat(order, wordsStatsService.getViewWordsStats(allWords, getCategories()), field)
    );
  };

  return (
    <StyledTable>
      <TableHeader onOrderChange={handleOrderChange} />
      <Tbody>
        {stats.map((stat) => (
          <Row key={stat.id} stat={stat} />
        ))}
      </Tbody>
    </StyledTable>
  );
});
