// https://github.com/microsoft/TypeScript/issues/1863
// type Key = string | symbol;
// export type State = Record<Key, unknown>;
export type State = Record<string, unknown>;

export interface ICreateElementOptions {
  tag?: keyof HTMLElementTagNameMap;
  styles?: string[];
  text?: string;
}
