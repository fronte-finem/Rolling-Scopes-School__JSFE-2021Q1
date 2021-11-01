import React from 'react';

import { CategoryDocument, WordDocument } from 'services/rest-api/config';
import { getImageUrl, PLACEHOLDER } from 'services/rest-api/media-api';
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
  readonly category: CategoryDocument;
  readonly isGameMode: boolean;
  readonly words: WordDocument[];
}

export const CategoryLink: React.FC<CategoryProps> = ({
  className,
  isGameMode,
  category,
  words,
}) => {
  const image = words.length ? getImageUrl(words[0].image) : getImageUrl(PLACEHOLDER);

  return (
    <CategoryBase className={className}>
      <StyledCategoryLink className={isGameMode ? 'game' : ''} path={category._id}>
        <CategoryImage src={image} alt={category.name} />
        <NameWrapper>
          <CategoryName>{category.name}</CategoryName>
        </NameWrapper>
      </StyledCategoryLink>
      <CategoryWordsCount>Words: {words.length}</CategoryWordsCount>
    </CategoryBase>
  );
};
