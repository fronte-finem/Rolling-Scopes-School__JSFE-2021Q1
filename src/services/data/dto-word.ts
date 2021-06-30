import { Validator } from 'types/abstract';

export interface WordDTO {
  readonly id: number;
  readonly categoryId: number;
  readonly word: string;
  readonly translation: string;
  readonly image: string;
  readonly audio: string;
}

type WordDTOValidator = Validator<WordDTO>;

export const wordDTOValidator: WordDTOValidator = (data: unknown) => {
  if (!(data instanceof Object)) return null;
  const maybeWordDTO = data as Record<string, unknown>;
  if (typeof maybeWordDTO.id !== 'number') return null;
  if (typeof maybeWordDTO.categoryId !== 'number') return null;
  if (typeof maybeWordDTO.word !== 'string') return null;
  if (typeof maybeWordDTO.translation !== 'string') return null;
  if (typeof maybeWordDTO.image !== 'string') return null;
  if (typeof maybeWordDTO.audio !== 'string') return null;
  return maybeWordDTO as unknown as WordDTO;
};

type WordsDTOValidator = Validator<WordDTO[]>;

export const wordsDTOValidator: WordsDTOValidator = (data: unknown) => {
  if (!Array.isArray(data)) return null;
  if (data.some((item) => wordDTOValidator(item) === null)) return null;
  return data as WordDTO[];
};
