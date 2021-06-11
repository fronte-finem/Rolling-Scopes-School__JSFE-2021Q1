export interface CarDTO {
  id: number;
  name: string;
  color: string;
}

export interface WinDTO {
  id: number;
  wins: number;
  time: number;
}

export interface GaragePageDTO {
  carDTOArray: Array<CarDTO>;
  totalCount: number;
}

export interface WinnersPageDTO {
  winDTOArray: Array<WinDTO>;
  totalCount: number;
}

export interface DriveParamsDTO {
  velocity: number;
  distance: number;
}

export interface DriveResultDTO {
  success: boolean;
}
