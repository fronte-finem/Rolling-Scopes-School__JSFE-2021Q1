import { GameSettingsSerializer, IGameSettings } from '../pages/game/game-types';
import { LocalStorageService } from './local-storage';

const KEY_STORAGE_GAME_SETTINGS =
  'fronte-finem__match-match-game___game-settings';

export interface IGameSettingsService {
  loadSettings(): IGameSettings;
  saveSettings(settings: IGameSettings): void;
}

export class GameSettingsService implements IGameSettingsService {
  private localStorage: LocalStorageService<IGameSettings>;

  public constructor(private readonly initialSettings: IGameSettings) {
    this.localStorage = new LocalStorageService<IGameSettings>(
      KEY_STORAGE_GAME_SETTINGS,
      this.initialSettings,
      new GameSettingsSerializer()
    );
  }

  public loadSettings(): IGameSettings {
    return this.localStorage.loadSettings();
  }

  public saveSettings(settings: IGameSettings): void {
    return this.localStorage.saveSettings(settings);
  }
}
