import React, { useRef, useState } from 'react';

import { WordDTO } from 'services/data/dto-word';
import { StyledProps } from 'types/styled';

import { CardContainer, CardSolvedLayer, StyledBtnFlip, StyledCard } from './card-style';
import { CardBackSide, CardFrontSide } from './side';

export interface CardProps extends StyledProps {
  wordDTO: WordDTO;
  className?: string;
  isGameMode: boolean;
  isGameReady: boolean;
  isGamePlay: boolean;
  isSolved: boolean;
  isWaiting: boolean;
  matchWord: (word: WordDTO) => void;
}

const getClassName = (
  isFlipped: boolean,
  { isGameMode, isGameReady, isGamePlay, isSolved, isWaiting }: CardProps
): string => {
  let className = isGameMode ? 'game' : 'train';
  if (!isGamePlay && isFlipped) className += ' flip';
  if (isGameReady) className += ' game-ready';
  if (isGamePlay && !isSolved) className += ' game-play';
  if (isGameMode && isSolved) className += ' solved';
  if (isGameMode && isWaiting) className += ' waiting';
  return className;
};

export const Card = (props: CardProps): JSX.Element => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isFlipped, setFlip] = useState(false);
  const { className, wordDTO, isGameMode, matchWord } = props;
  const { word, translation, image, audio } = wordDTO;
  const cardClassName = getClassName(isFlipped, props);

  const handlePlay = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (isGameMode) {
      matchWord(wordDTO);
      return;
    }
    if (ref.current?.contains(ev.target as Node)) return;
    void new Audio(audio).play();
  };

  return (
    <CardContainer className={className} onMouseLeave={() => setFlip(false)}>
      <StyledCard className={cardClassName} onClick={handlePlay}>
        <CardFrontSide word={word} image={image}>
          <StyledBtnFlip onFlip={() => setFlip(true)} ref={ref} />
        </CardFrontSide>
        <CardBackSide word={translation} image={image} />
        <CardSolvedLayer />
      </StyledCard>
    </CardContainer>
  );
};
