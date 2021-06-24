import React from 'react';
import ReactDOM from 'react-dom';
import { CardsField } from 'components/cards-field/cards-field';
import { categoriesDTOValidator } from 'types/dto';
import { useFetch } from 'services/fetch-hook';
import { fixLinks } from 'services/fix-links';

const App = () => {
  const [data, isLoading, error] = useFetch('./data/cards.json', categoriesDTOValidator);

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error...</>;

  return (
    <div>
      <h1>English for kids!</h1>
      <CardsField cards={data === null ? [] : fixLinks(data)[5].cards} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.body
);
