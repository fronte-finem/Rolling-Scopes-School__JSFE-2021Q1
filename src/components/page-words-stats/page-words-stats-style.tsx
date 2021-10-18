import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { styledScroll } from 'components/style/styled-scroll';

const btn = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 50px;
  padding: 0;
  border: none;
  background: #0008;
  color: #fff;
  text-transform: capitalize;
  text-decoration: none;
  text-align: center;
  font-family: monospace;
  transition: all 200ms;

  &:hover {
    background: #000a;
  }
  &:active {
    background: #000d;
  }
`;

export const Btn = styled.button`
  ${btn};
`;

export const BtnLink = styled(Link)`
  ${btn};
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
  width: 100%;
  padding: 20px 0;

  @media (max-width: 800px) {
    flex-direction: column;
    row-gap: 20px;
  }
`;

export const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 50px;

  @media (max-width: 800px) {
    padding: 50px 25px;
  }
  @media (max-width: 600px) {
    padding: 50px 15px;
  }
  @media (max-width: 400px) {
    padding: 50px 5px;
  }
`;

export const TableContainer = styled.div`
  overflow-x: auto;
  height: 70vh;
  ${styledScroll};
`;
