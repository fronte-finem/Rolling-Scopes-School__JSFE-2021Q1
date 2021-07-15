import React from 'react';

import { useCategoriesHook } from 'services/data/categories-hook';
import { useAllWordsHook } from 'services/data/words-hook';
import { CategoryCardDataArray, CategoryDocument } from 'services/rest-api/category-api';
import { WordDocument } from 'services/rest-api/word-api';

const CONTEXT_NOT_EXIST = 'DataContext must be used inside of a DataContextProvider';

interface DataContextInterface {
  categoriesData: CategoryCardDataArray;
  setCategoriesData: React.Dispatch<React.SetStateAction<CategoryCardDataArray>>;
  allWords: WordDocument[];
  setAllWords: React.Dispatch<React.SetStateAction<WordDocument[]>>;
  updateData: () => void;
  getWords: (categoryId: string) => WordDocument[];
}

const DataContext = React.createContext<DataContextInterface | undefined>(undefined);

export const DataContextProvider: React.FC = ({ children }) => {
  const { categoriesData, setCategoriesData, updateData } = useCategoriesHook();
  const { allWords, setAllWords } = useAllWordsHook();

  const getWords = (categoryId: string) => {
    return allWords.filter((word) => (word.category as unknown as string) === categoryId);
  };

  return (
    <DataContext.Provider
      value={{ categoriesData, setCategoriesData, allWords, setAllWords, updateData, getWords }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextInterface => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw Error(CONTEXT_NOT_EXIST);
  }
  return context;
};

export function getCategoryWords(
  categoryId: string,
  categories: CategoryDocument[],
  words: WordDocument[]
): WordDocument[] {
  // const category = categories.find((doc) => doc.name === categoryId);
  // if (!category) return [];
  return words.filter((doc) => (doc.category as unknown as string) === categoryId);
}
