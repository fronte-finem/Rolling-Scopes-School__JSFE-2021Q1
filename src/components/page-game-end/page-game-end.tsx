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
import { EMOJI_NEGATIVE, EMOJI_POSITIVE, SVG_SPRITE_EMOJI_SRC } from 'components/svg-icon/svg-icon';
import { useGameContext } from 'services/game/context';

export const WinPage: React.FC = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <Main>
        <SpinnerContainer>
          <Spinner
            svgSpriteSrc={SVG_SPRITE_EMOJI_SRC}
            svgIcons={EMOJI_POSITIVE}
            animationStyle={SpinnerAnimationStyle.EMOJI}
          />
        </SpinnerContainer>
      </Main>
    </>
  );
};

const getMistakesMsg = (num: number) => `${num} mistakes`;

export const FailPage: React.FC = observer(() => {
  const game = useGameContext();
  return (
    <>
      <Sidebar />
      <Header />
      <Main>
        <SpinnerContainer>
          <SpinnerWrapper>
            <SpinnerMessage>{getMistakesMsg(game.mistakes)}</SpinnerMessage>
            <Spinner
              svgSpriteSrc={SVG_SPRITE_EMOJI_SRC}
              svgIcons={EMOJI_NEGATIVE}
              animationStyle={SpinnerAnimationStyle.EMOJI}
            />
          </SpinnerWrapper>
        </SpinnerContainer>
      </Main>
    </>
  );
});
