import { CardDTO, CategoryDTO } from 'types/dto';

export async function fetchData(): Promise<CategoryDTO[]> {
  let response: Response;
  let data: Array<CategoryDTO> = [];

  try {
    response = await fetch('./data/cards.json');
  } catch {
    console.log('fetch error');
    return [];
  }

  try {
    data = await response.json();
  } catch {
    console.log('json parse error');
    return [];
  }

  if (!validate(data)) return [];

  return fixLinks(data);
}

function validate(data: CategoryDTO[]): boolean {
  return true;
}

function fixLinks(data: CategoryDTO[]): CategoryDTO[] {
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
