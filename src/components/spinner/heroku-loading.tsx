import React from 'react';

import { Spinner } from 'components/spinner/spinner';
import {
  SpinnerAnimationStyle,
  SpinnerContainer,
  SpinnerMessage,
  SpinnerWrapper,
} from 'components/spinner/spinner-style';
import { SVG_SPRITE_ICON_SRC } from 'components/svg-icon/svg-icon';

export const ICONS_LOADING = Array(3).fill('icon-loading');

export const HerokuLoading: React.FC = () => {
  return (
    <SpinnerContainer>
      <SpinnerWrapper>
        <SpinnerMessage>Heroku instance loading...</SpinnerMessage>
        <Spinner
          svgSpriteSrc={SVG_SPRITE_ICON_SRC}
          svgIcons={ICONS_LOADING}
          svgFill="#0004"
          animationStyle={SpinnerAnimationStyle.SPINNER}
        />
      </SpinnerWrapper>
    </SpinnerContainer>
  );
};
