import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CardsField } from 'components/cards-field/cards-field';
import { CardDTO, CategoryDTO } from 'types/dto';
import { fetchData } from 'services/fetch';

const App = () => {
  const [data, setData] = useState([] as Array<CardDTO>);

  useEffect(() => {
    (async () => {
      const data = await fetchData();
      if (data.length === 0) return;
      setData(data[2].cards);
    })();
    return;
  }, []);

  return (
    <div>
      <h1>English for kids!</h1>
      <CardsField cards={data} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.body
);
