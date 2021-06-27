import React from 'react';

import { CategoryDTO } from 'types/category-dto';
import { StyledProps } from 'types/styled';

import { CategoryImage, CategoryName, NameWrapper, StyledCategoryLink } from './style';

export interface CategoryProps extends StyledProps {
  readonly categoryDTO: CategoryDTO;
}

export const CategoryLink = ({ className, categoryDTO }: CategoryProps): JSX.Element => {
  const { category, path, image } = categoryDTO;
  return (
    <StyledCategoryLink className={className} to={`/${path}`} draggable={false}>
      <CategoryImage draggable={false} src={image} alt={category} />
      <NameWrapper>
        <CategoryName>{category}</CategoryName>
      </NameWrapper>
    </StyledCategoryLink>
  );
};
