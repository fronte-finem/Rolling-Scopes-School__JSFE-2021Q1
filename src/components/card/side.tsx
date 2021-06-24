import React from 'react';
import { ProgressPlugin } from 'webpack';
import { StyledCardSide, CardImage, CardWord, BtnFlip, StyledCardBackSide } from './style';

interface CardSideProps {
  word: string;
  image: string;
  children?: JSX.Element;
}

const CardSide = ({ image, word, children }: CardSideProps) => {
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

export const CardFrontSide = ({ image, word }: CardSideProps) => {
  return (
    <StyledCardSide>
      <CardSide image={image} word={word}>
        <BtnFlip />
      </CardSide>
    </StyledCardSide>
  );
};

export const CardBackSide = ({ image, word }: CardSideProps) => {
  return (
    <StyledCardBackSide>
      <CardSide image={image} word={word} />
    </StyledCardBackSide>
  );
};
