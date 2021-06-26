import styled, { css } from 'styled-components';

export const StyledBtnMenu = styled.button`
  --scale-x: scaleX(1.5);
  --stripe-s: 5px;
  --stripe-w: calc(50% + var(--stripe-s));
  --stripe-h: calc(2 * var(--stripe-s));
  --stripe-c: #111;

  position: relative;
  width: 50px;
  height: 50px;
  padding: 0;
  border: none;
  background: transparent;

  &.close {
    --middle: scaleX(0);
    --clockwise: rotate(45deg) scaleX(1.4142);
    --counter-clockwise: rotate(-45deg) scaleX(1.4142);
    --scale-x: scaleX(1);
    --stripe-c: #eee;
  }
`;

export const StyledWrapper = styled.span`
  position: absolute;
  top: 0;
  left: -50%;
  width: 100%;
  height: 100%;
  transition: all 200ms ease-in-out;
  transform: translateX(50%) var(--scale-x);
`;

const Stripe = styled.span`
  display: block;
  position: absolute;
  width: var(--stripe-w);
  height: var(--stripe-h);
  background: var(--stripe-c);
  border-radius: var(--stripe-s);
  transition: all 200ms ease-in-out;
`;

export const StripeMiddle = styled(Stripe)`
  top: calc(50% - var(--stripe-s));
  width: 100%;
  transform-origin: center;
  transform: var(--middle);
`;

const left = css`
  left: 0;
  transform-origin: var(--stripe-s) var(--stripe-s);
`;
const right = css`
  right: 0;
  transform-origin: calc(100% - var(--stripe-s)) var(--stripe-s);
`;
const top = css`
  top: 0;
`;
const bottom = css`
  bottom: 0;
`;

export const StripeTopLeft = styled(Stripe)`
  ${top}
  ${left}
  transform: var(--clockwise);
`;

export const StripeTopRight = styled(Stripe)`
  ${top}
  ${right}
  transform: var(--counter-clockwise);
`;

export const StripeBottomLeft = styled(Stripe)`
  ${bottom}
  ${left}
  transform: var(--counter-clockwise);
`;

export const StripeBottomRight = styled(Stripe)`
  ${bottom}
  ${right}
  transform: var(--clockwise);
`;
