export interface IToString {
  toString(): string;
}

export interface IEquality {
  equal(model: IEquality): boolean;
}

export interface IHash {
  hash(): string;
}

export interface ISerializer<T> {
  serialize(value: T): string;
  deserialize(json: string): T;
}
