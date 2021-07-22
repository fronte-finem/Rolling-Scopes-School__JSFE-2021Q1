import React from 'react';

import { Spinner } from 'components/spinner/spinner';
import {
  SpinnerAnimationStyle,
  SpinnerContainer,
  SpinnerMessage,
  SpinnerWrapper,
} from 'components/spinner/spinner-style';
import { IconName, SVG_SPRITE_ICON_SRC } from 'components/svg-icon/svg-icon';

const LOADING_MSG = 'Heroku instance loading...';

export const HerokuLoading: React.FC = () => {
  return (
    <SpinnerContainer>
      <SpinnerWrapper>
        <SpinnerMessage>{LOADING_MSG}</SpinnerMessage>
        <Spinner
          svgSpriteSrc={SVG_SPRITE_ICON_SRC}
          svgIcons={Array(3).fill(IconName.LOADING)}
          svgFill="#0004"
          animationStyle={SpinnerAnimationStyle.SPINNER}
        />
      </SpinnerWrapper>
    </SpinnerContainer>
  );
};
