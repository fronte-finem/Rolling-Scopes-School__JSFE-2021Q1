import React, { FC } from 'react';

import { CategoryDTO } from 'services/data/dto-category';
import { StyledProps } from 'types/styled';

import {
  CategoryBase,
  CategoryImage,
  CategoryName,
  NameWrapper,
  StyledCategoryLink,
} from './category-style';

export interface CategoryProps extends StyledProps {
  readonly categoryDTO: CategoryDTO;
  readonly isGameMode: boolean;
}

export const CategoryLink: FC<CategoryProps> = ({ className, isGameMode, categoryDTO }) => {
  const { category, image } = categoryDTO;

  return (
    <CategoryBase className={className}>
      <StyledCategoryLink className={isGameMode ? 'game' : ''} name={category}>
        <CategoryImage src={image} alt={category} />
        <NameWrapper>
          <CategoryName>{category}</CategoryName>
        </NameWrapper>
      </StyledCategoryLink>
    </CategoryBase>
  );
};
