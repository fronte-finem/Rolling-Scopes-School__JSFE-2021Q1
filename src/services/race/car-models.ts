import { randomFromInterval } from 'shared/numbers-utils';

const DATASET = './dataset/us-car-models-2020-brands.json';

export interface CarBrand {
  brand: string;
  models: string[];
}

function makeDatasetGetter(): () => Promise<CarBrand[]> {
  let dataset: CarBrand[];

  return async (): Promise<CarBrand[]> => {
    if (!dataset) {
      const responce = await fetch(DATASET);
      dataset = (await responce.json()) as CarBrand[];
    }
    return dataset;
  };
}

export const getDataset = makeDatasetGetter();

export function getRandomCarName(dataset: CarBrand[]): string {
  const brand = randomFromInterval(0, dataset.length - 1);
  const model = randomFromInterval(0, dataset[brand].models.length - 1);
  return `${dataset[brand].brand} ${dataset[brand].models[model]}`;
}
