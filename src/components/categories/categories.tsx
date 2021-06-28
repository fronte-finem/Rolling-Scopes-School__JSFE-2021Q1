import React, { useContext, useEffect } from 'react';

import { CategoryLink } from 'components/category/category';
import { useCategoriesData } from 'services/data-context';
import { GameActionType, GameContext, GameDispatch, GameState, GameStatus } from 'services/game';
import { CategoryDTO } from 'types/category-dto';
import { StyledProps } from 'types/styled';

import { StyledCategories, StyledCategoriesItem } from './style';

function useGameEnd(gameState: GameState, dispatch: GameDispatch) {
  useEffect(() => {
    if (gameState.status !== GameStatus.INITIAL) {
      dispatch({ type: GameActionType.END });
    }
  }, []);
}

export const Categories = ({ className }: StyledProps): JSX.Element => {
  const categories: string | CategoryDTO[] = useCategoriesData();
  const { gameState, dispatch } = useContext(GameContext);
  useGameEnd(gameState, dispatch);
  if (typeof categories === 'string') return <h2>{categories}</h2>;

  return (
    <nav className={className}>
      <StyledCategories>
        {categories.map((categoryDTO) => (
          <StyledCategoriesItem key={categoryDTO.category}>
            <CategoryLink categoryDTO={categoryDTO} />
          </StyledCategoriesItem>
        ))}
      </StyledCategories>
    </nav>
  );
};
