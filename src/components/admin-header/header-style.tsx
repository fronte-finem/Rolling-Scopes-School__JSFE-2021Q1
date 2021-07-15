import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { button } from 'components/button/button-style';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-end;
    row-gap: 5px;
  }
`;

export const BtnContainer = styled.div`
  position: absolute;
  right: 0;
  top: 20px;

  @media (max-width: 800px) {
    right: 50%;
    transform: translateX(50%);
    top: 90px;
  }
`;

export const BtnLogout = styled.button`
  ${button};
  padding: 10px 30px;

  @media (max-width: 800px) {
    padding: 5px 20px;
  }
`;

export const Splitter = styled.div`
  flex: 0 0 3px;
  width: 3px;
  height: 20px;
  background: #0004;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const HeaderLink = styled(NavLink)`
  text-decoration: none;
  color: #22f;
  transition: all 200ms;

  &:hover {
    color: #fff;
  }
  &:active {
    color: #000;
  }
`;
