import React, { useState } from 'react';

import { HeadCell, HeadOrderCell, Order } from './head-cell';
import { Thead } from './table-style';

const ORDER_MAP: Readonly<Map<Order, Order>> = new Map([
  [Order.NONE, Order.ASC],
  [Order.ASC, Order.DESC],
  [Order.DESC, Order.NONE],
]);

export enum OrderField {
  CATEGORY,
  WORD,
  TRANSLATION,
  TRAIN,
  ASK_COUNT,
  ASK_PERCENT,
  FLIP_COUNT,
  FLIP_PERCENT,
  GAME,
  MATCH_COUNT,
  MATCH_PERCENT,
  ERROR_COUNT,
  ERROR_PERCENT,
}

const getInitialOrders: () => Record<OrderField, Order> = () => ({
  [OrderField.CATEGORY]: Order.NONE,
  [OrderField.WORD]: Order.NONE,
  [OrderField.TRANSLATION]: Order.NONE,
  [OrderField.TRAIN]: Order.NONE,
  [OrderField.ASK_COUNT]: Order.NONE,
  [OrderField.ASK_PERCENT]: Order.NONE,
  [OrderField.FLIP_COUNT]: Order.NONE,
  [OrderField.FLIP_PERCENT]: Order.NONE,
  [OrderField.GAME]: Order.NONE,
  [OrderField.MATCH_COUNT]: Order.NONE,
  [OrderField.MATCH_PERCENT]: Order.NONE,
  [OrderField.ERROR_COUNT]: Order.NONE,
  [OrderField.ERROR_PERCENT]: Order.NONE,
});

interface TableHeaderProps {
  onOrderChange: (field: OrderField, order: Order) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ onOrderChange }) => {
  const [orders, setOrders] = useState(getInitialOrders());

  const handleChangeOrder = (field: OrderField) => () => {
    const prev = orders[field];
    const next = ORDER_MAP.get(prev) || Order.NONE;
    setOrders({ ...getInitialOrders(), [field]: next });
    onOrderChange(field, next);
  };

  const getProps = (text: string, className: string, field: OrderField, rowSpan?: number) => ({
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
        <HeadOrderCell {...getProps('category', 'category', OrderField.CATEGORY, 3)} />
        <HeadOrderCell {...getProps('word', 'word', OrderField.WORD, 3)} />
        <HeadOrderCell {...getProps('translation', 'translation', OrderField.TRANSLATION, 3)} />
        <HeadCell colSpan={5} className="train" text="train" />
        <HeadCell colSpan={5} className="game" text="game" />
      </tr>
      <tr>
        <HeadOrderCell {...getProps('all', 'train', OrderField.TRAIN, 2)} />
        <HeadCell colSpan={2} className="train-ask-a" text="ask" />
        <HeadCell colSpan={2} className="train-flip-a" text="flip" />
        <HeadOrderCell {...getProps('all', 'game', OrderField.GAME, 2)} />
        <HeadCell colSpan={2} className="game-match-a" text="match" />
        <HeadCell colSpan={2} className="game-error-a" text="error" />
      </tr>
      <tr>
        <HeadOrderCell {...getProps('sum', 'train-ask-a', OrderField.ASK_COUNT)} />
        <HeadOrderCell {...getProps('%', 'train-ask-b', OrderField.ASK_PERCENT)} />
        <HeadOrderCell {...getProps('sum', 'train-flip-a', OrderField.FLIP_COUNT)} />
        <HeadOrderCell {...getProps('%', 'train-flip-b', OrderField.FLIP_PERCENT)} />
        <HeadOrderCell {...getProps('sum', 'game-match-a', OrderField.MATCH_COUNT)} />
        <HeadOrderCell {...getProps('%', 'game-match-b', OrderField.MATCH_PERCENT)} />
        <HeadOrderCell {...getProps('sum', 'game-error-a', OrderField.ERROR_COUNT)} />
        <HeadOrderCell {...getProps('%', 'game-error-b', OrderField.ERROR_PERCENT)} />
      </tr>
    </Thead>
  );
};
