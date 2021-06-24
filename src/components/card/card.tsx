import React from 'react';
import { CardDTO } from 'types/dto';
import { CardSide } from './side';
import { CardContainer, StyledCard } from './style';

export interface CardProps {
  data: CardDTO;
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
