import React, { useState } from 'react';

import { StatsField } from 'services/stats/word-stats-extend';
import { Order, ORDER_MAP } from 'types/order';

import { HeadCell, HeadOrderCell } from './head-cell';
import { Thead } from './table-style';

const getInitialOrders: () => Record<StatsField, Order> = () => ({
  [StatsField.CATEGORY]: Order.NONE,
  [StatsField.WORD]: Order.NONE,
  [StatsField.TRANSLATION]: Order.NONE,
  [StatsField.TRAIN]: Order.NONE,
  [StatsField.ASK_COUNT]: Order.NONE,
  [StatsField.ASK_PERCENT]: Order.NONE,
  [StatsField.FLIP_COUNT]: Order.NONE,
  [StatsField.FLIP_PERCENT]: Order.NONE,
  [StatsField.GAME]: Order.NONE,
  [StatsField.MATCH_COUNT]: Order.NONE,
  [StatsField.MATCH_PERCENT]: Order.NONE,
  [StatsField.ERROR_COUNT]: Order.NONE,
  [StatsField.ERROR_PERCENT]: Order.NONE,
});

interface TableHeaderProps {
  onOrderChange: (field: StatsField, order: Order) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ onOrderChange }) => {
  const [orders, setOrders] = useState(getInitialOrders());

  const handleChangeOrder = (field: StatsField) => () => {
    const prev = orders[field];
    const next = ORDER_MAP.get(prev) || Order.NONE;
    setOrders({ ...getInitialOrders(), [field]: next });
    onOrderChange(field, next);
  };

  const getProps = (text: string, className: string, field: StatsField, rowSpan?: number) => ({
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
        <HeadOrderCell {...getProps('category', 'category', StatsField.CATEGORY, 3)} />
        <HeadOrderCell {...getProps('word', 'word', StatsField.WORD, 3)} />
        <HeadOrderCell {...getProps('translation', 'translation', StatsField.TRANSLATION, 3)} />
        <HeadCell colSpan={5} className="train" text="train" />
        <HeadCell colSpan={5} className="game" text="game" />
      </tr>
      <tr>
        <HeadOrderCell {...getProps('all', 'train', StatsField.TRAIN, 2)} />
        <HeadCell colSpan={2} className="train-ask-a" text="ask" />
        <HeadCell colSpan={2} className="train-flip-a" text="flip" />
        <HeadOrderCell {...getProps('all', 'game', StatsField.GAME, 2)} />
        <HeadCell colSpan={2} className="game-match-a" text="match" />
        <HeadCell colSpan={2} className="game-error-a" text="error" />
      </tr>
      <tr>
        <HeadOrderCell {...getProps('sum', 'train-ask-a', StatsField.ASK_COUNT)} />
        <HeadOrderCell {...getProps('%', 'train-ask-b', StatsField.ASK_PERCENT)} />
        <HeadOrderCell {...getProps('sum', 'train-flip-a', StatsField.FLIP_COUNT)} />
        <HeadOrderCell {...getProps('%', 'train-flip-b', StatsField.FLIP_PERCENT)} />
        <HeadOrderCell {...getProps('sum', 'game-match-a', StatsField.MATCH_COUNT)} />
        <HeadOrderCell {...getProps('%', 'game-match-b', StatsField.MATCH_PERCENT)} />
        <HeadOrderCell {...getProps('sum', 'game-error-a', StatsField.ERROR_COUNT)} />
        <HeadOrderCell {...getProps('%', 'game-error-b', StatsField.ERROR_PERCENT)} />
      </tr>
    </Thead>
  );
};
