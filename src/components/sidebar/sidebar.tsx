import React, { useContext } from 'react';

import { SidebarContext } from 'contexts/sidebar-context';
import { CategoryDTO } from 'types/category-dto';
import { StyledProps } from 'types/styled';

import { StyledBar, StyledBtnMenu, StyledCategoriesItem, StyledLink, StyledList } from './style';

export interface CategoriesProps extends StyledProps {
  data: CategoryDTO[];
}

export const Sidebar = ({ data, className }: CategoriesProps): JSX.Element => {
  const {
    sidebarState: { close },
  } = useContext(SidebarContext);

  const sidebarClassName = `${className || ''} ${close ? 'close' : ''}`;

  return (
    <StyledBar className={sidebarClassName}>
      <StyledBtnMenu />
      <StyledList>
        <StyledCategoriesItem key="nome">
          <StyledLink exact to="/" draggable={false}>
            Home
          </StyledLink>
        </StyledCategoriesItem>
        {data.map(({ category, path }) => (
          <StyledCategoriesItem key={category}>
            <StyledLink to={`/${path}`} draggable={false}>
              {category}
            </StyledLink>
          </StyledCategoriesItem>
        ))}
      </StyledList>
    </StyledBar>
  );
};
