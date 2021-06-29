import React, { useRef, useState } from 'react';

import { StyledProps } from 'types/styled';
import { WordDTO } from 'types/word-dto';

import { BtnFlip } from './btn-flip';
import { CardBackSide, CardFrontSide } from './side';
import { CardContainer, CardSolvedLayer, StyledCard } from './style';

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
  let className = '';
  if (isFlipped) className += ' flip';
  if (isGameMode) className += ' game ';
  if (isGameReady) className += ' game-ready';
  if (isGamePlay) className += ' game-play';
  if (isSolved) className += ' solved';
  if (isWaiting) className += ' waiting';
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
          <BtnFlip onClick={() => setFlip(true)} ref={ref} />
        </CardFrontSide>
        <CardBackSide word={translation} image={image} />
        <CardSolvedLayer />
      </StyledCard>
    </CardContainer>
  );
};
