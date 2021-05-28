import { Model, ModelState } from '../../shared/models/model';
import { IGameSettings } from '../../services/game-settings';

export type IGameSettingsState = ModelState & IGameSettings;

export class GameSettingsModel extends Model<IGameSettingsState> {}
