import React, { useContext } from 'react';

import { FetchState, FetchStatus, getMessage, useFetch } from 'services/fetch-hook';
import { fixCategoriesLinks, fixWordsLinks } from 'services/fix-links';
import { Maybe } from 'types/abstract';
import { categoriesDTOValidator, CategoryDTO } from 'types/category-dto';
import { WordDTO, wordsDTOValidator } from 'types/word-dto';

interface DataContextInterface {
  categoriesState: FetchState<CategoryDTO[]>;
  wordsState: FetchState<WordDTO[]>;
}

export function fetchData(): DataContextInterface {
  return {
    categoriesState: useFetch('./data/categories.json', categoriesDTOValidator),
    wordsState: useFetch('./data/words.json', wordsDTOValidator),
  };
}

export const DataContext = React.createContext<Maybe<DataContextInterface>>(null);

export function getCategories(context: Maybe<DataContextInterface>): CategoryDTO[] {
  if (context === null) return [];
  if (context.categoriesState.status !== FetchStatus.SUCCESS) return [];
  return fixCategoriesLinks(context.categoriesState.data || []);
}

export function getWords(context: Maybe<DataContextInterface>): WordDTO[] {
  if (context === null) return [];
  if (context.wordsState.status !== FetchStatus.SUCCESS) return [];
  return fixWordsLinks(context.wordsState.data || []);
}

type FullData = [categories: CategoryDTO[], words: WordDTO[]];

export function getData(context: Maybe<DataContextInterface>): FullData {
  return [getCategories(context), getWords(context)];
}

const CONTEXT_NOT_EXIST = 'Data Context not exist';

export function useCategoriesData(): string | CategoryDTO[] {
  const context = useContext(DataContext);
  if (!context) return CONTEXT_NOT_EXIST;
  const { categoriesState } = context;
  return getMessage(categoriesState, 'Categories') || getCategories(context);
}

type CategoryData = [category: CategoryDTO, words: WordDTO[]];

export function useWordsData(categoryName: string): string | CategoryData {
  const context = useContext(DataContext);
  if (!context) return CONTEXT_NOT_EXIST;
  const { categoriesState, wordsState } = context;

  let message = getMessage(categoriesState, 'Categories');
  if (message) return message;
  message = getMessage(wordsState, 'Words');
  if (message) return message;

  const [categories, words] = getData(context);
  const category = categories.find((dto) => dto.category === categoryName);
  if (!category) return `Category "${categoryName}" not found!`;
  return [category, words.filter((dto) => dto.categoryId === category?.id)];
}
