import React from 'react';
import { CardSide } from './side';
import { CardContainer, StyledCard } from './style';

export interface CardProps {
  card: {
    word: string;
    translation: string;
    image: string;
    audio: string;
  };
}

export const Card = ({ card }: CardProps) => {
  const { word, translation, image } = card;
  return (
    <CardContainer>
      <StyledCard>
        <CardSide word={word} image={image} />
        <CardSide word={translation} image={image} back />
      </StyledCard>
    </CardContainer>
  );
};
