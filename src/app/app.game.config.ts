import { CardFieldModel } from '../components/cards-field/card-field-model';
import { IGameSettings } from '../pages/game/game-types';
import { CardImagesCategory } from '../services/card-images-urls';

export interface IAppGameConfig {
  readonly settings: Readonly<IGameSettings>;
}

export const APP_GAME_CARD_FIELDS: CardFieldModel[] = [
  new CardFieldModel(4, 3),
  new CardFieldModel(4, 4),
  new CardFieldModel(5, 4),
  new CardFieldModel(6, 4),
  new CardFieldModel(6, 5),
  new CardFieldModel(6, 6),
  new CardFieldModel(7, 6),
  new CardFieldModel(8, 6),
  new CardFieldModel(8, 7),
  new CardFieldModel(8, 8),
];

export const APP_GAME_INITIAL_SHOW_TIME: number[] = Array.from(
  {
    length: 6,
  },
  (_, i) => 5 * (i + 1)
);

export const APP_GAME_MISMATCH_SHOW_TIME: number[] = Array.from(
  {
    length: 5,
  },
  (_, i) => i + 1
);

export const APP_GAME_INITIAL_CONFIG: Readonly<IAppGameConfig> = {
  settings: {
    cardImagesCategory: CardImagesCategory.DOGS,
    cardsField: APP_GAME_CARD_FIELDS[5],
    initialShowTime: APP_GAME_INITIAL_SHOW_TIME[1],
    mismatchShowTime: APP_GAME_MISMATCH_SHOW_TIME[2],
  },
};
