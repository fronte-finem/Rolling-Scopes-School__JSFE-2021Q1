import React from 'react';

import { CategoryDTO } from 'types/category-dto';

import { CategoryLink } from '../category/category';
import { StyledCategories, StyledCategoriesItem } from './style';

interface CategoriesProps {
  data: CategoryDTO[];
}

export const Categories = ({ data }: CategoriesProps): JSX.Element => {
  return (
    <nav>
      <StyledCategories>
        {data.map((categoryDTO) => (
          <StyledCategoriesItem key={categoryDTO.category}>
            <CategoryLink data={categoryDTO} />
          </StyledCategoriesItem>
        ))}
      </StyledCategories>
    </nav>
  );
};
