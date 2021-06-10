import { REST_API } from 'services/rest-api';
import { getRandomColor } from 'shared/css-utils';
import { randomFromInterval } from 'shared/numbers-utils';

import { CarBrand, getDataset } from './dataset';

export function getRandomCarName(dataset: CarBrand[]): string {
  const brand = randomFromInterval(0, dataset.length - 1);
  const model = randomFromInterval(0, dataset[brand].models.length - 1);
  return `${dataset[brand].brand} ${dataset[brand].models[model]}`;
}

export async function generateRandomCar(): Promise<REST_API.ICarParams> {
  const carBrands = await getDataset();
  return { name: getRandomCarName(carBrands), color: getRandomColor() };
}

export function generateRandomCars(count = 100): Promise<REST_API.ICarParams[]> {
  return Promise.all(Array.from({ length: count }, () => generateRandomCar()));
}
