import React, { FC } from 'react';
import styled from 'styled-components';

import { useGameContext } from 'services/game/game-context';
import { StyledProps } from 'types/styled';

const StyledGameEndPage = styled.div`
  --size: min(25vw, 25vh);
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  font-size: var(--size);
  line-height: var(--size);
`;

export const GameEndPage: FC<StyledProps> = ({ className, children }) => {
  return <StyledGameEndPage className={className}>{children}</StyledGameEndPage>;
};

export const WinPage: FC<StyledProps> = ({ className }) => {
  return <GameEndPage className={className}>😃</GameEndPage>;
};

export const FailPage: FC<StyledProps> = ({ className }) => {
  const { gameState } = useGameContext();
  return <GameEndPage className={className}>😞 {gameState.mistakes} mistakes</GameEndPage>;
};
