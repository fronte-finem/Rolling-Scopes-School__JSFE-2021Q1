import styled, { css } from 'styled-components';

export const BtnSvg = styled.svg`
  display: block;
  width: 100%;
  height: 100%;
`;

interface BtnTheme {
  primary?: boolean;
}

export const RoundBtn = styled.button<BtnTheme>`
  --color: ${({ primary }) => (primary ? '#fff' : '#000')};
  --size: ${({ primary }) => (primary ? '120px' : '40px')};
  --border: ${({ primary }) => (primary ? '2px solid var(--color)' : 'none')};

  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  border: var(--border);
  background: none;
  fill: var(--color);
  transition: all 200ms;

  &:hover {
    --color: ${({ primary }) => (primary ? '#99f' : '#f08')};
    transform: rotate(90deg) scale(1.1);
  }
  &:active {
    --color: ${({ primary }) => (primary ? '#ccf' : '#f0f')};
    transform: rotate(180deg) scale(0.9);
  }
`;

export const button = css`
  --fg: #fff;
  --bg: #0008;
  --fg-hover: #fff;
  --bg-hover: #000a;
  --fg-active: #fff;
  --bg-active: #000d;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: none;

  text-transform: capitalize;
  text-decoration: none;
  text-align: center;
  font-family: monospace;

  background: var(--bg);
  color: var(--fg);
  transition: all 200ms;

  &:hover {
    background: var(--bg-hover);
    color: var(--fg-hover);
  }
  &:active {
    background: var(--bg-active);
    color: var(--fg-active);
  }
  &:disabled {
    opacity: 0.25;
    pointer-events: none;
  }
`;
