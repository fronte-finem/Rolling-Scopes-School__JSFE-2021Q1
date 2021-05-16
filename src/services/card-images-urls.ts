import { knuthShuffle } from '../shared/array-utils';

const IMAGES_JSON = './images.json';

// https://stackoverflow.com/questions/63961803/eslint-says-all-enums-in-typescript-app-are-already-declared-in-the-upper-scope
// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md
export const enum CardImagesCategory {
  cats,
  dogs,
}

export interface ICardImagesService {
  getUrls(category: string, amount: number): Promise<string[]>;
}

export interface ICardImagesCategoryModel {
  category: keyof typeof CardImagesCategory;
  images: string[];
}

export class CardImagesService implements ICardImagesService {
  private cache?: Map<string, string[]>;

  private jsonUrl = IMAGES_JSON;

  private async fetch(): Promise<Map<string, string[]>> {
    if (!this.cache) {
      const res = await fetch(IMAGES_JSON);
      const data: ICardImagesCategoryModel[] = await res.json();
      this.cache = data.reduce(
        (acc, model) => acc.set(model.category, model.images),
        new Map()
      );
    }
    return this.cache;
  }

  async getUrls(category: keyof typeof CardImagesCategory, amount: number): Promise<string[]> {
    let images = (await this.fetch()).get(category);
    if (!images) return [];
    images = images.map((name) => `${category}/${name}`);
    images = knuthShuffle(images).slice(0, amount / 2);
    images = knuthShuffle(images.concat(images));
    return images;
  }
}
