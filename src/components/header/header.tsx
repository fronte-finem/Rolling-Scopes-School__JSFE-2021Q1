import React from 'react';

import { BtnMenu } from 'components/btn-menu/btn-menu';
import { GameModeSwitch } from 'components/game-mode-switch/game-mode-switch';
import { StyledProps } from 'types/styled';

import { StyledHeader, StyledHeading, Wrapper } from './style';

export const Header = ({ className }: StyledProps): JSX.Element => {
  return (
    <StyledHeader className={className}>
      <Wrapper>
        <BtnMenu />
        <StyledHeading>English for kids</StyledHeading>
        <GameModeSwitch />
      </Wrapper>
    </StyledHeader>
  );
};
