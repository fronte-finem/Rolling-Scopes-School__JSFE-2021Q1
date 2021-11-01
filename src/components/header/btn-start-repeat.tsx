import React from 'react';

import {
  Btn,
  Content,
  SvgContainer,
  SvgWrapper,
  Title,
} from 'components/header/btn-start-repeat-style';
import { IconName, SVG_SPRITE_ICON_SRC, SvgIcon } from 'components/svg-icon/svg-icon';

interface Props {
  onClick: () => void;
  isStart?: boolean;
}

enum BtnTitle {
  START = 'START',
  REPEAT = 'REPEAT',
}

export const BtnStartRepeat: React.FC<Props> = ({ onClick, isStart = false }) => {
  const title = isStart ? BtnTitle.START : BtnTitle.REPEAT;
  const icon = isStart ? IconName.START : IconName.REPEAT;
  return (
    <Btn onClick={onClick} isPrimary={isStart}>
      <Content>
        <Title>{title}</Title>
        <SvgWrapper>
          <SvgContainer>
            <SvgIcon src={SVG_SPRITE_ICON_SRC} name={icon} />
          </SvgContainer>
        </SvgWrapper>
        <Title>{title}</Title>
      </Content>
    </Btn>
  );
};
