import React from 'react';

import { StyledProps } from 'types/styled';

import { StyledBtnFlip, StyledSvg } from './btn-flip-style';

const FLIP_ICON = './svg/sprite.svg#icon-rotate';

export interface BtnFlipProps extends StyledProps {
  onFlip: () => void;
}

export const BtnFlip = React.forwardRef<HTMLButtonElement, BtnFlipProps>(
  ({ className = '', onFlip }: BtnFlipProps, ref) => (
    <StyledBtnFlip className={className} onClick={onFlip} ref={ref}>
      <StyledSvg>
        <use href={FLIP_ICON} />
      </StyledSvg>
    </StyledBtnFlip>
  )
);
