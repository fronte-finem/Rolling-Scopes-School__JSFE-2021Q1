import React from 'react';

import { Main } from 'app/app-style';
import { Header } from 'components/header/header';
import { Sidebar } from 'components/sidebar/sidebar';
import { useWordsStatsContext } from 'services/stats/words-stats-context';

import { Btn, BtnContainer, BtnLink, Container, TableContainer } from './page-words-stats-style';
import { Table } from './table';

export const PageWordsStats: React.FC = () => {
  const { resetStats } = useWordsStatsContext();

  return (
    <>
      <Sidebar />
      <Header />
      <Main>
        <Container>
          <BtnContainer>
            <Btn onClick={resetStats}>reset statistic data</Btn>
            <BtnLink to="/difficult">repeat difficult words</BtnLink>
          </BtnContainer>
          <TableContainer>
            <Table />
          </TableContainer>
        </Container>
      </Main>
    </>
  );
};
