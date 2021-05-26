import { GameSettingsSerializer, IGameSettings } from '../pages/game/game-types';
import { LocalStorageService } from './local-storage';

const KEY_STORAGE_GAME_SETTINGS =
  'fronte-finem__match-match-game___game-settings';

export interface IGameSettingsService {
  loadSettings(): IGameSettings;
  saveSettings(settings: IGameSettings): void;
}

export class GameSettingsService implements IGameSettingsService {
  localStorage: LocalStorageService<IGameSettings>;

  constructor(private readonly initialSettings: IGameSettings) {
    this.localStorage = new LocalStorageService<IGameSettings>(
      KEY_STORAGE_GAME_SETTINGS,
      this.initialSettings,
      new GameSettingsSerializer()
    );
  }

  loadSettings(): IGameSettings {
    return this.localStorage.loadSettings();
  }

  saveSettings(settings: IGameSettings): void {
    return this.localStorage.saveSettings(settings);
  }
}
