import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { CardsField } from 'components/cards-field/cards-field';
import { Categories } from 'components/categories/categories';
import { useCategoryLocation } from 'components/category/category-link';
import { Footer } from 'components/footer/footer';
import { Header } from 'components/header/header';
import { Sidebar } from 'components/sidebar/sidebar';
import { GameActionType } from 'services/game/game-action';
import { useGameContext } from 'services/game/game-context';
import { isGameStarted, isOtherCategory } from 'services/game/game-state';

import { Main, StyledApp } from './app-style';

export const App = (): JSX.Element => {
  const category = useCategoryLocation();
  const { gameState, dispatch } = useGameContext();

  useEffect(() => {
    if (isGameStarted(gameState) && isOtherCategory(gameState, category)) {
      dispatch({ type: GameActionType.END, payload: null });
    }
  }, [category]);

  return (
    <StyledApp>
      <Header />
      <Main>
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Categories />
          </Route>
          <Route path="/about">
            <>ABOUT</>
          </Route>
          <Route path="/category/:category">
            <CardsField />
          </Route>
          <Route path="*">
            <h2>Error 404: Page Not found</h2>
          </Route>
        </Switch>
      </Main>
      <Footer />
    </StyledApp>
  );
};
