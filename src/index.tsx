import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { App } from 'app/app';
import { DataContextProvider } from 'services/data/data-context';

ReactDOM.render(
  <DataContextProvider>
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  </DataContextProvider>,
  document.getElementById('root')
);
