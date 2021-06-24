export type Maybe<T> = T | null;

export type Validator<T> = (data: unknown) => Maybe<T>;
