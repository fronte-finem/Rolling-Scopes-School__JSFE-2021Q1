import React from 'react';

import { StyledProps } from 'types/styled';
import { WordDTO } from 'types/word-dto';

import { StyledCardsField, StyledCardsFieldItem } from './style';

export interface CardsFieldProps extends StyledProps {
  words: WordDTO[];
}

export const CardsField = ({ words, className }: CardsFieldProps): JSX.Element => {
  return (
    <StyledCardsField className={className}>
      {words.map((wordDTO) => (
        <StyledCardsFieldItem key={wordDTO.word} wordDTO={wordDTO} />
      ))}
    </StyledCardsField>
  );
};
