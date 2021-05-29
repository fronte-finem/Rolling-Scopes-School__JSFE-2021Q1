import { IGameSettings } from '../../services/game-settings';
import { Model, ModelState } from '../../shared/models/model';

export type IGameSettingsState = ModelState & IGameSettings;

export class GameSettingsModel extends Model<IGameSettingsState> {}
