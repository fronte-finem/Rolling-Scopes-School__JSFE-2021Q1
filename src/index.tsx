import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { App } from 'app/app';
import { ModalContextProvider } from 'components/modal/modal-context';
import { DataContextProvider } from 'services/data/context';
import { GameContextProvider } from 'services/game/context';
import { WordsStatsContextProvider } from 'services/word-stat/context';

const Root: React.FC = observer(() => {
  return (
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
  );
});

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
