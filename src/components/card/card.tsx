import React from 'react';
import { CardDTO } from 'types/dto';
import { CardBackSide, CardFrontSide } from './side';
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
        <CardFrontSide word={word} image={image} />
        <CardBackSide word={translation} image={image} />
      </StyledCard>
    </CardContainer>
  );
};
