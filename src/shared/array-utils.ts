export function zipWith<A, B, T>(
  func: (x: A, y: B) => T,
  xs: Array<A>,
  ys: Array<B>
): Array<T> {
  return xs.slice(0, ys.length).map((x, i) => func(x, ys[i]));
}

export function zipWithAbstract<T>(
  func: (zs: unknown[]) => T,
  ...xss: Array<Array<unknown>>
): Array<T> {
  return Array.from(
    { length: Math.min(...xss.map((xs) => xs.length)) },
    (_, i) => func(xss.map((xs) => xs[i]))
  );
}

// https://rosettacode.org/wiki/Knuth_shuffle
export function knuthShuffle<T>(array: Array<T>): Array<T> {
  const xs = array;

  for (let i = xs.length - 1; i > 0; i -= 1) {
    const j = Math.floor((i + 1) * Math.random());
    [xs[j], xs[i]] = [xs[i], xs[j]];
  }

  return xs;
}

// https://rosettacode.org/wiki/Binary_search
export function binarySearch<T>(array: Array<T>, value: T): number | undefined {
  let mid;
  let lo = 0;
  let hi = array.length - 1;

  while (lo <= hi) {
    mid = Math.floor((lo + hi) / 2);

    if (array[mid] > value) {
      hi = mid - 1;
    } else if (array[mid] < value) {
      lo = mid + 1;
    } else {
      return mid;
    }
  }

  return undefined;
}
