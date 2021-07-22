import React from 'react';

import { RoundBtn } from 'components/button/button-style';
import { SvgIcon } from 'components/svg-icon/svg-icon';

interface Props {
  onClick: () => void;
}

const SVG_SPRITE_SRC = './svg/sprite.svg';

enum IconName {
  CLOSE = 'icon-close',
  PLUS = 'icon-plus',
}

const getRoundBtn =
  (iconName: string, primary?: boolean): React.FC<Props> =>
  ({ onClick }) =>
    (
      <RoundBtn onClick={onClick} primary={primary}>
        <SvgIcon src={SVG_SPRITE_SRC} name={iconName} />
      </RoundBtn>
    );

export const BtnClose = getRoundBtn(IconName.CLOSE);
export const BtnAdd = getRoundBtn(IconName.PLUS, true);
