import React from 'react';

import { CategoryDTO } from 'types/category-dto';

import { CategoryCardContainer, CategoryImage, CategoryName, StyledCategoryCard } from './style';

export interface CategoryProps {
  readonly data: CategoryDTO;
  readonly className?: string;
}

export const CategoryCard = ({ className, data }: CategoryProps): JSX.Element => {
  const { category, image } = data;
  return (
    <CategoryCardContainer className={className}>
      <StyledCategoryCard>
        <CategoryImage draggable={false} src={image} alt={category} />
        <CategoryName>{category}</CategoryName>
      </StyledCategoryCard>
    </CategoryCardContainer>
  );
};
