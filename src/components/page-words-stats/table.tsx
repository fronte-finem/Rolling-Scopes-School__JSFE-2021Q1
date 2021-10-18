import React from 'react';

import { sortExtendedWordsStats, StatsField } from 'services/stats/word-stats-extend';
import { useWordsStatsContext } from 'services/stats/words-stats-context';
import { Order } from 'types/order';

import { TableHeader } from './table-header';
import { Row } from './table-row';
import { StyledTable, Tbody } from './table-style';

export const Table: React.FC = () => {
  const { extendedWordsStats } = useWordsStatsContext();
  const [stats, setStats] = React.useState(extendedWordsStats);

  React.useEffect(() => setStats(extendedWordsStats), [extendedWordsStats]);

  const handleOrderChange = (field: StatsField, order: Order) => {
    setStats(sortExtendedWordsStats(stats, field, order));
  };

  return (
    <StyledTable>
      <TableHeader onOrderChange={handleOrderChange} />
      <Tbody>
        {stats.map(({ id, data }, index) => (
          <Row key={id} id={id} index={index + 1} data={data} />
        ))}
      </Tbody>
    </StyledTable>
  );
};
