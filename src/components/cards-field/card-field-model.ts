export type CardField = readonly [columns: number, rows: number];

export type CardFieldMap = ReadonlyMap<CardField, number>;

export type CardFieldTypes = Readonly<{
  12: CardField;
  16: CardField;
  20: CardField;
  24: CardField;
  30: CardField;
  36: CardField;
  42: CardField;
  48: CardField;
  56: CardField;
  64: CardField;
}>;

export const CARD_FIELD_SET: CardFieldTypes = {
  12: [4, 3],
  16: [4, 4],
  20: [5, 4],
  24: [6, 4],
  30: [6, 5],
  36: [6, 6],
  42: [7, 6],
  48: [8, 6],
  56: [8, 7],
  64: [8, 8],
} as const;

// function foo(x: keyof CardFieldTypes): CardField {
//   return CardFieldSet[x];
// }
// const [columns, rows] = foo(42);

/* 
export const CARD_FIELD_MAP: CardFieldMap = new Map([
  [[4, 3], 4 * 3],
  [[4, 4], 4 * 4],
  [[5, 4], 5 * 4],
  [[6, 4], 6 * 4],
  [[6, 5], 6 * 5],
  [[6, 6], 6 * 6],
  [[7, 6], 7 * 6],
  [[8, 6], 8 * 6],
  [[8, 7], 8 * 7],
  [[8, 8], 8 * 8],
]);

type KnownKeyosOfMap<T> = T extends ReadonlyMap<infer K, unknown> ? K : never;
type CardFieldMapKeys = KnownKeyosOfMap<typeof CARD_FIELD_MAP>;

function bar(type: CardFieldMapKeys): number | undefined {
  if(CARD_FIELD_MAP.has(type)) {
    return CARD_FIELD_MAP.get(type);
  }
  return undefined;
}

bar([2,2])
 */
