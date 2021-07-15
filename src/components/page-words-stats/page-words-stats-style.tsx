import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { button } from 'components/button/button-style';
import { styledScroll } from 'components/style/styled-scroll';

const longButton = css`
  ${button};
  width: 300px;
  height: 50px;
`;

export const Btn = styled.button`
  ${longButton};
`;

export const BtnLink = styled(Link)`
  ${longButton};
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
