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
  const { sidebarState, closeSidebar } = useContext(SidebarContext);

  const btnClassName = `${className || ''} ${!sidebarState.isClosed ? 'close' : ''}`;

  const handleClick = () => closeSidebar(!sidebarState.isClosed);

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
