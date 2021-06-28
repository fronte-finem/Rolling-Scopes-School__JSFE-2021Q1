import React from 'react';
import { useParams } from 'react-router-dom';

import { useWordsData } from 'services/data-context';
import { StyledProps } from 'types/styled';
import { WordDTO } from 'types/word-dto';

import { StyledCardsField, StyledCardsFieldItem } from './style';

export const CardsField = ({ className }: StyledProps): JSX.Element => {
  const { categoryPath } = useParams<{ categoryPath: string }>();
  const words: string | WordDTO[] = useWordsData(categoryPath);
  if (typeof words === 'string') return <h2>{words}</h2>;

  return (
    <StyledCardsField className={className}>
      {words.map((dto) => (
        <StyledCardsFieldItem key={dto.word} wordDTO={dto} />
      ))}
    </StyledCardsField>
  );
};
