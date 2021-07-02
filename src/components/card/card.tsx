import React, { useRef, useState } from 'react';

import { playAudio } from 'services/audio';
import { WordDTO } from 'services/data/dto-word';
import { StyledProps } from 'types/styled';
import { randomItem } from 'utils/random';

import {
  CardContainer,
  Emo,
  getCardClassName,
  MarkContainer,
  MarkItem,
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

const Mark: React.FC<{ yes: boolean }> = ({ yes }) => {
  const iconSrc = `./svg/emoji.svg#${randomItem(yes ? HAPPY : SAD)}`;
  return (
    <MarkItem>
      <Emo>
        <use href={iconSrc} />
      </Emo>
    </MarkItem>
  );
};

export const Card = (props: CardProps): JSX.Element => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isFlipped, setFlip] = useState(false);
  const { className, wordDTO, isGameMode, isSolved, matchWord } = props;
  const { word, translation, image, audio } = wordDTO;
  const cardClassName = getCardClassName(isFlipped, props);
  const [marks, setMark] = useState<boolean[]>([]);

  const handlePlay = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (isGameMode) {
      if (isSolved) return;
      const yes = matchWord(wordDTO);
      const size = marks.length;
      setMark([...marks.slice(size - 11, size), yes]);
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
      <MarkContainer isGameMode={isGameMode}>
        {marks.map((yes, index) => {
          const key = `${index} ${String(yes)}`;
          return <Mark key={key} yes={yes} />;
        })}
      </MarkContainer>
    </CardContainer>
  );
};
