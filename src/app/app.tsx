import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CardsField } from 'components/cards-field/cards-field';
import { Categories } from 'components/categories/categories';
import { Footer } from 'components/footer/footer';
import { Header } from 'components/header/header';
import { Sidebar } from 'components/sidebar/sidebar';
import { GameContextProvider } from 'services/game/game-context';

import { Main, StyledApp } from './app-style';

export const App = (): JSX.Element => {
  return (
    <GameContextProvider>
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
    </GameContextProvider>
  );
};
