import React from 'react';
import { StyledCardSide, CardImage, CardWord, BtnFlip } from './style';

interface CardSideProps {
  word: string;
  image: string;
  back?: boolean;
}

export const CardSide = ({ image, word, back = false }: CardSideProps) => {
  return (
    <StyledCardSide back={back}>
      <CardImage src={image} alt={word} />
      <CardWord>
        {word}
        {!back && <BtnFlip />}
      </CardWord>
    </StyledCardSide>
  );
};
