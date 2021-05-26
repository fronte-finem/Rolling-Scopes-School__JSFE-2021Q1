import { CardFieldModel } from '../../components/cards-field/card-field-model';
import { CardImagesCategory } from '../../services/card-images-urls';
import { ISerializer } from '../../shared/models/types';

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
  cardsField: CardFieldModel;
  initialShowTime: number;
  mismatchShowTime: number;
}

export class GameSettingsSerializer implements ISerializer<IGameSettings> {
  serialize = (settings: IGameSettings): string => JSON.stringify(settings);

  deserialize = (json: string): IGameSettings => {
    const settings = JSON.parse(json) as IGameSettings;
    const {rows, columns} = settings.cardsField;
    settings.cardsField = new CardFieldModel(rows, columns);
    return settings;
  }
}
