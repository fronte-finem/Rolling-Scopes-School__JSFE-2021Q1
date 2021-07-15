import React from 'react';

import { SidebarCategoryImg, StyledSidebarCategoryLink } from 'components/sidebar/sidebar-style';
import { useCategoryImageHook } from 'services/data/categories-hook';

interface Props {
  categoryId: string;
  text: string;
  onClick: () => void;
}

export const SidebarCategoryLink: React.FC<Props> = ({ categoryId, text, onClick }) => {
  const image = useCategoryImageHook(categoryId);

  return (
    <StyledSidebarCategoryLink path={categoryId} onClick={onClick}>
      {text}
      {image && <SidebarCategoryImg src={image} alt={text} />}
    </StyledSidebarCategoryLink>
  );
};
