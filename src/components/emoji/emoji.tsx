import React from 'react';

import { StyledProps } from 'types/styled';

import { EmojiSvg } from './emoji-style';

export const EMOJI_POSITIVE = ['happy-cute', 'happy', 'in-love', 'cute', 'happy-smile'];
export const EMOJI_NEGATIVE = ['very-sad', 'confused', 'arrogant', 'sad', 'bored'];

const SVG_SRC = './svg/emoji.svg';

interface Props extends StyledProps {
  name: string;
}

export const Emoji: React.FC<Props> = ({ name, className }) => {
  return (
    <EmojiSvg className={className}>
      <use href={`${SVG_SRC}#${name}`} />
    </EmojiSvg>
  );
};
