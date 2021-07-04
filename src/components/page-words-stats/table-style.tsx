import styled from 'styled-components';

export const StyledTable = styled.table`
  position: relative;
  width: 100%;
  min-width: 1200px;
  box-shadow: 0 0 20px #0004, 0 10px 20px #0002, 0 20px 20px #0002, 0 30px 20px #0002;
`;

export const Thead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 2;
`;

export const Tbody = styled.tbody`
  tr {
    transition: all 100ms;
  }

  &:hover tr {
    opacity: 0.8;
  }

  &:hover tr:hover {
    opacity: 1;
    box-shadow: 0 0 5px 1px #0004;
  }

  tr:nth-child(2n) {
    background: #0002;
  }
`;
