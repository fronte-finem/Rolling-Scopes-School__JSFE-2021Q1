import { Card, CardData, CardProps } from 'card/card';
import React from 'react';
import styled from 'styled-components';

const StyledCardsField = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-gap: 20px;
`;

const CARD_WIDTH = 300;

const StyledCardsFieldItem = styled(Card)`
  flex: 0 0 ${CARD_WIDTH}px;
  perspective: ${CARD_WIDTH * 4}px;
`;

export interface CardsFieldProps {
  cards: Array<CardData>;
}

export const CardsField = ({ cards }: CardsFieldProps) => {
  return (
    <StyledCardsField>
      {cards.map((cardData) => (
        <StyledCardsFieldItem key={cardData.word} data={cardData} />
      ))}
    </StyledCardsField>
  );
};
