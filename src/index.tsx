import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { App } from 'app/app';
import { DataContextProvider } from 'services/data/data-context';
import { GameContextProvider } from 'services/game/game-context';
import { WordsStatsContextProvider } from 'services/stats/words-stats-context';

ReactDOM.render(
  <React.StrictMode>
    <DataContextProvider>
      <WordsStatsContextProvider>
        <GameContextProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </GameContextProvider>
      </WordsStatsContextProvider>
    </DataContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
