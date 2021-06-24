export interface CardDTO {
  readonly word: string;
  readonly translation: string;
  readonly image: string;
  readonly audio: string;
}

export interface CategoryDTO {
  readonly category: string;
  readonly image: string;
  readonly cards: Array<CardDTO>;
}
