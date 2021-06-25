import React from 'react';
import { StyledProps } from 'types/styled';
import {
  StyledBtnMenu,
  StripeTopLeft,
  StripeTopRight,
  StripeMiddle,
  StripeBottomLeft,
  StripeBottomRight,
  StyledWrapper,
} from './style';

export const BtnMenu = ({ className }: StyledProps) => {
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
