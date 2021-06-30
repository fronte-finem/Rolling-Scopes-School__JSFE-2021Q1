import React from 'react';

import { CategoryLink } from 'components/category/category';
import { useCategoriesData } from 'services/data/data-context';
import { CategoryDTO } from 'services/data/dto-category';
import { StyledProps } from 'types/styled';

import { StyledCategories, StyledCategoriesItem } from './categories-style';

export const Categories = ({ className }: StyledProps): JSX.Element => {
  const categories: string | CategoryDTO[] = useCategoriesData();
  if (typeof categories === 'string') return <h2>{categories}</h2>;

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
