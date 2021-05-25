import { GameDifficultyMap, IGameSettings } from '../pages/game/game-types';
import { CardImagesCategory } from '../services/card-images-urls';

export interface IAppGameConfig {
  readonly settings: Readonly<IGameSettings>;
}

export const APP_GAME_INITIAL_CONFIG: Readonly<IAppGameConfig> = {
  settings: {
    cardImagesCategory: CardImagesCategory.DOGS,
    cardsAmount: 20,
  },
};

export const APP_GAME_DIFFICILTY_CONFIG: GameDifficultyMap = {
  12: { cardField: [4, 3], initialShowTime: 3, scoreCoefficient: 1.0 },
  16: { cardField: [4, 4], initialShowTime: 4, scoreCoefficient: 1.1 },
  20: { cardField: [5, 4], initialShowTime: 5, scoreCoefficient: 1.2 },
  24: { cardField: [6, 4], initialShowTime: 6, scoreCoefficient: 1.4 },
  30: { cardField: [6, 5], initialShowTime: 8, scoreCoefficient: 1.7 },
  36: { cardField: [6, 6], initialShowTime: 10, scoreCoefficient: 2.0 },
  42: { cardField: [7, 6], initialShowTime: 12, scoreCoefficient: 2.5 },
  48: { cardField: [8, 6], initialShowTime: 15, scoreCoefficient: 3.0 },
  56: { cardField: [8, 7], initialShowTime: 20, scoreCoefficient: 3.5 },
  64: { cardField: [8, 8], initialShowTime: 25, scoreCoefficient: 4.0 },
} as const;
