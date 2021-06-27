import { Maybe } from 'types/abstract';
import { CategoryDTO } from 'types/category-dto';
import { WordDTO } from 'types/word-dto';

export function fixCategoriesLinks(data: Maybe<CategoryDTO[]>): CategoryDTO[] {
  return (data || []).map(({ image, ...rest }) => ({
    ...rest,
    image: `data/${image}`,
  }));
}

export function fixWordsLinks(words: Maybe<WordDTO[]>): WordDTO[] {
  return (words || []).map(({ image, audio, ...rest }) => ({
    ...rest,
    image: `data/${image}`,
    audio: `data/${audio}`,
  }));
}
