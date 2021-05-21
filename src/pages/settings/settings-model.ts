import { Model, ModelState } from '../../shared/models/model';
import { IGameSettings } from '../game/game-types';

export type IGameSettingsState = ModelState & IGameSettings;

export class GameSettingsModel extends Model<IGameSettingsState> {
  constructor(initialSettings: IGameSettings) {
    super({ ...initialSettings });
  }

  setSetting<K extends keyof IGameSettingsState>(
    name: K,
    value: IGameSettingsState[K]
  ): void {
    this.state[name] = value;
  }
}
