import { CardDTO, CategoryDTO } from 'types/dto';

export function fixLinks(data: CategoryDTO[]): CategoryDTO[] {
  return data.map(({ image, cards, ...rest }) => ({
    ...rest,
    image: `data/${image}`,
    cards: fixCardLinks(cards),
  }));
}

function fixCardLinks(cards: CardDTO[]): CardDTO[] {
  return cards.map(({ image, audio, ...rest }) => ({
    image: `data/${image}`,
    audio: `data/${audio}`,
    ...rest,
  }));
}
