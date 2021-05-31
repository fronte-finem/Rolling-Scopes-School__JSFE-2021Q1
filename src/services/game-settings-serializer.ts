import { CardFieldModel } from 'components/cards-field/card-field-model';
import { ISerializer } from 'shared/models/types';

import { IGameSettings } from './game-settings';

export class GameSettingsSerializer implements ISerializer<IGameSettings> {
  public serialize = (settings: IGameSettings): string =>
    JSON.stringify(settings);

  public deserialize = (json: string): IGameSettings => {
    const settings = JSON.parse(json) as IGameSettings;
    const { rows, columns } = settings.cardsField;
    settings.cardsField = new CardFieldModel(rows, columns);
    return settings;
  };
}
