import { EngineMode } from './api';

export interface ICarParams {
  name: string;
  color: string;
}

export interface ICar extends ICarParams {
  id: number;
}

export interface IEngine {
  status: EngineMode;
  id: number;
}

export interface IRaceParams {
  velocity: number;
  distance: number;
}

export interface IRaceResult {
  success: boolean;
}

export interface IWinnerParams {
  wins: number;
  time: number;
}

export interface IWinner extends IWinnerParams {
  id: number;
}

export interface IGarageResponse {
  cars: null | Array<ICar | null>;
  totalCount: null | number;
}

export interface IWinnersResponse {
  winners: null | Array<IWinner | null>;
  totalCount: null | number;
}
