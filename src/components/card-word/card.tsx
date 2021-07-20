import React from 'react';
import { observer } from 'mobx-react-lite';

import { Marks } from 'components/card-word/marks';
import {
  EMOJI_NEGATIVE,
  EMOJI_POSITIVE,
  EMOJI_SVG_SPRITE,
} from 'components/page-game-end/page-game-end';
import { playAudio } from 'services/audio';
import { WordDocument } from 'services/rest-api/config';
import { getAudioUrl, getImageUrl } from 'services/rest-api/media-api';
import { useWordsStatsService } from 'services/word-stat/context';
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
  data: WordDocument;
  className?: string;
  isGameMode: boolean;
  isGameReady: boolean;
  isGamePlay: boolean;
  isSolved: boolean;
  matchWord: (word: WordDocument) => boolean;
}

const CARD_MARKS_LIMIT = -6;

export const Card: React.FC<CardProps> = observer((props) => {
  const { className, data, isGameMode, isGameReady, isGamePlay, isSolved, matchWord } = props;
  const { word, translation, image, audio } = data;
  const ref = React.useRef<HTMLButtonElement>(null);
  const [isFlipped, setFlip] = React.useState(false);
  const [marks, setMark] = React.useState<string[]>([]);
  const wordsStatsService = useWordsStatsService();
  const cardClassName = getCardClassName(isFlipped, props);

  const handlePlay = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (isGameReady || isSolved) return;
    if (isGamePlay) {
      const isMatch = matchWord(data);
      const emojiName = randomItem(isMatch ? EMOJI_POSITIVE : EMOJI_NEGATIVE);
      setMark([...marks.slice(CARD_MARKS_LIMIT), emojiName]);
      return;
    }
    if (ref.current?.contains(ev.target as Node)) return;
    playAudio(getAudioUrl(audio));
    wordsStatsService.listenInc(data._id);
  };

  const handleMouseLeave = () => setFlip(() => false);
  const handleFlip = () => {
    setFlip(() => true);
    wordsStatsService.translateInc(data._id);
  };

  return (
    <CardContainer className={className} onMouseLeave={handleMouseLeave}>
      <StyledCard className={cardClassName} onClick={handlePlay}>
        <CardFrontSide word={word} image={getImageUrl(image)}>
          <StyledBtnFlip onFlip={handleFlip} ref={ref} />
        </CardFrontSide>
        <CardBackSide word={translation} image={getImageUrl(image)} />
      </StyledCard>
      <MarksWrapper>
        <Marks src={EMOJI_SVG_SPRITE} marks={marks} show={isGameMode} />
      </MarksWrapper>
    </CardContainer>
  );
});
