import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Main } from 'app/app-style';
import { Header } from 'components/header/header';
import { Sidebar } from 'components/sidebar/sidebar';

export const NotFoundRoute: FC = () => {
  const { route } = useParams<{ route: string }>();
  return (
    <>
      <Sidebar />
      <Header />
      <Main>
        <h2>Not found: &quot;{route}&quot;</h2>;
      </Main>
    </>
  );
};
