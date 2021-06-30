import React, { FC } from 'react';

import { categoriesDTOValidator, CategoryDTO } from './dto-category';
import { WordDTO, wordsDTOValidator } from './dto-word';
import { FetchState, getMessage, useFetch } from './fetch-hook';
import { fixCategoriesLinks, fixWordsLinks } from './fix-links';

const CATEGORIES_URL = './data/categories.json';
const WORDS_URL = './data/words.json';

const CONTEXT_NOT_EXIST = 'DataContext must be used inside of a DataContextProvider';

interface DataContextInterface {
  categoriesState: FetchState<CategoryDTO[]>;
  wordsState: FetchState<WordDTO[]>;
}

const DataContext = React.createContext<DataContextInterface | undefined>(undefined);

export const DataContextProvider: FC = ({ children }) => {
  const categoriesState = useFetch(CATEGORIES_URL, categoriesDTOValidator);
  const wordsState = useFetch(WORDS_URL, wordsDTOValidator);

  return (
    <DataContext.Provider value={{ categoriesState, wordsState }}>{children}</DataContext.Provider>
  );
};

export const useDataContext = (): DataContextInterface => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw Error(CONTEXT_NOT_EXIST);
  }
  return context;
};

export function useCategoriesData(): string | CategoryDTO[] {
  const { categoriesState } = useDataContext();
  const message = getMessage(categoriesState, 'Categories');
  if (message) return message;
  return fixCategoriesLinks(categoriesState.data || []);
}

type CategoryData = [category: CategoryDTO, words: WordDTO[]];

export function useWordsData(categoryName: string): string | CategoryData {
  const { categoriesState, wordsState } = useDataContext();

  let message = getMessage(categoriesState, 'Categories');
  if (message) return message;
  message = getMessage(wordsState, 'Words');
  if (message) return message;

  const [categories, words] = [categoriesState.data || [], wordsState.data || []];
  const category = categories.find((dto) => dto.category === categoryName);
  if (!category) return `Category "${categoryName}" not found!`;
  return [category, fixWordsLinks(words.filter((dto) => dto.categoryId === category?.id))];
}
