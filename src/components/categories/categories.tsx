import React from 'react';

import { CategoryLink } from 'components/category/category';
import { CategoryDTO } from 'types/category-dto';
import { StyledProps } from 'types/styled';

import { StyledCategories, StyledCategoriesItem } from './style';

export interface CategoriesProps extends StyledProps {
  categories: CategoryDTO[];
}

export const Categories = ({ className, categories }: CategoriesProps): JSX.Element => {
  return (
    <nav className={className}>
      <StyledCategories>
        {categories.map((categoryDTO) => (
          <StyledCategoriesItem key={categoryDTO.category}>
            <CategoryLink categoryDTO={categoryDTO} />
          </StyledCategoriesItem>
        ))}
      </StyledCategories>
    </nav>
  );
};
