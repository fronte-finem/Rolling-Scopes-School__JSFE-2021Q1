import { Order } from 'types/order';

export function updateItem<T>(array: T[], item: T, comparator: (x: T) => (y: T) => boolean): T[] {
  const predicate = comparator(item);
  const index = array.findIndex(predicate);
  if (index < 0) return array;
  return [...array.slice(0, index), item, ...array.slice(index + 1)];
}

interface WithId {
  id: string;
}

export function updateItemById<T extends WithId>(id: string, array: T[], update: (x: T) => T): T[] {
  const index = array.findIndex((value) => value.id === id);
  if (index < 0) return array;
  return [...array.slice(0, index), update(array[index]), ...array.slice(index + 1)];
}

function applyOrder<T>(order: Order, a: T, b: T) {
  if (order === Order.NONE) return 0;
  if (typeof a === 'string' && typeof b === 'string')
    return order === Order.ASC ? a.localeCompare(b) : b.localeCompare(a);
  if (typeof a === 'number' && typeof b === 'number') return order === Order.ASC ? a - b : b - a;
  return 0;
}

export function sort<T, K extends keyof T>(order: Order, array: T[], key: K): T[] {
  if (order === Order.NONE) return array;
  return [...array].sort((a: T, b: T) => applyOrder(order, a[key], b[key]));
}

export function sort2<T, K1 extends keyof T, K2 extends keyof T[K1]>(
  order: Order,
  array: T[],
  key1: K1,
  key2: K2
): T[] {
  if (order === Order.NONE) return array;
  return [...array].sort((a: T, b: T) => applyOrder(order, a[key1][key2], b[key1][key2]));
}
