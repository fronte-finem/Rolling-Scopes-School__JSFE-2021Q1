import React, { useRef, useState } from 'react';

import { Marks } from 'components/card/marks';
import { playAudio } from 'services/audio';
import { WordDTO } from 'services/data/dto-word';
import { StyledProps } from 'types/styled';
import { randomItem } from 'utils/random';

import {
  CardContainer,
  getCardClassName,
  MarksWrapper,
  StyledBtnFlip,
  StyledCard,
} from './card-style';
import { CardBackSide, CardFrontSide } from './side';

export interface CardProps extends StyledProps {
  wordDTO: WordDTO;
  className?: string;
  isGameMode: boolean;
  isGameReady: boolean;
  isGamePlay: boolean;
  isSolved: boolean;
  matchWord: (word: WordDTO) => boolean;
}

const HAPPY = ['happy-cute', 'happy', 'in-love', 'cute', 'happy-smile'];
const SAD = ['very-sad', 'confused', 'arrogant', 'sad', 'bored'];
const CARD_MARKS_LIMIT = -6;

export const Card = (props: CardProps): JSX.Element => {
  const { className, wordDTO, isGameMode, isSolved, matchWord } = props;
  const { word, translation, image, audio } = wordDTO;
  const ref = useRef<HTMLButtonElement>(null);
  const [isFlipped, setFlip] = useState(false);
  const [marks, setMark] = useState<string[]>([]);
  const cardClassName = getCardClassName(isFlipped, props);

  const handlePlay = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (isGameMode) {
      if (isSolved) return;
      const emo = randomItem(matchWord(wordDTO) ? HAPPY : SAD);
      setMark([...marks.slice(CARD_MARKS_LIMIT), emo]);
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
      <MarksWrapper>
        <Marks marks={marks} show={isGameMode} />
      </MarksWrapper>
    </CardContainer>
  );
};
