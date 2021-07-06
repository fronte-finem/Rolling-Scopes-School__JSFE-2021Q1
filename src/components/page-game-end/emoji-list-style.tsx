import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const List = styled.ul.attrs((props: { amount?: number; tangent?: number }) => ({
  amount: props.amount || 0,
  tangent: props.tangent?.toFixed(3) || 0,
}))`
  --amount: ${(props) => props.amount};
  --tangent: ${(props) => props.tangent};
  --emoji-size: min(20vh, 20vw);
  --space: 1;
  --radius: min(20vh, 20vw);
  --container-size: calc(2 * var(--radius) + var(--emoji-size));
  --animation: 12s ${rotate} linear infinite;

  position: relative;
  display: block;
  width: var(--container-size);
  height: var(--container-size);
  animation: var(--animation);

  .emoji-animate {
    animation: var(--animation) reverse;
  }
`;

export const ListItem = styled.li.attrs((props: { index?: number }) => ({
  index: props.index || 0,
}))`
  --index: ${(props) => props.index};
  --angle: calc(var(--index) * 1turn / var(--amount));
  --position: calc(50% - var(--emoji-size) / 2);

  position: absolute;
  top: var(--position);
  left: var(--position);
  display: block;
  width: var(--emoji-size);
  height: var(--emoji-size);
  transform: rotate(var(--angle)) translate(var(--radius)) rotate(calc(-1 * var(--angle)));
`;
