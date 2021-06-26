import React from 'react';

import { StyledProps } from 'types/styled';

import { StyledGameModeSwitch, StyledHeader, StyledHeading, Wrapper } from './style';

export const Header = ({ className }: StyledProps): JSX.Element => {
  return (
    <StyledHeader className={className}>
      <Wrapper>
        <StyledHeading>English for kids</StyledHeading>
        <StyledGameModeSwitch />
      </Wrapper>
    </StyledHeader>
  );
};
