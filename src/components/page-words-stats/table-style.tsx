import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 0 20px #0004, 0 10px 20px #0002, 0 20px 20px #0002, 0 30px 20px #0002;
`;

export const Thead = styled.thead`
  border-radius: inherit;

  tr:first-child {
    border-radius: inherit;
    *:first-child {
      border-top-left-radius: inherit;
    }
    *:last-child {
      border-top-right-radius: inherit;
    }
  }
`;

export const Tbody = styled.tbody`
  border-radius: inherit;

  tr {
    transition: all 100ms;
  }

  &:hover tr {
    opacity: 0.5;
  }

  &:hover tr:hover {
    opacity: 1;
    box-shadow: 0 0 5px 1px #0004;
  }

  tr:nth-child(2n) {
    background: #0002;
  }

  tr:last-child {
    border-radius: inherit;
    td:first-child {
      border-bottom-left-radius: inherit;
    }
    td:last-child {
      border-bottom-right-radius: inherit;
    }
  }
`;
