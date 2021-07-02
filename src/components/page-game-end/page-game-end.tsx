import React, { FC } from 'react';
import styled from 'styled-components';

import { EmoList } from 'components/page-game-end/emo-list';
import { useGameContext } from 'services/game/game-context';
import { StyledProps } from 'types/styled';

const StyledGameEndPage = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  overflow: hidden;
`;

const FailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FailMessage = styled.h2`
  padding: 20px 40px;
  text-align: center;
  font-size: 40px;
`;

const HAPPY = ['happy-cute', 'happy', 'in-love', 'cute', 'happy-smile'];
const SAD = ['very-sad', 'confused', 'arrogant', 'sad', 'bored'];

export const GameEndPage: FC<StyledProps> = ({ className, children }) => {
  return <StyledGameEndPage className={className}>{children}</StyledGameEndPage>;
};

export const WinPage: FC<StyledProps> = ({ className }) => {
  return (
    <GameEndPage className={className}>
      <EmoList emos={HAPPY} />
    </GameEndPage>
  );
};

export const FailPage: FC<StyledProps> = ({ className }) => {
  const { gameState } = useGameContext();
  return (
    <GameEndPage className={className}>
      <FailWrapper>
        <FailMessage>{gameState.mistakes} mistakes</FailMessage>
        <EmoList emos={SAD} />
      </FailWrapper>
    </GameEndPage>
  );
};
