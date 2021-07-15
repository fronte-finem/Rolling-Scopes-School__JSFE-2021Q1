import React from 'react';

import { BtnSvg, RoundBtn } from 'components/button/button-style';

interface Props {
  onClick: () => void;
}

const getRoundBtn =
  (svg: string, primary?: boolean): React.FC<Props> =>
  ({ onClick }) =>
    (
      <RoundBtn onClick={onClick} primary={primary}>
        <BtnSvg>
          <use href={svg} />
        </BtnSvg>
      </RoundBtn>
    );

export const BtnClose = getRoundBtn('./svg/sprite.svg#icon-close');
export const BtnAdd = getRoundBtn('./svg/sprite.svg#icon-plus', true);
