import React from 'react';

import { useWordsStatsContext } from 'services/stats/words-stats-context';

import { Btn, BtnContainer, Container, TableContainer } from './page-words-stats-style';
import { Table } from './table';

export const PageWordsStats: React.FC = () => {
  const { resetStats } = useWordsStatsContext();

  return (
    <Container>
      <BtnContainer>
        <Btn onClick={resetStats}>reset statistic data</Btn>
        <Btn>repeat difficult words</Btn>
      </BtnContainer>
      <TableContainer>
        <Table />
      </TableContainer>
    </Container>
  );
};
