import React from 'react';

import { IconName, SVG_SPRITE_ICON_SRC, SvgIcon } from 'components/svg-icon/svg-icon';
import { StyledProps } from 'types/styled';

import { StyledBtnFlip } from './btn-flip-style';

export interface BtnFlipProps extends StyledProps {
  onFlip: () => void;
}

export const BtnFlip = React.forwardRef<HTMLButtonElement, BtnFlipProps>(
  ({ className = '', onFlip }: BtnFlipProps, ref) => (
    <StyledBtnFlip className={className} onClick={onFlip} ref={ref}>
      <SvgIcon src={SVG_SPRITE_ICON_SRC} name={IconName.ROTATE} />
    </StyledBtnFlip>
  )
);
