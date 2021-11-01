import React from 'react';

import { MinimalViewWordStat } from 'services/word-stat/model';
import { Order, ORDER_MAP } from 'types/order';

import { HeadCell, HeadOrderCell } from './head-cell';
import { Thead } from './table-style';

type MapOrder<T> = Record<keyof T, Order>;

const getInitialOrders: () => MapOrder<MinimalViewWordStat> = () => ({
  category: Order.NONE,
  word: Order.NONE,
  translation: Order.NONE,
  totalTrain: Order.NONE,
  listenCount: Order.NONE,
  listenPercent: Order.NONE,
  translateCount: Order.NONE,
  translatePercent: Order.NONE,
  totalGame: Order.NONE,
  matchCount: Order.NONE,
  matchPercent: Order.NONE,
  errorCount: Order.NONE,
  errorPercent: Order.NONE,
});

interface TableHeaderProps {
  onOrderChange: (field: keyof MinimalViewWordStat, order: Order) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ onOrderChange }) => {
  const [orders, setOrders] = React.useState(getInitialOrders());

  const handleChangeOrder = (field: keyof MinimalViewWordStat) => () => {
    const prev = orders[field];
    const next = ORDER_MAP.get(prev) || Order.NONE;
    setOrders({ ...getInitialOrders(), [field]: next });
    onOrderChange(field, next);
  };

  const getProps = (
    text: string,
    className: string,
    field: keyof MinimalViewWordStat,
    rowSpan?: number
  ) => ({
    text,
    className,
    order: orders[field],
    onOrderChange: handleChangeOrder(field),
    rowSpan,
  });

  return (
    <Thead>
      <tr>
        <HeadCell rowSpan={3} className="num" text="№" />
        <HeadOrderCell {...getProps('category', 'category', 'category', 3)} />
        <HeadOrderCell {...getProps('word', 'word', 'word', 3)} />
        <HeadOrderCell {...getProps('translation', 'translation', 'translation', 3)} />
        <HeadCell colSpan={5} className="train" text="train" />
        <HeadCell colSpan={5} className="game" text="game" />
      </tr>
      <tr>
        <HeadOrderCell {...getProps('all', 'train', 'totalTrain', 2)} />
        <HeadCell colSpan={2} className="train-ask-a" text="listen" />
        <HeadCell colSpan={2} className="train-flip-a" text="flip" />
        <HeadOrderCell {...getProps('all', 'game', 'totalGame', 2)} />
        <HeadCell colSpan={2} className="game-match-a" text="match" />
        <HeadCell colSpan={2} className="game-error-a" text="error" />
      </tr>
      <tr>
        <HeadOrderCell {...getProps('sum', 'train-ask-a', 'listenCount')} />
        <HeadOrderCell {...getProps('%', 'train-ask-b', 'listenPercent')} />
        <HeadOrderCell {...getProps('sum', 'train-flip-a', 'translateCount')} />
        <HeadOrderCell {...getProps('%', 'train-flip-b', 'translatePercent')} />
        <HeadOrderCell {...getProps('sum', 'game-match-a', 'matchCount')} />
        <HeadOrderCell {...getProps('%', 'game-match-b', 'matchPercent')} />
        <HeadOrderCell {...getProps('sum', 'game-error-a', 'errorCount')} />
        <HeadOrderCell {...getProps('%', 'game-error-b', 'errorPercent')} />
      </tr>
    </Thead>
  );
};
