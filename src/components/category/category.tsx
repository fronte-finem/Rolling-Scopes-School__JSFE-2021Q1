import React from 'react';

import { CategoryDTO } from 'types/category-dto';

import { CategoryImage, CategoryName, NameWrapper, StyledCategoryLink } from './style';

export interface CategoryProps {
  readonly data: CategoryDTO;
  readonly className?: string;
}

export const CategoryLink = ({ className, data }: CategoryProps): JSX.Element => {
  const { category, image } = data;
  return (
    <StyledCategoryLink className={className} to={`/${data.path}`} draggable={false}>
      <CategoryImage draggable={false} src={image} alt={category} />
      <NameWrapper>
        <CategoryName>{category}</CategoryName>
      </NameWrapper>
    </StyledCategoryLink>
  );
};
