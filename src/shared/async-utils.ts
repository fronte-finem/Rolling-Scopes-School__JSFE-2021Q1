export function delay<T>(time: number, pass: T): Promise<T> {
  return new Promise((resolve) => setTimeout(resolve, time, pass));
}

export async function timer(time: number, cancelPromise?: Promise<null>): Promise<boolean> {
  let id = 0;
  const timerPromise = new Promise<number>((resolve) => {
    id = setTimeout(resolve, time, id);
  });
  if (cancelPromise) {
    const maybeTimeout = await Promise.race([cancelPromise, timerPromise]);
    if (maybeTimeout === null) {
      clearTimeout(id);
      return false;
    }
  } else {
    await timerPromise;
  }
  return true;
}

export enum PromiseState {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

export interface PromiseInfo<T> {
  promise: Promise<T>;
  state: PromiseState;
}

export async function getPromiseInfo<T>(promise: Promise<T>): Promise<PromiseInfo<T>> {
  const state = {};
  const result: PromiseInfo<T> = { promise, state: PromiseState.PENDING };
  try {
    const maybeState = await Promise.race([promise, state]);
    if (maybeState === state) return result;
  } catch (error) {
    result.state = PromiseState.REJECTED;
    return result;
  }
  result.state = PromiseState.FULFILLED;
  return result;
}
