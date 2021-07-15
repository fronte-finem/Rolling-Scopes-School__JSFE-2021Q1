import React from 'react';

import { useCategoryImageHook } from 'services/data/categories-hook';
import { CategoryCardData } from 'services/rest-api/category-api';
import { StyledProps } from 'types/styled';

import {
  CategoryBase,
  CategoryImage,
  CategoryName,
  NameWrapper,
  StyledCategoryLink,
} from './category-style';

export interface CategoryProps extends StyledProps {
  readonly data: CategoryCardData;
  readonly isGameMode: boolean;
}

export const CategoryLink: React.FC<CategoryProps> = ({ className, isGameMode, data }) => {
  const { category, words } = data;
  const image = useCategoryImageHook(category._id);

  return (
    <CategoryBase className={className}>
      <StyledCategoryLink className={isGameMode ? 'game' : ''} path={category._id}>
        <CategoryImage src={image} alt={category.name} />
        <NameWrapper>
          <CategoryName>{category.name}</CategoryName>
          <div>Words: {words}</div>
        </NameWrapper>
      </StyledCategoryLink>
    </CategoryBase>
  );
};
