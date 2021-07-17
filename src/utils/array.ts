
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

