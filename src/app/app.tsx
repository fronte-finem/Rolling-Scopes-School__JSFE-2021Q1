import React, { FC, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { CardsField } from 'components/cards-field/cards-field';
import { Categories } from 'components/categories/categories';
import { useCategoryLocation } from 'components/category/category-link';
import { Footer } from 'components/footer/footer';
import { Header } from 'components/header/header';
import { FailPage, WinPage } from 'components/page-game-end/page-game-end';
import { Sidebar } from 'components/sidebar/sidebar';
import { GameActionType } from 'services/game/game-action';
import { useGameContext } from 'services/game/game-context';
import {
  GameState,
  isEnd,
  isFail,
  isGameStarted,
  isOtherCategory,
  isWin,
} from 'services/game/game-state';

import { Main, StyledApp } from './app-style';

const GameRoute: FC<{ state: GameState }> = ({ state }) => {
  if (isEnd(state)) return <Redirect to="/" />;
  if (isWin(state)) return <WinPage />;
  if (isFail(state)) return <FailPage />;
  return <CardsField />;
};

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
          <Route path="/about">
            <>ABOUT</>
          </Route>
          <Route path="/win">
            <WinPage />
          </Route>
          <Route path="/fail">
            <FailPage />
          </Route>
          <Route path="/category/:category">
            <GameRoute state={gameState} />
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
