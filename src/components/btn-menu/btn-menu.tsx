import React, { useState } from 'react';

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
  const [close, setClose] = useState(false);

  const btnClassName = `${className || ''} ${close ? 'close' : ''}`;

  const handleClick = () => {
    setClose(!close);
  };

  return (
    <StyledBtnMenu className={btnClassName} onClick={handleClick}>
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
