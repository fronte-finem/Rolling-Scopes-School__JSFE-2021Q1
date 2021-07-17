import React from 'react';

import { Main } from 'app/app-style';
import { Header } from 'components/header/header';
import { Sidebar } from 'components/sidebar/sidebar';
import { useWordsStatsService } from 'services/word-stat/service';

import { Btn, BtnContainer, BtnLink, Container, TableContainer } from './page-words-stats-style';
import { Table } from './table';

export const PageWordsStats: React.FC = () => {
  const wordsStatsService = useWordsStatsService();

  const handleResetStats = () => {
    wordsStatsService.reset();
  };

  return (
    <>
      <Sidebar />
      <Header />
      <Main>
        <Container>
          <BtnContainer>
            <Btn onClick={handleResetStats}>reset statistic data</Btn>
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
