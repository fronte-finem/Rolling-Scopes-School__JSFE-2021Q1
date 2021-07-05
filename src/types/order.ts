export enum Order {
  NONE = 'none',
  ASC = 'asc',
  DESC = 'desc',
}

export const ORDER_MAP: Readonly<Map<Order, Order>> = new Map([
  [Order.NONE, Order.ASC],
  [Order.ASC, Order.DESC],
  [Order.DESC, Order.NONE],
]);
