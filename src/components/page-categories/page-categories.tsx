import React from 'react';

import { Main } from 'app/app-style';
import { CategoryLink } from 'components/category/category';
import { Header } from 'components/header/header';
import { Sidebar } from 'components/sidebar/sidebar';
import { useDataContext } from 'services/data/data-context';
import { useGameContext } from 'services/game/game-context';
import { isGameMode } from 'services/game/game-state';
import { StyledProps } from 'types/styled';

import { StyledCategories, StyledCategoriesItem } from './page-categories-style';

export const PageCategories = ({ className }: StyledProps): JSX.Element => {
  const { categoriesData } = useDataContext();
  const { gameState } = useGameContext();

  return (
    <>
      <Sidebar />
      <Header />
      <Main>
        <nav className={className}>
          <StyledCategories>
            {categoriesData.map((data) => (
              <StyledCategoriesItem key={data.category._id}>
                <CategoryLink data={data} isGameMode={isGameMode(gameState)} />
              </StyledCategoriesItem>
            ))}
          </StyledCategories>
        </nav>
      </Main>
    </>
  );
};
