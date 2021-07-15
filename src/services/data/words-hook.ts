import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { categoryApiService, CategoryDocument } from 'services/rest-api/category-api';
import { wordApiService, WordDocument } from 'services/rest-api/word-api';

interface WordsHook {
  category: CategoryDocument | null;
  words: WordDocument[];
  setWords: React.Dispatch<React.SetStateAction<WordDocument[]>>;
}

export const useWordsHook = (): WordsHook => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<CategoryDocument | null>(null);
  const [words, setWords] = useState<WordDocument[]>([]);

  useEffect(() => {
    (async () => {
      if (!categoryId) return;
      try {
        const categoryResponse = await categoryApiService.getOne(categoryId);
        const wordsResponse = await wordApiService.getAll(categoryId);
        console.log('categoryApiService.getOne', categoryResponse.data);
        setCategory(categoryResponse.data);
        console.log('wordApiService.getAll', wordsResponse.data);
        setWords(wordsResponse.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [categoryId]);

  return {
    category,
    words,
    setWords,
  };
};

interface AllWordsHook {
  allWords: WordDocument[];
  setAllWords: React.Dispatch<React.SetStateAction<WordDocument[]>>;
}

export const useAllWordsHook = (): AllWordsHook => {
  const [allWords, setAllWords] = useState<WordDocument[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const wordsResponse = await wordApiService.getAll();
        setAllWords(wordsResponse.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return {
    allWords,
    setAllWords,
  };
};
