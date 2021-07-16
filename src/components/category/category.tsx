import React from 'react';

import { getImageUrl, PLACEHOLDER } from 'app/config';
import { CategoryCardData } from 'services/rest-api/category-api';
import { WordDocument } from 'services/rest-api/word-api';
import { StyledProps } from 'types/styled';

import {
  CategoryBase,
  CategoryImage,
  CategoryName,
  CategoryWordsCount,
  NameWrapper,
  StyledCategoryLink,
} from './category-style';

export interface CategoryProps extends StyledProps {
  readonly data: CategoryCardData;
  readonly isGameMode: boolean;
  readonly words: WordDocument[];
}

export const CategoryLink: React.FC<CategoryProps> = ({ className, isGameMode, data, words }) => {
  const { category } = data;
  const image = words.length ? getImageUrl(words[0].image) : getImageUrl(PLACEHOLDER);

  return (
    <CategoryBase className={className}>
      <StyledCategoryLink className={isGameMode ? 'game' : ''} path={category._id}>
        <CategoryImage src={image} alt={category.name} />
        <NameWrapper>
          <CategoryName>{category.name}</CategoryName>
        </NameWrapper>
      </StyledCategoryLink>
      <CategoryWordsCount>Words: {data.words}</CategoryWordsCount>
    </CategoryBase>
  );
};
