import { CardFieldModel } from '../../components/cards-field/card-field-model';
import { CardImagesCategory } from '../../services/card-images-urls';
import { IGameSettings } from '../../services/game-settings';

export interface IAppGameConfig {
  readonly settings: Readonly<IGameSettings>;
}

export const APP_GAME_CARD_FIELDS: readonly CardFieldModel[] = [
  new CardFieldModel(3, 4),
  new CardFieldModel(4, 4),
  new CardFieldModel(4, 5),
  new CardFieldModel(4, 6),
  new CardFieldModel(5, 6),
  new CardFieldModel(6, 6),
  new CardFieldModel(6, 7),
  new CardFieldModel(6, 8),
  new CardFieldModel(7, 8),
  new CardFieldModel(8, 8),
];

export const APP_GAME_INITIAL_SHOW_TIME: readonly number[] = [
  5, 10, 15, 20, 25, 30,
];

export const APP_GAME_MISMATCH_SHOW_TIME: readonly number[] = [1, 2, 3, 4, 5];

export const APP_GAME_INITIAL_SETTINGS: Readonly<IGameSettings> = {
  cardImagesCategory: CardImagesCategory.DOGS,
  cardsField: APP_GAME_CARD_FIELDS[5],
  initialShowTime: APP_GAME_INITIAL_SHOW_TIME[1],
  mismatchShowTime: APP_GAME_MISMATCH_SHOW_TIME[2],
};
