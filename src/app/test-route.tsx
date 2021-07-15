import React from 'react';
import { useParams } from 'react-router-dom';

import { Main } from 'app/app-style';
import { Header } from 'components/header/header';
import { FailPage, WinPage } from 'components/page-game-end/page-game-end';
import { Sidebar } from 'components/sidebar/sidebar';
import { TestPage } from 'components/test-page/test-page';

const TestRoutesMap = new Map<string, JSX.Element>([
  ['win', <WinPage />],
  ['fail', <FailPage />],
  ['test', <TestPage />],
]);

const NoTestRoute: React.FC<{ component: string }> = ({ component }) => {
  return (
    <>
      <Sidebar />
      <Header />
      <Main>
        <h2>No test for &quot;{component}&quot;</h2>;
      </Main>
    </>
  );
};

export const TestRoute: React.FC = () => {
  const { component } = useParams<{ component: string }>();
  return TestRoutesMap.get(component) || <NoTestRoute component={component} />;
};
