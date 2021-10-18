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
} from './btn-toggle-style';

export interface BtnToggleProps extends StyledProps {
  isClosed: boolean;
  onToggle: () => void;
}

export const BtnToggle = ({ className, isClosed, onToggle }: BtnToggleProps): JSX.Element => {
  const btnClassName = `${className || ''} ${!isClosed ? 'close' : ''}`;
  return (
    <StyledBtnMenu className={btnClassName} onClick={onToggle}>
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
