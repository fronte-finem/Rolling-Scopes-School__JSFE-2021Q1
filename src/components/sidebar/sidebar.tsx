import React from 'react';

import { CategoryDTO } from 'types/category-dto';
import { StyledProps } from 'types/styled';

import { useSidebarHook } from './hook';
import { StyledBar, StyledBtnMenu, StyledCategoriesItem, StyledLink, StyledList } from './style';

export interface CategoriesProps extends StyledProps {
  categories: CategoryDTO[];
}

export const Sidebar = ({ categories, className }: CategoriesProps): JSX.Element => {
  const { ref, sidebarState, closeSidebar } = useSidebarHook();

  const handleLinkClick = () => closeSidebar(true);

  const sidebarClassName = `${className || ''} ${sidebarState.isClosed ? 'close' : ''}`;

  return (
    <StyledBar className={sidebarClassName} ref={ref}>
      <StyledBtnMenu />
      <StyledList>
        <StyledCategoriesItem key="nome">
          <StyledLink exact to="/" draggable={false} onClick={handleLinkClick}>
            Home
          </StyledLink>
        </StyledCategoriesItem>
        {categories.map(({ category, path }) => (
          <StyledCategoriesItem key={category}>
            <StyledLink to={`/${path}`} draggable={false} onClick={handleLinkClick}>
              {category}
            </StyledLink>
          </StyledCategoriesItem>
        ))}
      </StyledList>
    </StyledBar>
  );
};
