import React from 'react';

import { StyledProps } from 'types/styled';

import { StyledFooter, StyledHeading, Wrapper } from './style';

export const Footer = ({ className }: StyledProps): JSX.Element => {
  return (
    <StyledFooter className={className}>
      <Wrapper>
        <StyledHeading>F O O T E R</StyledHeading>
      </Wrapper>
    </StyledFooter>
  );
};
