import React from 'react';
import { observer } from 'mobx-react-lite';

import { Main } from 'app/app-style';
import { Header } from 'components/header/header';
import { Sidebar } from 'components/sidebar/sidebar';
import { Spinner } from 'components/spinner/spinner';
import {
  SpinnerAnimationStyle,
  SpinnerContainer,
  SpinnerMessage,
  SpinnerWrapper,
} from 'components/spinner/spinner-style';
import { useGameContext } from 'services/game/context';

export const EMOJI_SVG_SPRITE = './svg/emoji.svg';
export const EMOJI_POSITIVE = ['happy-cute', 'happy', 'in-love', 'cute', 'happy-smile'];
export const EMOJI_NEGATIVE = ['very-sad', 'confused', 'arrogant', 'sad', 'bored'];

export const WinPage: React.FC = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <Main>
        <SpinnerContainer>
          <Spinner
            svgSpriteSrc={EMOJI_SVG_SPRITE}
            svgIcons={EMOJI_POSITIVE}
            animationStyle={SpinnerAnimationStyle.EMOJI}
          />
        </SpinnerContainer>
      </Main>
    </>
  );
};

export const FailPage: React.FC = observer(() => {
  const game = useGameContext();
  return (
    <>
      <Sidebar />
      <Header />
      <Main>
        <SpinnerContainer>
          <SpinnerWrapper>
            <SpinnerMessage>{game.mistakes} mistakes</SpinnerMessage>
            <Spinner
              svgSpriteSrc={EMOJI_SVG_SPRITE}
              svgIcons={EMOJI_NEGATIVE}
              animationStyle={SpinnerAnimationStyle.EMOJI}
            />
          </SpinnerWrapper>
        </SpinnerContainer>
      </Main>
    </>
  );
});
