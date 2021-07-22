import styled from 'styled-components';

export const StyledBtnFlip = styled.button`
  --time: 500ms;
  --ease-out-back: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: transparent;
  box-shadow: 0 0 5px 2px #0004;
  transition: all var(--time), transform var(--time);
  transition-timing-function: linear, var(--ease-out-back);
  fill: #fff;

  &:hover {
    transform: rotate(180deg);
    box-shadow: 0 0 5px 4px #0004;
  }

  &:active {
    transform: rotate(360deg);
    box-shadow: 0 0 1px 2px #0004;
  }
`;
