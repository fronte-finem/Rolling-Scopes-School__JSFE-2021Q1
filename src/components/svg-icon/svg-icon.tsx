import React from 'react';

import { StyledProps } from 'types/styled';

import { StyledSvg } from './svg-icon-style';

export const SVG_SPRITE_ICON_SRC = './svg/sprite.svg';
export const SVG_SPRITE_EMOJI_SRC = './svg/emoji.svg';

export enum IconName {
  START = 'icon-start',
  REPEAT = 'icon-repeat',
  ROTATE = 'icon-rotate',
  CLOSE = 'icon-close',
  PLUS = 'icon-plus',
  ARROW_DOWN = 'icon-arrow-down',
  LOADING = 'icon-loading',
  GITHUB = 'icon-github',
  RS_SCHOOL = 'icon-rs-school-js',
}

export const EMOJI_POSITIVE = ['happy-cute', 'happy', 'in-love', 'cute', 'happy-smile'];
export const EMOJI_NEGATIVE = ['very-sad', 'confused', 'arrogant', 'sad', 'bored'];

interface Props extends StyledProps {
  src: string;
  name: string;
  fill?: string;
}

export const SvgIcon: React.FC<Props> = ({ src, name, fill, className }) => {
  return (
    <StyledSvg className={className} fill={fill}>
      <use href={`${src}#${name}`} />
    </StyledSvg>
  );
};
