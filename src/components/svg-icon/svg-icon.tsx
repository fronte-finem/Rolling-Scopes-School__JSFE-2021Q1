import React from 'react';

import { StyledProps } from 'types/styled';

import { StyledSvg } from './svg-icon-style';

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
