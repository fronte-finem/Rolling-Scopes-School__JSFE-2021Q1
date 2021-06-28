import React, { useState } from 'react';

import { StyledProps } from 'types/styled';
import { WordDTO } from 'types/word-dto';

import { BtnFlip } from './btn-flip';
import { CardBackSide, CardFrontSide } from './side';
import { CardContainer, StyledCard } from './style';

export interface CardProps extends StyledProps {
  wordDTO: WordDTO;
  className?: string;
}

export const Card = ({ className, wordDTO }: CardProps): JSX.Element => {
  const { word, translation, image, audio } = wordDTO;

  const [isFlipped, setFlip] = useState(false);
  const cardClassName = `${isFlipped ? 'flip' : ''}`;
  const ref = React.createRef<HTMLButtonElement>();

  const handlePlay = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current?.contains(ev.target as Node)) return;
    void new Audio(audio).play();
  };

  return (
    <CardContainer className={className} onMouseLeave={() => setFlip(false)}>
      <StyledCard className={cardClassName} onClick={handlePlay}>
        <CardFrontSide word={word} image={image}>
          <BtnFlip onClick={() => setFlip(true)} ref={ref} />
        </CardFrontSide>
        <CardBackSide word={translation} image={image} />
      </StyledCard>
    </CardContainer>
  );
};
