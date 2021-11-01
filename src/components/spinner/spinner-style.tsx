import styled, { keyframes } from 'styled-components';

export const SpinnerContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  overflow: hidden;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SpinnerMessage = styled.h2`
  padding: 20px 40px;
  text-align: center;
  font-size: 40px;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export enum SpinnerAnimationStyle {
  SPINNER = 'spinner',
  EMOJI = 'emoji',
}

interface Props {
  amount?: number;
  tangent?: number;
  animationStyle?: SpinnerAnimationStyle;
}

export const List = styled.ul.attrs((props: Props) => ({
  amount: props.amount || 0,
  tangent: props.tangent?.toFixed(3) || 0,
  animationStyle: props.animationStyle || SpinnerAnimationStyle.EMOJI,
}))`
  --amount: ${(props) => props.amount};
  --tangent: ${(props) => props.tangent};
  --emoji-size: min(20vh, 20vw);
  --space: 1;
  --radius: min(20vh, 20vw);
  --container-size: calc(2 * var(--radius) + var(--emoji-size));
  --animation-emoji: 12s ${rotate} linear infinite;
  --animation-spinner: 9s ${rotate} steps(9, end) infinite;
  --animation-emoji-icon: var(--animation-emoji) reverse;
  --animation-spinner-icon: 500ms ${rotate} steps(9, end) infinite;

  position: relative;
  display: block;
  width: var(--container-size);
  height: var(--container-size);
  animation: ${(props) => {
    switch (props.animationStyle) {
      case SpinnerAnimationStyle.EMOJI:
        return 'var(--animation-emoji)';
      case SpinnerAnimationStyle.SPINNER:
        return 'var(--animation-spinner)';
      default:
        return 'var(--animation-emoji)';
    }
  }};

  .icon-animate {
    animation: ${(props) => {
      switch (props.animationStyle) {
        case SpinnerAnimationStyle.EMOJI:
          return 'var(--animation-emoji-icon)';
        case SpinnerAnimationStyle.SPINNER:
          return 'var(--animation-spinner-icon)';
        default:
          return 'var(--animation-emoji-icon)';
      }
    }};
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
