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

export const CAR_BRANDS: CarBrand[] = [];
