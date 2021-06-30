import styled from 'styled-components';

import { ModeSwitch } from './mode-switch';

export const StyledHeader = styled.header`
  height: 150px;
`;

export const Wrapper = styled.div`
  --ofsset: 100px;
  position: relative;
  max-width: 1440px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 10px var(--ofsset);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media (max-width: 800px) {
    --ofsset: 50px;
  }
  @media (max-width: 400px) {
    --ofsset: 20px;
  }
`;

export const StyledModeSwitch = styled(ModeSwitch)`
  position: absolute;
  right: 20px;
  top: 20px;
`;

export const StyledHeading = styled.h1`
  flex: 1 0 100%;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 800px) {
    display: none;
  }
`;

export const BtnStart = styled.button`
  align-self: flex-end;
  //position: absolute;
  //right: 20px;
  //top: 80px;
  padding: 10px 20px;
  border: 5px solid #111;
  border-radius: 10px;
  background: #fff;
  color: #111;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: 300ms;

  &:hover {
    background: #111;
    color: #fff;
  }
`;
