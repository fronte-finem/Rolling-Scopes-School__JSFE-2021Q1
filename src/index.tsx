import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { App } from 'app/app';
import { ModalContextProvider } from 'components/modal/modal-context';
import { DataContextProvider } from 'services/data/data-context';
import { GameContextProvider } from 'services/game/game-context';
import { WordsStatsContextProvider } from 'services/word-stat/service';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <ModalContextProvider>
        <DataContextProvider>
          <WordsStatsContextProvider>
            <GameContextProvider>
              <App />
            </GameContextProvider>
          </WordsStatsContextProvider>
        </DataContextProvider>
      </ModalContextProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
