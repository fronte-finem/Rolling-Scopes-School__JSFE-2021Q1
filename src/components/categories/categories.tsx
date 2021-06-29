import React from 'react';

import { CategoryLink } from 'components/category/category';
import { useCategoriesData } from 'services/data-context';
import { CategoryDTO } from 'types/category-dto';
import { StyledProps } from 'types/styled';

import { StyledCategories, StyledCategoriesItem } from './style';

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
