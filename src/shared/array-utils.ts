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
