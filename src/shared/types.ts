export type Maybe<T> = T | null;

export type Try<T> = Maybe<T | Error>;

export function toMaybe<A>(tryA: Try<A>): Maybe<A> {
  if (tryA === null || tryA instanceof Error) return null;
  return tryA;
}

export function filterTry<A>(tryArr: Try<A>[]): A[] {
  return tryArr.filter((tryA) => tryA !== null && !(tryA instanceof Error)) as A[];
}

type Func<A, B> = (x: A) => B;
type Fail = (e: Error) => void;

export function maybe<A, B>(maybeA: Maybe<A>, func: Func<A, B>): Maybe<B> {
  if (maybeA === null) return null;
  return func(maybeA);
}

export function safeTry<A, B>(tryA: Try<A>, func: Func<A, B>): Try<B> {
  if (tryA === null) return null;
  if (tryA instanceof Error) return tryA;
  return func(tryA);
}

export function handleTry<A, B>(tryA: Try<A>, func: Func<A, B>, fail: Fail): Maybe<B> {
  if (tryA === null) return null;
  if (tryA instanceof Error) {
    fail(tryA);
    return null;
  }
  return func(tryA);
}
