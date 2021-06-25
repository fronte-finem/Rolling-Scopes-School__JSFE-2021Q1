import React from 'react';

import { BtnFlip, CardImage, CardWord, StyledCardBackSide, StyledCardSide } from './style';

export interface CardSideProps {
  word: string;
  image: string;
  children?: JSX.Element;
}

const CardSide = ({ image, word, children }: CardSideProps) => {
  return (
    <>
      <CardImage src={image} alt={word} draggable={false} />
      <CardWord>
        {word}
        {children}
      </CardWord>
    </>
  );
};

export const CardFrontSide = ({ image, word }: CardSideProps): JSX.Element => {
  return (
    <StyledCardSide>
      <CardSide image={image} word={word}>
        <BtnFlip />
      </CardSide>
    </StyledCardSide>
  );
};

export const CardBackSide = ({ image, word }: CardSideProps): JSX.Element => {
  return (
    <StyledCardBackSide>
      <CardSide image={image} word={word} />
    </StyledCardBackSide>
  );
};
