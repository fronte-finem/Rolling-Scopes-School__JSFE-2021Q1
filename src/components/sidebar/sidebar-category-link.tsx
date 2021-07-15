import React from 'react';

import { getImageUrl, PLACEHOLDER } from 'app/config';
import { SidebarCategoryImg, StyledSidebarCategoryLink } from 'components/sidebar/sidebar-style';
import { WordDocument } from 'services/rest-api/word-api';

interface Props {
  categoryId: string;
  text: string;
  words: WordDocument[];
  onClick: () => void;
}

export const SidebarCategoryLink: React.FC<Props> = ({ categoryId, text, words, onClick }) => {
  const image = words.length ? getImageUrl(words[0].image) : getImageUrl(PLACEHOLDER);

  return (
    <StyledSidebarCategoryLink path={categoryId} onClick={onClick}>
      {text}
      {image && <SidebarCategoryImg src={image} alt={text} />}
    </StyledSidebarCategoryLink>
  );
};
