// min and max included
export function randomFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomItem<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)];
}
