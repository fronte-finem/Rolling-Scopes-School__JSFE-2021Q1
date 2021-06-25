import React from 'react';

import { StyledProps } from 'types/styled';

import {
  StripeBottomLeft,
  StripeBottomRight,
  StripeMiddle,
  StripeTopLeft,
  StripeTopRight,
  StyledBtnMenu,
  StyledWrapper,
} from './style';

export const BtnMenu = ({ className }: StyledProps): JSX.Element => {
  return (
    <StyledBtnMenu className={className}>
      <StyledWrapper>
        <StripeTopLeft />
        <StripeTopRight />
        <StripeMiddle />
        <StripeBottomLeft />
        <StripeBottomRight />
      </StyledWrapper>
    </StyledBtnMenu>
  );
};
