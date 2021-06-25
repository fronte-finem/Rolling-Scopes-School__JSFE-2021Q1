import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, useParams } from 'react-router-dom';

import { CardsField } from 'components/cards-field/cards-field';
import { Categories, CategoriesProps } from 'components/categories/categories';
import { Header } from 'components/header/header';
import { Sidebar } from 'components/sidebar/sidebar';
import { useFetch } from 'services/fetch-hook';
import { fixLinks } from 'services/fix-links';
import { categoriesDTOValidator } from 'types/category-dto';

const Cards = ({ data }: CategoriesProps) => {
  const { slug } = useParams<{ slug: string }>();
  const cards = data.find((dto) => dto.path === slug)?.cards;
  return cards ? <CardsField cards={cards} /> : <>404</>;
};

const App = () => {
  const [data, isLoading, error] = useFetch('./data/cards.json', categoriesDTOValidator);

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error...</>;

  return (
    <div>
      <Header />
      <HashRouter>
        <div>
          <Sidebar data={data === null ? [] : fixLinks(data)} />
          <Switch>
            <Route exact path="/">
              <Categories data={data === null ? [] : fixLinks(data)} />
            </Route>
            <Route path="/about">
              <>ABOUT</>
            </Route>
            <Route path="/:slug">
              <Cards data={data === null ? [] : fixLinks(data)} />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.body
);
