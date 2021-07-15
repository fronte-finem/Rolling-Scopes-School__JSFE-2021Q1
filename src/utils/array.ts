export function updateArray<T>(array: T[], item: T, comparator: (x: T) => (y: T) => boolean): T[] {
  const predicate = comparator(item);
  const index = array.findIndex(predicate);
  if (index < 0) return array;
  return [...array.slice(0, index), item, ...array.slice(index + 1)];
}
