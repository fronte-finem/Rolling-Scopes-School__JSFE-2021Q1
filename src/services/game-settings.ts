import { IGameSettings } from '../pages/game/game-types';
import { LocalStorageService } from './local-storage';

const KEY_STORAGE_GAME_SETTINGS =
  'fronte-finem__match-match-game___game-settings';

export interface IGameSettingsService {
  loadSettings(): Promise<IGameSettings>;
  saveSettings(settings: IGameSettings): Promise<void>;
}

export class GameSettingsService implements IGameSettingsService {
  localStorage: LocalStorageService<IGameSettings>;

  constructor(private readonly initialSettings: IGameSettings) {
    this.localStorage = new LocalStorageService<IGameSettings>(
      KEY_STORAGE_GAME_SETTINGS,
      initialSettings
    );
  }

  loadSettings(): Promise<IGameSettings> {
    return this.localStorage.loadSettings();
  }

  saveSettings(settings: IGameSettings): Promise<void> {
    return this.localStorage.saveSettings(settings);
  }
}
