import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, NavLink, Switch, Route, useParams } from 'react-router-dom';
import { CardsField } from 'components/cards-field/cards-field';
import { categoriesDTOValidator } from 'types/category-dto';
import { useFetch } from 'services/fetch-hook';
import { fixLinks } from 'services/fix-links';
import { Categories, CategoriesProps } from 'components/categories/categories';

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
      <h1>English for kids!</h1>
      <HashRouter>
        <div>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/">
              <Categories data={data === null ? [] : fixLinks(data)} />
            </Route>
            <Route path="/:slug">
              <Cards data={data === null ? [] : fixLinks(data)} />
            </Route>
            <Route path="/about">
              <>ABOUT</>
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
