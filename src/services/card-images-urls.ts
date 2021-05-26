import { knuthShuffle } from '../shared/array-utils';

const IMAGES_JSON = './images.json';

export enum CardImagesCategory {
  CATS = 'cats',
  DOGS = 'dogs',
}

export const CARD_IMAGES_CATEGORY = new Map<string, CardImagesCategory>(
  Object.values(CardImagesCategory).map((v) => [v, v])
);

export const CARD_IMAGES_CATEGORY_TEXT_MAP = new Map<
  CardImagesCategory,
  string
>([
  [CardImagesCategory.CATS, '🐱 Cats 🐈🐈‍⬛'],
  [CardImagesCategory.DOGS, '🐶 Dogs 🐕🐩🐕‍🦺'],
]);

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

export interface ICardImagesJsonModel {
  category: string;
  images: ICardImagesDescriptionModel;
}

export interface ICardImagesUrlsModel {
  back: string;
  front: string[];
}

export interface ICardImagesService {
  getUrls(
    category: CardImagesCategory,
    amount: number
  ): Promise<ICardImagesUrlsModel | undefined>;
}

type Cache = Map<CardImagesCategory, ICardImagesDescriptionModel>;

export class CardImagesService implements ICardImagesService {
  private cache?: Cache;

  private jsonUrl = IMAGES_JSON;

  private async fetch(): Promise<Cache> {
    if (!this.cache) {
      const res = await fetch(IMAGES_JSON);
      const data = (await res.json()) as ICardImagesJsonModel[];
      this.cache = data
        .filter((model) => CARD_IMAGES_CATEGORY.has(model.category))
        .reduce(
          (acc, model) =>
            acc.set(
              CARD_IMAGES_CATEGORY.get(model.category) as CardImagesCategory,
              model.images
            ),
          new Map<CardImagesCategory, ICardImagesDescriptionModel>()
        );
    }
    return this.cache;
  }

  private async generateUrls(
    category: CardImagesCategory
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
    category: CardImagesCategory,
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
