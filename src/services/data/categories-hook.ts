import { useEffect, useState } from 'react';

import { categoryApiService, CategoryCardDataArray } from 'services/rest-api/category-api';
import { wordApiService } from 'services/rest-api/word-api';

interface CategoriesDataHook {
  categoriesData: CategoryCardDataArray;
  setCategoriesData: React.Dispatch<React.SetStateAction<CategoryCardDataArray>>;
  updateData: () => void;
}

export const useCategoriesHook = (): CategoriesDataHook => {
  const [categoriesData, setCategoriesData] = useState<CategoryCardDataArray>([]);
  const [updateCount, setUpdateCount] = useState(0);

  const updateData = () => {
    setUpdateCount((count) => count + 1);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryApiService.getAll();
        setCategoriesData(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [updateCount]);

  return {
    categoriesData,
    setCategoriesData,
    updateData,
  };
};

export const useCategoryImageHook = (categoryId: string): string => {
  const [image, setImage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await wordApiService.getOne(categoryId);
        setImage(response.data.image);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [categoryId]);

  return image;
};
