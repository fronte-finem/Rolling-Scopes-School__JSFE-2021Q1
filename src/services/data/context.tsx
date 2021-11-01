import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { DataService } from 'services/data/service';

const DataContext = React.createContext<DataService | undefined>(undefined);

export const DataContextProvider: React.FC = observer(({ children }) => {
  const dataService = new DataService();

  useEffect(() => {
    (async () => {
      await dataService.init();
    })();
  }, []);

  return <DataContext.Provider value={dataService}>{children}</DataContext.Provider>;
});

export const useDataContext = (): DataService => {
  const dataService = React.useContext(DataContext);
  if (!dataService) throw new Error('DataContext undefined!');
  return dataService;
};
