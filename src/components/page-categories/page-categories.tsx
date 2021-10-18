import React from 'react';

import { CategoryLink } from 'components/category/category';
import { useCategoriesData } from 'services/data/data-context';
import { CategoryDTO } from 'services/data/dto-category';
import { useGameContext } from 'services/game/game-context';
import { isGameMode } from 'services/game/game-state';
import { StyledProps } from 'types/styled';

import { StyledCategories, StyledCategoriesItem } from './page-categories-style';

export const PageCategories = ({ className }: StyledProps): JSX.Element => {
  const categories: string | CategoryDTO[] = useCategoriesData();
  const { gameState } = useGameContext();
  if (typeof categories === 'string') return <h2>{categories}</h2>;

  return (
    <nav className={className}>
      <StyledCategories>
        {categories.map((categoryDTO) => (
          <StyledCategoriesItem key={categoryDTO.category}>
            <CategoryLink categoryDTO={categoryDTO} isGameMode={isGameMode(gameState)} />
          </StyledCategoriesItem>
        ))}
      </StyledCategories>
    </nav>
  );
};
