import React from 'react';
import styled from 'styled-components';

import { Card } from 'components/card/card';
import { CardDTO } from 'types/card-dto';

const StyledCardsField = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  overflow: hidden;
`;

const CARD_WIDTH = 300;

const StyledCardsFieldItem = styled(Card)`
  flex: 0 0 ${CARD_WIDTH}px;
  perspective: ${CARD_WIDTH * 3}px;
`;

export interface CardsFieldProps {
  cards: Array<CardDTO>;
}

export const CardsField = ({ cards }: CardsFieldProps): JSX.Element => {
  return (
    <StyledCardsField>
      {cards.map((cardData) => (
        <StyledCardsFieldItem key={cardData.word} data={cardData} />
      ))}
    </StyledCardsField>
  );
};
