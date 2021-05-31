import { CardFieldModel } from 'components/cards-field/card-field-model';
import { ISerializer } from 'shared/models/types';

import { CardImagesCategory } from './card-images-urls';
import { LocalStorageService } from './local-storage';

const KEY_STORAGE_GAME_SETTINGS =
  'fronte-finem__match-match-game___game-settings';

export interface IGameSettings {
  cardImagesCategory: CardImagesCategory;
  cardsField: CardFieldModel;
  initialShowTime: number;
  mismatchShowTime: number;
}

export interface IGameSettingsService {
  load(): IGameSettings;
  save(settings: IGameSettings): void;
}

export class GameSettingsService implements IGameSettingsService {
  private localStorage: LocalStorageService<IGameSettings>;

  public constructor(
    initialSettings: IGameSettings,
    serializer: ISerializer<IGameSettings>
  ) {
    this.localStorage = new LocalStorageService<IGameSettings>(
      KEY_STORAGE_GAME_SETTINGS,
      initialSettings,
      serializer
    );
  }

  public load(): IGameSettings {
    return this.localStorage.load();
  }

  public save(settings: IGameSettings): void {
    return this.localStorage.save(settings);
  }
}
