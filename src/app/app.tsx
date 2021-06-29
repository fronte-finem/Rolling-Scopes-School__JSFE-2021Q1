import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { CardsField } from 'components/cards-field/cards-field';
import { Categories } from 'components/categories/categories';
import { Footer } from 'components/footer/footer';
import { Header } from 'components/header/header';
import { Sidebar } from 'components/sidebar/sidebar';
import { DataContext, fetchData } from 'services/data-context';
import { GameContextProvider } from 'services/game/game-context';

import { Main, StyledApp } from './style';

export const App = (): JSX.Element => {
  return (
    <HashRouter>
      <DataContext.Provider value={fetchData()}>
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
                <Route path="/:categoryPath">
                  <CardsField />
                </Route>
              </Switch>
            </Main>
            <Footer />
          </StyledApp>
        </GameContextProvider>
      </DataContext.Provider>
    </HashRouter>
  );
};
