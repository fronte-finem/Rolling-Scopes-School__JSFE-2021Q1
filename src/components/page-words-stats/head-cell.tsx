import React from 'react';

import { Order } from 'types/order';
import { StyledProps } from 'types/styled';

import { StyledHeadCell, StyledOrderCell } from './cell-style';

export interface HeadCellProps extends StyledProps {
  text: string;
  rowSpan?: number;
  colSpan?: number;
}

interface OrderCellProps extends HeadCellProps {
  order: Order;
  onOrderChange: () => void;
}

export const HeadCell: React.FC<HeadCellProps> = ({
  text,
  className,
  rowSpan,
  colSpan,
}: HeadCellProps) => {
  return (
    <StyledHeadCell className={className} rowSpan={rowSpan} colSpan={colSpan}>
      {text}
    </StyledHeadCell>
  );
};

export const HeadOrderCell: React.FC<OrderCellProps> = ({
  order,
  onOrderChange,
  text,
  className,
  rowSpan,
  colSpan,
}: OrderCellProps) => {
  const orderName = `${className || ''} ${order}`;

  return (
    <StyledOrderCell
      className={orderName}
      onClick={onOrderChange}
      rowSpan={rowSpan}
      colSpan={colSpan}
    >
      {text}
    </StyledOrderCell>
  );
};
