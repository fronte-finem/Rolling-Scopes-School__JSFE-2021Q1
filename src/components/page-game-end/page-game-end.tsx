import React from 'react';

import { EMOJI_NEGATIVE, EMOJI_POSITIVE } from 'components/emoji/emoji';
import { useGameContext } from 'services/game/game-context';
import { StyledProps } from 'types/styled';

import { EmojiList } from './emoji-list';
import { FailMessage, FailWrapper, StyledGameEndPage } from './game-end-page-style';

export const GameEndPage: React.FC<StyledProps> = ({ className, children }) => {
  return <StyledGameEndPage className={className}>{children}</StyledGameEndPage>;
};

export const WinPage: React.FC<StyledProps> = ({ className }) => {
  return (
    <GameEndPage className={className}>
      <EmojiList emojiNames={EMOJI_POSITIVE} />
    </GameEndPage>
  );
};

export const FailPage: React.FC<StyledProps> = ({ className }) => {
  const { gameState } = useGameContext();
  return (
    <GameEndPage className={className}>
      <FailWrapper>
        <FailMessage>{gameState.mistakes} mistakes</FailMessage>
        <EmojiList emojiNames={EMOJI_NEGATIVE} />
      </FailWrapper>
    </GameEndPage>
  );
};
