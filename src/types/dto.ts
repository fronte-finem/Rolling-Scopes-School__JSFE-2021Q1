import { Validator } from './abstract';

export interface CardDTO {
  readonly word: string;
  readonly translation: string;
  readonly image: string;
  readonly audio: string;
}

type CardDTOValidator = Validator<CardDTO>;

export const cardDTOValidator: CardDTOValidator = (data: unknown) => {
  if (!(data instanceof Object)) return null;
  const maybeCardDTO = data as CardDTO;
  if (typeof maybeCardDTO.word !== 'string') return null;
  if (typeof maybeCardDTO.translation !== 'string') return null;
  if (typeof maybeCardDTO.image !== 'string') return null;
  if (typeof maybeCardDTO.audio !== 'string') return null;
  return maybeCardDTO;
};

export interface CategoryDTO {
  readonly category: string;
  readonly image: string;
  readonly cards: Array<CardDTO>;
}

type CategoryDTOValidator = Validator<CategoryDTO>;

export const categoryDTOValidator: CategoryDTOValidator = (data: unknown) => {
  if (!(data instanceof Object)) return null;
  const maybeCategoryDTO = data as CategoryDTO;
  if (typeof maybeCategoryDTO.category !== 'string') return null;
  if (typeof maybeCategoryDTO.image !== 'string') return null;
  if (!Array.isArray(maybeCategoryDTO.cards)) return null;
  if (maybeCategoryDTO.cards.some((item) => cardDTOValidator(item) === null)) return null;
  return maybeCategoryDTO;
};

type CategoriesDTOValidator = Validator<CategoryDTO[]>;

export const categoriesDTOValidator: CategoriesDTOValidator = (data: unknown) => {
  if (!Array.isArray(data)) return null;
  const maybeCategoriesDTO = data as CategoryDTO[];
  if (maybeCategoriesDTO.some((item) => categoryDTOValidator(item) === null)) return null;
  return maybeCategoriesDTO;
};
