import React from 'react';
import styled from 'styled-components';

import { StyledProps } from 'types/styled';

const StyledGameModeSwitch = styled.button`
  width: 100px;
  height: 100px;
`;

export const GameModeSwitch = ({ className }: StyledProps): JSX.Element => {
  return <StyledGameModeSwitch className={className} />;
};
