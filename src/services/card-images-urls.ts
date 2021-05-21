import { knuthShuffle } from '../shared/array-utils';

const IMAGES_JSON = './images.json';

export enum CardImagesCategory {
  cats = '🐱 Cats 🐈🐈‍⬛',
  dogs = '🐶 Dogs 🐕🐩🐕‍🦺',
}

export interface ICardImagesDescriptionModel {
  first: number;
  last: number;
  leftPad: number;
  leftPadChar: string;
  extension: string;
  width: number;
  height: number;
  cardCover: string;
}

export interface ICardImagesCategoryModel {
  category: keyof typeof CardImagesCategory;
  images: ICardImagesDescriptionModel;
}

export interface ICardImagesUrlsModel {
  back: string;
  front: string[];
}

export interface ICardImagesService {
  getUrls(
    category: string,
    amount: number
  ): Promise<ICardImagesUrlsModel | undefined>;
}

export class CardImagesService implements ICardImagesService {
  private cache?: Map<string, ICardImagesDescriptionModel>;

  private jsonUrl = IMAGES_JSON;

  private async fetch(): Promise<Map<string, ICardImagesDescriptionModel>> {
    if (!this.cache) {
      const res = await fetch(IMAGES_JSON);
      const data = (await res.json()) as ICardImagesCategoryModel[];
      this.cache = data.reduce(
        (acc, model) => acc.set(model.category, model.images),
        new Map()
      );
    }
    return this.cache;
  }

  private async generateUrls(
    category: keyof typeof CardImagesCategory
  ): Promise<ICardImagesUrlsModel | undefined> {
    const images = (await this.fetch()).get(category);
    if (!images) return undefined;
    const front = Array.from(
      { length: images.last - images.first },
      (_, i) =>
        `${category}/${String(i + images.first).padStart(
          images.leftPad,
          images.leftPadChar
        )}.${images.extension}`
    );
    return { front, back: images.cardCover };
  }

  async getUrls(
    category: keyof typeof CardImagesCategory,
    amount: number
  ): Promise<ICardImagesUrlsModel | undefined> {
    const urls = await this.generateUrls(category);
    if (!urls) return undefined;
    let { front } = urls;
    front = knuthShuffle(front).slice(0, amount / 2);
    front = knuthShuffle(front.concat(front));
    return { front, back: urls.back };
  }
}
