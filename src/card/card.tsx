import React from 'react';
import { CardSide } from './side';
import { CardContainer, StyledCard } from './style';

export interface CardData {
  word: string;
  translation: string;
  image: string;
  audio: string;
}

export interface CardProps {
  data: CardData;
  className?: string;
}

export const Card = ({ className, data }: CardProps) => {
  const { word, translation, image } = data;
  return (
    <CardContainer className={className}>
      <StyledCard>
        <CardSide word={word} image={image} />
        <CardSide word={translation} image={image} back />
      </StyledCard>
    </CardContainer>
  );
};
