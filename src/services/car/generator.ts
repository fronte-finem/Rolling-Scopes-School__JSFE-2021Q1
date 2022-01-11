import { REST_API } from 'services/rest-api';
import { getRandomColor } from 'shared/css-utils';
import { randomFromInterval } from 'shared/numbers-utils';

import { CarBrand, getDataset } from './dataset';
import { FIRST_NAMES, LAST_NAMES, MIDDLE_NAMES } from './names';

function getRandomCarName(dataset: CarBrand[]): string {
  const brand = randomFromInterval(0, dataset.length - 1);
  const model = randomFromInterval(0, dataset[brand].models.length - 1);
  return `${dataset[brand].brand} ${dataset[brand].models[model]}`;
}

const EMTTY_ID = -1;

export async function generateRandomCar(): Promise<REST_API.CarDTO> {
  const carBrands = await getDataset();
  return { id: EMTTY_ID, name: getRandomCarName(carBrands), color: getRandomColor() };
}

export function generateRandomCars(count = 100): Promise<REST_API.CarDTO[]> {
  return Promise.all(Array.from({ length: count }, () => generateRandomCar()));
}

function getRandomBugName(): string {
  const i = randomFromInterval(0, FIRST_NAMES.length - 1);
  const j = randomFromInterval(0, MIDDLE_NAMES.length - 1);
  const k = randomFromInterval(0, LAST_NAMES.length - 1);
  return `${FIRST_NAMES[i]} ${MIDDLE_NAMES[j]} ${LAST_NAMES[k]}`;
}

export function generateRandomBug(): REST_API.CarDTO {
  return { id: EMTTY_ID, name: getRandomBugName(), color: getRandomColor() };
}

export function generateRandomBugs(count = 100): REST_API.CarDTO[] {
  return Array.from({ length: count }, () => generateRandomBug());
}
