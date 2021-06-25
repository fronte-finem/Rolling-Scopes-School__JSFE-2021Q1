import React from 'react';
import styled from 'styled-components';

export const StyledBtnMenu = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  width: 60px;
  height: 60px;
  padding: 0;
  border: none;
  background: transparent;

  &:hover {
    --middle: scaleX(0);
    --top: rotate(45deg) scaleX(1.414);
    --bottom: rotate(-45deg) scaleX(1.414);
  }
`;

export const Stripe = styled.span`
  display: block;
  height: 10px;
  background: #333;
  border-radius: 5px;
  transform: var(--middle);
  transform-origin: center left;
  transition: all 500ms;
`;
export const StripeOuter = styled(Stripe)`
  transform-origin: 5px;
`;
export const StripeTop = styled(StripeOuter)`
  transform: var(--top);
`;
export const StripeBottom = styled(StripeOuter)`
  transform: var(--bottom);
`;

export const BtnMenu = () => {
  return (
    <StyledBtnMenu>
      <StripeTop />
      <Stripe />
      <StripeBottom />
    </StyledBtnMenu>
  );
};
