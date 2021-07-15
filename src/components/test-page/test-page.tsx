import React from 'react';

import { Main } from 'app/app-style';
import { BtnStartRepeat } from 'components/header/btn-start-repeat';
import { Header } from 'components/header/header';
import { Sidebar } from 'components/sidebar/sidebar';

export const TestPage: React.FC = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <Main>
        <div>
          <BtnStartRepeat onClick={() => {}} isStart />
          <BtnStartRepeat onClick={() => {}} />
        </div>
      </Main>
    </>
  );
};
