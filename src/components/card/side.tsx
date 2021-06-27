import React from 'react';

import { CardImage, CardWord, StyledCardBackSide, StyledCardFrontSide } from './style';

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

export const CardFrontSide = ({ image, word, children }: CardSideProps): JSX.Element => {
  return (
    <StyledCardFrontSide>
      <CardSide image={image} word={word}>
        {children}
      </CardSide>
    </StyledCardFrontSide>
  );
};

export const CardBackSide = ({ image, word }: CardSideProps): JSX.Element => {
  return (
    <StyledCardBackSide>
      <CardSide image={image} word={word} />
    </StyledCardBackSide>
  );
};
