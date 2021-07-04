import React, { useEffect, useState } from 'react';

import { useDataContextWithChecks } from 'services/data/data-context';
import { useWordsStatsContext } from 'services/stats/words-stats-context';

import { OrderField, TableHeader } from './table-header';
import { getRowProps, Row, RowProps } from './table-row';
import { StyledTable, Tbody } from './table-style';
import { WordDTO } from 'services/data/dto-word';
import { CategoryDTO } from 'services/data/dto-category';
import { WordStats } from 'services/stats/word-stats';
import { Order } from 'components/page-words-stats/head-cell';

const getRowsProps = (words: WordDTO[], categories: CategoryDTO[], wordsStats: WordStats[]) => {
  return words
    .map((wordDTO): null | RowProps => {
      const category = categories.find(({ id }) => id === wordDTO.categoryId)?.category;
      if (!category) return null;
      const stats = wordsStats.find(([id]) => id === wordDTO.id);
      if (!stats) return null;
      return getRowProps(category, wordDTO, stats);
    })
    .filter((props) => props !== null) as RowProps[];
};

type Comparator = (a: RowProps, b: RowProps) => number;

function compare(order: Order, key: OrderField): Comparator {
  return function (a: RowProps, b: RowProps) {
    if (order === Order.NONE) return 0;
    const [propA, propB] = [a.data[key], b.data[key]];
    if (typeof propA === 'string' && typeof propB === 'string')
      return order === Order.ASC ? propA.localeCompare(propB) : propB.localeCompare(propA);
    if (typeof propA === 'number' && typeof propB === 'number')
      return order === Order.ASC ? propA - propB : propB - propA;
    return 0;
  };
}

const sortRowsProps = (props: RowProps[], field: OrderField, order: Order) => {
  if (order === Order.NONE) return [...props].sort((a, b) => a.id - b.id);
  return [...props].sort(compare(order, field));
};

export const Table: React.FC = () => {
  const [categoriesData, wordsData] = useDataContextWithChecks();
  const { wordsStats } = useWordsStatsContext();
  const [rowsProps, setRowsProps] = useState(getRowsProps(wordsData, categoriesData, wordsStats));

  useEffect(() => {
    setRowsProps(getRowsProps(wordsData, categoriesData, wordsStats));
  }, [wordsData, categoriesData, wordsStats]);

  const handleOrderChange = (field: OrderField, order: Order) => {
    setRowsProps(sortRowsProps(rowsProps, field, order));
  };

  return (
    <StyledTable>
      <TableHeader onOrderChange={handleOrderChange} />
      <Tbody>
        {rowsProps.map(({ id, data }, index) => (
          <Row key={id} id={id} index={index + 1} data={data} />
        ))}
      </Tbody>
    </StyledTable>
  );
};
