import { CarModel } from 'components/car';
import { GarageModel } from 'pages/garage/garage-model';
import { REST_API } from 'services/rest-api';
import { Try } from 'shared/types';

export enum RaceEvent {
  CARS_UPDATE,
  START,
  STOP,
  EMPTY,
}

export interface StartCarResult {
  id: number;
  raceParams: REST_API.IDriveParams | null;
}

export interface IRaceService {
  init(garage: GarageModel): Promise<void>;
  getCarsForPage(pageNum?: number): Promise<void>;
  onCarsUpdate(listener: (model: Try<GarageModel>) => void): void;
  addCar(params: REST_API.ICarParams): Promise<void>;
  delCar(id: number): Promise<void>;
  updateCar(id: number, params: REST_API.ICarParams): Promise<void>;
  generateRandomCarParam(): CarModel;
  generateRandomCars(count: number): Promise<void>;
  startCar(id: number): Promise<Try<REST_API.IDriveParams>>;
  stopCar(id: number): Promise<Try<REST_API.IDriveParams>>;
  driveCar(id: number): Promise<Try<REST_API.IDriveResult>>;
}
