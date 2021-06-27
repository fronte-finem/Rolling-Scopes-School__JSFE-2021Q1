import React from 'react';
import styled from 'styled-components';

import { StyledProps } from 'types/styled';

import { StyledBtnFlip } from './style';

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
  fill: #fff;
`;

export interface BtnFlipProps extends StyledProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const BtnFlip = React.forwardRef<HTMLButtonElement, BtnFlipProps>(
  ({ className = '', onClick }: BtnFlipProps, ref) => (
    <StyledBtnFlip className={className} onClick={onClick} ref={ref}>
      <StyledSvg>
        <use href="./svg/sprite.svg#icon-rotate" />
      </StyledSvg>
    </StyledBtnFlip>
  )
);
