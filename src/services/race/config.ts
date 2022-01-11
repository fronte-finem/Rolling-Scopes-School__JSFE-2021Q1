import { REST_API } from 'services/rest-api';

export enum RaceEvent {
  GARAGE_ERROR,
  RACE_WIN,
  RACE_END,
  RACE_RESET,
  START,
  STOP,
  EMPTY,
}

export const DEFAULT_TIMEOUT = 10000;
export const DEFAULT_LAG_TIME = 10;
export const INIT_CARS_COUNT = 4;

const isCar1 = ({ id, name, color }: REST_API.CarDTO) =>
  id === 1 && name === 'Tesla' && color === '#e6e6fa';
const isCar2 = ({ id, name, color }: REST_API.CarDTO) =>
  id === 2 && name === 'BMW' && color === '#fede00';
const isCar3 = ({ id, name, color }: REST_API.CarDTO) =>
  id === 3 && name === 'Mersedes' && color === '#6c779f';
const isCar4 = ({ id, name, color }: REST_API.CarDTO) =>
  id === 4 && name === 'Ford' && color === '#ef3c40';

export const isInitCars = (cars: REST_API.CarDTO[]): boolean => {
  if (cars.length !== INIT_CARS_COUNT) return false;
  return isCar1(cars[0]) && isCar2(cars[1]) && isCar3(cars[2]) && isCar4(cars[3]);
};
