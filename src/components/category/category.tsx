import React from 'react';
import { CategoryDTO } from 'types/category-dto';
import { StyledCategoryCard, CategoryImage, CategoryName, CategoryCardContainer } from './style';

interface CategoryProps {
  readonly data: CategoryDTO;
  readonly className?: string;
}

export const CategoryCard = ({ className, data }: CategoryProps) => {
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
