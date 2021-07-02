import styled from 'styled-components';

export const Btn = styled.button<{ isPrimary: boolean }>`
  --ease-out-back: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --color-background: ${({ isPrimary }) => (isPrimary ? '#fc8' : '#8cf')};
  --color-foreground: #111;
  --icon-rotate: 0deg;
  --btn-width: ${({ isPrimary }) => (isPrimary ? '220px' : '240px')};

  --time: 300ms;

  display: block;
  width: auto;
  border-radius: 10px;
  border: 3px solid var(--color-foreground);
  background: var(--color-background);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all var(--time);

  &:hover {
    --color-background: ${({ isPrimary }) => (isPrimary ? '#f80' : '#08f')};
    --color-foreground: #000;
    --icon-rotate: 180deg;
  }
  &:active {
    --color-background: ${({ isPrimary }) => (isPrimary ? '#ff0' : '#0ff')};
    --color-foreground: #444;
    --icon-rotate: 360deg;
  }
`;

export const Content = styled.div`
  width: var(--btn-width);
  display: grid;
  grid-template-columns: 1fr 50px 1fr;
  grid-template-rows: 25px;
  align-items: center;
  column-gap: 5px;
  color: var(--color-foreground);
  transition: all var(--time);
`;

export const Word = styled.div`
  display: block;
  &:first-child {
    justify-self: flex-end;
  }
  &:last-child {
    justify-self: flex-start;
    transform: scale(-1, 1);
  }
`;

export const StyledSvg = styled.svg`
  flex: 0 0 50px;
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid var(--color-foreground);
  color: var(--color-foreground);
  fill: var(--color-background);
  transition: all var(--time), transform var(--time);
  transition-timing-function: linear, var(--ease-out-back);
  transform: rotate(var(--icon-rotate));
`;
