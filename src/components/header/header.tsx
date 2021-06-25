import { BtnMenu } from 'components/btn-menu/btn-menu';
import React from 'react';
import {
  StyledBtnToggleBar,
  StyledGameModeSwitch,
  StyledHeader,
  StyledHeading,
  Wrapper,
} from './style';

export const Header = () => {
  return (
    <StyledHeader>
      <Wrapper>
        <BtnMenu />
        <StyledHeading>English for kids</StyledHeading>
        <StyledGameModeSwitch />
      </Wrapper>
    </StyledHeader>
  );
};
