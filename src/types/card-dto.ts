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
