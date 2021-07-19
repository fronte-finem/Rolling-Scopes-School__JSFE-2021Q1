import React from 'react';

import { CardImage, CardWord, StyledCardBackSide, StyledCardFrontSide } from './side-style';

export interface CardSideProps {
  word: string;
  image: string;
  children?: JSX.Element;
}

const Side = ({ image, word, children }: CardSideProps) => {
  return (
    <>
      <CardImage src={image} alt={word} />
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
      <Side image={image} word={word}>
        {children}
      </Side>
    </StyledCardFrontSide>
  );
};

export const CardBackSide = ({ image, word }: CardSideProps): JSX.Element => {
  return (
    <StyledCardBackSide>
      <Side image={image} word={word} />
    </StyledCardBackSide>
  );
};
