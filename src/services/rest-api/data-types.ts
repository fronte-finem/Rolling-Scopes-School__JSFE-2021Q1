export interface ICarParams {
  name: string;
  color: string;
}

export interface ICar extends ICarParams {
  id: number;
}

export interface IDriveParams {
  velocity: number;
  distance: number;
}

export interface IDriveResult {
  success: boolean;
}

export interface IWinnerParams {
  wins: number;
  time: number;
}

export interface IWinner extends IWinnerParams {
  id: number;
}

export interface ICars {
  cars: Array<ICar>;
  totalCount: number;
}

export interface IWinners {
  winners: Array<IWinner>;
  totalCount: number;
}
