import React, { useRef, useState } from 'react';

import { playAudio } from 'services/audio';
import { WordDTO } from 'services/data/dto-word';
import { StyledProps } from 'types/styled';

import { CardContainer, getCardClassName, StyledBtnFlip, StyledCard } from './card-style';
import { CardBackSide, CardFrontSide } from './side';

export interface CardProps extends StyledProps {
  wordDTO: WordDTO;
  className?: string;
  isGameMode: boolean;
  isGameReady: boolean;
  isGamePlay: boolean;
  isSolved: boolean;
  matchWord: (word: WordDTO) => void;
}

export const Card = (props: CardProps): JSX.Element => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isFlipped, setFlip] = useState(false);
  const { className, wordDTO, isGameMode, matchWord } = props;
  const { word, translation, image, audio } = wordDTO;
  const cardClassName = getCardClassName(isFlipped, props);

  const handlePlay = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (isGameMode) {
      matchWord(wordDTO);
      return;
    }
    if (ref.current?.contains(ev.target as Node)) return;
    playAudio(audio);
  };

  const handleMouseLeave = () => setFlip(() => false);
  const handleFlip = () => setFlip(() => true);

  return (
    <CardContainer className={className} onMouseLeave={handleMouseLeave}>
      <StyledCard className={cardClassName} onClick={handlePlay}>
        <CardFrontSide word={word} image={image}>
          <StyledBtnFlip onFlip={handleFlip} ref={ref} />
        </CardFrontSide>
        <CardBackSide word={translation} image={image} />
      </StyledCard>
    </CardContainer>
  );
};
