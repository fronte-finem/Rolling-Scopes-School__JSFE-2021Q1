import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledHeader = styled.header`
  height: 100px;
  border-bottom: 3px solid #111;
  background: #fff8;
  backdrop-filter: invert(1);
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

  transform-style: preserve-3d;
  perspective: 300px;

  @media (max-width: 800px) {
    --ofsset: 50px;
  }
  @media (max-width: 400px) {
    --ofsset: 20px;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: #111;
  transition: all 300ms;

  &:hover {
    color: #00f;
  }
  &:active {
    color: #08f;
  }
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

export const BtnStartRepeatWrapper = styled.div<{ isHidden: boolean }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 300ms;
  transform: ${({ isHidden }) =>
    isHidden ? 'translate(-50%, 50%) rotateX(100deg)' : 'translate(-50%, 50%) rotateX(0deg)'};
  // opacity: ${({ isHidden }) => (isHidden ? '0' : '1')};
  pointer-events: ${({ isHidden }) => (isHidden ? 'none' : 'all')};
`;

export const ModeSwitchWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
`;
