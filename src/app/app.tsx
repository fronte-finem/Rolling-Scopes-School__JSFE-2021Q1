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

enum AppRoute {
  BASE = '/',
  WORDS = '/category/:categoryId',
  DIFFICULT_WORDS = '/difficult',
  STATISTIC = '/statistic',
  ADMIN = '/admin',
  ADMIN_WORDS = '/admin/category/:categoryId',
  TEST = '/test/:component',
  NOT_FOUND = '/:route',
}

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
        <Route exact path={AppRoute.BASE}>
          <PageCategories />
        </Route>
        <Route path={AppRoute.WORDS}>
          <GameRoute />
        </Route>
        <Route path={AppRoute.DIFFICULT_WORDS}>
          <GameRoute isDifficultWords />
        </Route>
        <Route path={AppRoute.STATISTIC}>
          <PageWordsStats />
        </Route>
        <Route path={AppRoute.ADMIN_WORDS}>
          <AdminPageWords />
        </Route>
        <Route path={AppRoute.ADMIN}>
          <AdminPageCategories />
        </Route>
        <Route path={AppRoute.TEST}>
          <TestRoute />
        </Route>
        <Route path={AppRoute.NOT_FOUND}>
          <NotFoundRoute />
        </Route>
      </Switch>
      <Footer />
    </StyledApp>
  );
});
