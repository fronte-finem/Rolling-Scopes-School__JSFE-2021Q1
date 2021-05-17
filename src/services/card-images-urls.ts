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

export interface ICardImagesDescriptionModel {
  first: number;
  last: number;
  leftPad: number;
  leftPadChar: string;
  extension: string;
  width: number;
  height: number;
}

export interface ICardImagesCategoryModel {
  category: keyof typeof CardImagesCategory;
  images: ICardImagesDescriptionModel;
}

export class CardImagesService implements ICardImagesService {
  private cache?: Map<string, ICardImagesDescriptionModel>;

  private jsonUrl = IMAGES_JSON;

  private async fetch(): Promise<Map<string, ICardImagesDescriptionModel>> {
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

  async generateUrls(
    category: keyof typeof CardImagesCategory
  ): Promise<string[]> {
    const images = (await this.fetch()).get(category);
    if (!images) return [];
    const urls = Array.from(
      { length: images.last - images.first },
      (_, i) =>
        `${category}/${String(i + images.first).padStart(
          images.leftPad,
          images.leftPadChar
        )}.${images.extension}`
    );
    return urls;
  }

  async getUrls(
    category: keyof typeof CardImagesCategory,
    amount: number
  ): Promise<string[]> {
    let images = await this.generateUrls(category);
    images = knuthShuffle(images).slice(0, amount / 2);
    images = knuthShuffle(images.concat(images));
    return images;
  }
}
