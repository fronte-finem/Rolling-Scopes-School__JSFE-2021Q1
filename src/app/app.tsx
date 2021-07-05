import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { Footer } from 'components/footer/footer';
import { Header } from 'components/header/header';
import { PageCategories } from 'components/page-categories/page-categories';
import { PageWordsStats } from 'components/page-words-stats/page-words-stats';
import { Sidebar } from 'components/sidebar/sidebar';
import { GameActionType } from 'services/game/game-action';
import { useGameContext } from 'services/game/game-context';
import { isGameStarted, isOtherRoutePath } from 'services/game/game-state';

import { Main, StyledApp } from './app-style';
import { GameRoute } from './game-route';
import { NotFoundRoute } from './not-found-route';
import { TestRoute } from './test-route';

export const App = (): JSX.Element => {
  const { pathname } = useLocation();
  const { gameState, dispatch } = useGameContext();

  useEffect(() => {
    if (isGameStarted(gameState) && isOtherRoutePath(gameState, pathname)) {
      dispatch({ type: GameActionType.RESET });
    }
  }, [pathname]);

  return (
    <StyledApp>
      <Sidebar />
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <PageCategories />
          </Route>
          <Route path="/category/:category">
            <GameRoute state={gameState} />
          </Route>
          <Route path="/difficult">
            <GameRoute state={gameState} isDifficultWords />
          </Route>
          <Route path="/statistic">
            <PageWordsStats />
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
