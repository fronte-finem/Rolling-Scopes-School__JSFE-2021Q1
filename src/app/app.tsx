import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Categories } from 'components/categories/categories';
import { useCategoryLocation } from 'components/category/category-link';
import { Footer } from 'components/footer/footer';
import { Header } from 'components/header/header';
import { Sidebar } from 'components/sidebar/sidebar';
import { GameActionType } from 'services/game/game-action';
import { useGameContext } from 'services/game/game-context';
import { isGameStarted, isOtherCategory } from 'services/game/game-state';

import { Main, StyledApp } from './app-style';
import { GameRoute } from './game-route';
import { NotFoundRoute } from './not-found-route';
import { TestRoute } from './test-route';

export const App = (): JSX.Element => {
  const category = useCategoryLocation();
  const { gameState, dispatch } = useGameContext();

  useEffect(() => {
    if (isGameStarted(gameState) && isOtherCategory(gameState, category)) {
      dispatch({ type: GameActionType.RESET });
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
          <Route path="/category/:category">
            <GameRoute state={gameState} />
          </Route>
          <Route path="/test/:component">
            <TestRoute />
          </Route>
          <Route path="/:route">
            <NotFoundRoute />
          </Route>
        </Switch>
      </Main>
      <Footer />
    </StyledApp>
  );
};
