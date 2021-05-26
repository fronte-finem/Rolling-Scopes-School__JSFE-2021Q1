import { Model, ModelState } from '../../shared/models/model';
import { IGameSettings } from '../game/game-types';

export type IGameSettingsState = ModelState & IGameSettings;

export class GameSettingsModel extends Model<IGameSettingsState> {}
