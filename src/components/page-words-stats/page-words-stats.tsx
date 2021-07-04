import React from 'react';

import { Container, TableContainer } from './page-words-stats-style';
import { Table } from './table';

export const PageWordsStats: React.FC = () => {
  return (
    <Container>
      <TableContainer>
        <Table />
      </TableContainer>
    </Container>
  );
};
