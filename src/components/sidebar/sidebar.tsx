import React from 'react';

import { CategoryDTO } from 'types/category-dto';

import { StyledBar, StyledCategoriesItem, StyledLink, StyledList } from './style';

export interface CategoriesProps {
  data: CategoryDTO[];
}

export const Sidebar = ({ data }: CategoriesProps): JSX.Element => {
  return (
    <StyledBar>
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
