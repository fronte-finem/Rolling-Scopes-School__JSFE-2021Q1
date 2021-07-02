import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { FailPage, WinPage } from 'components/page-game-end/page-game-end';
import { TestPage } from 'components/test-page/test-page';

const TestRoutesMap = new Map<string, JSX.Element>([
  ['about', <h2>ABOUT</h2>],
  ['win', <WinPage />],
  ['fail', <FailPage />],
  ['test', <TestPage />],
]);

const NoTestRoute: FC<{ component: string }> = ({ component }) => {
  return <h2>No test for &quot;{component}&quot;</h2>;
};

export const TestRoute: FC = () => {
  const { component } = useParams<{ component: string }>();
  return TestRoutesMap.get(component) || <NoTestRoute component={component} />;
};
