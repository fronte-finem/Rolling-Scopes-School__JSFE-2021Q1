import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { CardsField } from 'components/cards-field/cards-field';
import { Categories } from 'components/categories/categories';
import { Footer } from 'components/footer/footer';
import { Header } from 'components/header/header';
import { Sidebar } from 'components/sidebar/sidebar';
import { DataContext, fetchData } from 'services/data-context';
import { GameContext, useGameCycle } from 'services/game';

import { Main, StyledApp } from './style';

export const App = (): JSX.Element => {
  const [gameState, dispatch] = useGameCycle();

  return (
    <DataContext.Provider value={fetchData()}>
      <GameContext.Provider value={{ gameState, dispatch }}>
        <StyledApp>
          <Header />
          <Main>
            <HashRouter>
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
            </HashRouter>
          </Main>
          <Footer />
        </StyledApp>
      </GameContext.Provider>
    </DataContext.Provider>
  );
};
