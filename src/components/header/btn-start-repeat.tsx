import React from 'react';

import { Btn, Content, StyledSvg, Word } from 'components/header/btn-start-repeat-style';

interface Props {
  onClick: () => void;
  isStart?: boolean;
}

const START = 'START';
const REPEAT = 'REPEAT';

const ICON_START = './svg/sprite.svg#icon-start';
const ICON_REPEAT = './svg/sprite.svg#icon-repeat';

export const BtnStartRepeat: React.FC<Props> = ({ onClick, isStart = false }) => {
  const word = isStart ? START : REPEAT;
  const icon = isStart ? ICON_START : ICON_REPEAT;
  return (
    <Btn onClick={onClick} isPrimary={isStart}>
      <Content>
        <Word>{word}</Word>
        <StyledSvg>
          <use href={icon} />
        </StyledSvg>
        <Word>{word}</Word>
      </Content>
    </Btn>
  );
};
