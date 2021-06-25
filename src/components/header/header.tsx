import { BtnMenu } from 'components/btn-menu/btn-menu';
import React from 'react';
import { StyledProps } from 'types/styled';
import { StyledGameModeSwitch, StyledHeader, StyledHeading, Wrapper } from './style';

export const Header = ({ className }: StyledProps) => {
  return (
    <StyledHeader className={className}>
      <Wrapper>
        <BtnMenu />
        <StyledHeading>English for kids</StyledHeading>
        <StyledGameModeSwitch />
      </Wrapper>
    </StyledHeader>
  );
};
