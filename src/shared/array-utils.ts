export function zipWith<A, B, T>(func: (x: A, y: B) => T, xs: A[], ys: B[]): T[] {
  const config = { length: Math.min(xs.length, ys.length) };
  return Array.from(config, (_, i) => func(xs[i], ys[i]));
}
