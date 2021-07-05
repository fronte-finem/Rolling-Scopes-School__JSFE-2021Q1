import { Validator } from 'types/abstract';

export interface CategoryDTO {
  readonly id: number;
  readonly category: string;
  readonly image: string;
}

type CategoryDTOValidator = Validator<CategoryDTO>;

export const categoryDTOValidator: CategoryDTOValidator = (data: unknown) => {
  if (!(data instanceof Object)) return null;
  const maybeCategoryDTO = data as Record<string, unknown>;
  if (typeof maybeCategoryDTO.id !== 'number') return null;
  if (typeof maybeCategoryDTO.category !== 'string') return null;
  if (typeof maybeCategoryDTO.image !== 'string') return null;
  return maybeCategoryDTO as unknown as CategoryDTO;
};

type CategoriesDTOValidator = Validator<CategoryDTO[]>;

export const categoriesDTOValidator: CategoriesDTOValidator = (data: unknown) => {
  if (!Array.isArray(data)) return null;
  if (data.some((item) => categoryDTOValidator(item) === null)) return null;
  return data as CategoryDTO[];
};
