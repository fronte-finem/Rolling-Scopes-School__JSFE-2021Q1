import styled from 'styled-components';

export const StyledBtnFlip = styled.button`
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: transparent;
  box-shadow: 0 0 5px 2px #0004;
  transition: all 300ms;

  &:hover {
    transform: rotate(180deg);
    box-shadow: 0 0 5px 4px #0004;
  }

  &:active {
    transform: rotate(360deg);
    box-shadow: 0 0 1px 2px #0004;
  }
`;

export const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
  fill: #fff;
`;
