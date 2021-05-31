import { CardFieldModel } from 'components/cards-field/card-field-model';
import { CardImagesCategory } from 'services/card-images-urls';
import { deepFreeze } from 'shared/object-utils';

export const APP_GAME_SETTINGS = deepFreeze({
  initialShowTime: [5, 10, 15, 20, 25, 30],
  mismatchShowTime: [1, 2, 3, 4, 5],
  cardsField: [
    [3, 4],
    [4, 4],
    [4, 5],
    [4, 6],
    [5, 6],
    [6, 6],
    [6, 7],
    [6, 8],
    [7, 8],
    [8, 8],
  ].map(([r, c]) => new CardFieldModel(r, c)),
});

export const APP_GAME_INITIAL_SETTINGS = deepFreeze({
  cardImagesCategory: CardImagesCategory.DOGS,
  cardsField: APP_GAME_SETTINGS.cardsField[5],
  initialShowTime: APP_GAME_SETTINGS.initialShowTime[1],
  mismatchShowTime: APP_GAME_SETTINGS.mismatchShowTime[2],
});
