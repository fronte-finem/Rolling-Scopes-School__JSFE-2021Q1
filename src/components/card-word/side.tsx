import React from 'react';

import { CardImage, CardWord, StyledCardBackSide, StyledCardFrontSide } from './side-style';

interface Props {
  word: string;
  image: string;
}

const Side: React.FC<Props> = ({ image, word, children }) => {
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

export const CardFrontSide: React.FC<Props> = ({ image, word, children }) => {
  return (
    <StyledCardFrontSide>
      <Side image={image} word={word}>
        {children}
      </Side>
    </StyledCardFrontSide>
  );
};

export const CardBackSide: React.FC<Props> = ({ image, word }) => {
  return (
    <StyledCardBackSide>
      <Side image={image} word={word} />
    </StyledCardBackSide>
  );
};
