import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { CategoryDTO } from 'types/category-dto';

import { CategoryCard } from '../category/category';

const StyledCategories = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-gap: 20px;
`;

const CARD_WIDTH = 300;

const StyledCategoriesItem = styled.li`
  display: block;
  flex: 0 0 ${CARD_WIDTH}px;
  perspective: ${CARD_WIDTH * 3}px;
`;

const StyledLink = styled(Link)`
  display: block;
`;

export interface CategoriesProps {
  data: CategoryDTO[];
}

export const Categories = ({ data }: CategoriesProps): JSX.Element => {
  return (
    <nav>
      <StyledCategories>
        {data.map((categoryDTO) => (
          <StyledCategoriesItem key={categoryDTO.category}>
            <StyledLink to={`/${categoryDTO.path}`} draggable={false}>
              <CategoryCard data={categoryDTO} />
            </StyledLink>
          </StyledCategoriesItem>
        ))}
      </StyledCategories>
    </nav>
  );
};
