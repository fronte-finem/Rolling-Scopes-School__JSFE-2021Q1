import { CardImagesCategory } from '../../services/card-images-urls';

export type CardField = readonly [columns: number, rows: number];

export type GameDifficulty = {
  readonly cardField: CardField;
  readonly initialShowTime: number;
  readonly scoreCoefficient: number;
};

export type GameDifficultyMap = Readonly<{
  12: GameDifficulty;
  16: GameDifficulty;
  20: GameDifficulty;
  24: GameDifficulty;
  30: GameDifficulty;
  36: GameDifficulty;
  42: GameDifficulty;
  48: GameDifficulty;
  56: GameDifficulty;
  64: GameDifficulty;
}>;

export type CardsAmount = keyof GameDifficultyMap;

export interface IGameSettings {
  cardImagesCategory: CardImagesCategory;
  cardsAmount: keyof GameDifficultyMap;
}
