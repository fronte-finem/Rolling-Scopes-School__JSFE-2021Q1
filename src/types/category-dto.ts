import { Validator } from './abstract';
import { CardDTO, cardDTOValidator } from './card-dto';

export interface CategoryDTO {
  readonly category: string;
  readonly path: string;
  readonly image: string;
  readonly cards: Array<CardDTO>;
}

type CategoryDTOValidator = Validator<CategoryDTO>;

export const categoryDTOValidator: CategoryDTOValidator = (data: unknown) => {
  if (!(data instanceof Object)) return null;
  const maybeCategoryDTO = data as Record<string, unknown>;
  if (typeof maybeCategoryDTO.category !== 'string') return null;
  if (typeof maybeCategoryDTO.path !== 'string') return null;
  if (typeof maybeCategoryDTO.image !== 'string') return null;
  if (!Array.isArray(maybeCategoryDTO.cards)) return null;
  if (maybeCategoryDTO.cards.some((item) => cardDTOValidator(item) === null)) return null;
  return maybeCategoryDTO as unknown as CategoryDTO;
};

type CategoriesDTOValidator = Validator<CategoryDTO[]>;

export const categoriesDTOValidator: CategoriesDTOValidator = (data: unknown) => {
  if (!Array.isArray(data)) return null;
  if (data.some((item) => categoryDTOValidator(item) === null)) return null;
  return data as CategoryDTO[];
};
