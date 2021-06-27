import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, useParams } from 'react-router-dom';

import { CardsField } from 'components/cards-field/cards-field';
import { Categories } from 'components/categories/categories';
import { Header } from 'components/header/header';
import { Sidebar } from 'components/sidebar/sidebar';
import { initialSidebarState, SidebarContext, sidebarReducer } from 'contexts/sidebar-context';
import { useFetch } from 'services/fetch-hook';
import { fixCategoriesLinks, fixWordsLinks } from 'services/fix-links';
import { categoriesDTOValidator, CategoryDTO } from 'types/category-dto';
import { WordDTO, wordsDTOValidator } from 'types/word-dto';

import { Maybe } from './types/abstract';

interface CardsProps {
  words: Maybe<WordDTO[]>;
  categories: Maybe<CategoryDTO[]>;
}

const Cards = ({ words, categories }: CardsProps) => {
  const { slug } = useParams<{ slug: string }>();
  const category = fixCategoriesLinks(categories).find((dto) => dto.path === slug);
  const wordsDTO = fixWordsLinks(words).filter((dto) => dto.categoryId === category?.id);
  return wordsDTO.length > 0 ? <CardsField words={wordsDTO} /> : <>404</>;
};

const App = () => {
  const [categories, isCategoriesLoading, categoriesError] = useFetch(
    './data/categories.json',
    categoriesDTOValidator
  );
  const [words, isWordsLoading, wordsError] = useFetch('./data/words.json', wordsDTOValidator);
  const [sidebarState, closeSidebar] = React.useReducer(sidebarReducer, initialSidebarState);

  if (isCategoriesLoading) return <>Loading Categories...</>;
  if (isWordsLoading) return <>Loading Words...</>;
  if (categoriesError) return <>Categories Load Error: ${categoriesError.message}</>;
  if (wordsError) return <>Words Load Error: ${wordsError.message}</>;

  return (
    <div>
      <SidebarContext.Provider value={{ sidebarState, closeSidebar }}>
        <Header />
        <HashRouter>
          <main>
            <Sidebar categories={fixCategoriesLinks(categories)} />
            <Switch>
              <Route exact path="/">
                <Categories categories={fixCategoriesLinks(categories)} />
              </Route>
              <Route path="/about">
                <>ABOUT</>
              </Route>
              <Route path="/:slug">
                <Cards words={words} categories={categories} />
              </Route>
            </Switch>
          </main>
        </HashRouter>
      </SidebarContext.Provider>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.body
);
