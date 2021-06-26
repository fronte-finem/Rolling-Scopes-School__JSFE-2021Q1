import React, { useContext } from 'react';

import { StyledProps } from 'types/styled';

import { SidebarContext } from '../../contexts/sidebar-context';
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
  const {
    sidebarState: { close },
    dispatch,
  } = useContext(SidebarContext);

  const btnClassName = `${className || ''} ${!close ? 'close' : ''}`;

  const handleClick = () => {
    dispatch(!close);
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
