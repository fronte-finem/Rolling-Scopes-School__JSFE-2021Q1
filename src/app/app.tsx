import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { AdminPageCategories } from 'components/admin-page/categories';
import { AdminPageWords } from 'components/admin-page/words';
import { Footer } from 'components/footer/footer';
import { PageCategories } from 'components/page-categories/page-categories';
import { PageWordsStats } from 'components/page-words-stats/page-words-stats';
import { useGameContext } from 'services/game/context';
import { authService } from 'services/rest-api/auth';

import { AppBackground, AppBackgroundWrapper, StyledApp } from './app-style';
import { GameRoute } from './game-route';
import { NotFoundRoute } from './not-found-route';
import { TestRoute } from './test-route';

export const App = observer(() => {
  const { pathname } = useLocation();
  const game = useGameContext();

  React.useEffect(() => {
    (async () => {
      await authService.checkToken();
    })();
  }, []);

  React.useEffect(() => {
    if (game.isStarted && game.isOtherRoutePath(pathname)) {
      game.ready();
    }
  }, [pathname]);

  return (
    <StyledApp>
      <AppBackgroundWrapper>
        <AppBackground />
      </AppBackgroundWrapper>

      <Switch>
        <Route exact path="/">
          <PageCategories />
        </Route>
        <Route path="/category/:categoryId">
          <GameRoute />
        </Route>
        <Route path="/difficult">
          <GameRoute isDifficultWords />
        </Route>
        <Route path="/statistic">
          <PageWordsStats />
        </Route>
        <Route path="/admin/category/:categoryId">
          <AdminPageWords />
        </Route>
        <Route path="/admin">
          <AdminPageCategories />
        </Route>
        <Route path="/test/:component">
          <TestRoute />
        </Route>
        <Route path="/:route">
          <NotFoundRoute />
        </Route>
      </Switch>
      <Footer />
    </StyledApp>
  );
});
