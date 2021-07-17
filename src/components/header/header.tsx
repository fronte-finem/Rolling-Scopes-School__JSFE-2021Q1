import React from 'react';
import { observer } from 'mobx-react-lite';

import { ModeSwitch } from 'components/header/mode-switch';
import { useGameContext } from 'services/game/context';
import { StyledProps } from 'types/styled';

import { BtnStartRepeat } from './btn-start-repeat';
import {
  BtnStartRepeatWrapper,
  ModeSwitchWrapper,
  StyledHeader,
  StyledHeading,
  StyledLink,
  Wrapper,
} from './header-style';

interface Props extends StyledProps {
  isAdmin?: boolean;
  showBtnStartRepeat?: boolean;
  onStartRepeat?: () => void;
}

export const Header: React.FC<Props> = observer(
  ({
    children,
    className,
    isAdmin = false,
    showBtnStartRepeat = false,
    onStartRepeat = () => {},
  }) => {
    const game = useGameContext();

    return (
      <StyledHeader className={className}>
        <Wrapper>
          {isAdmin ? (
            children
          ) : (
            <>
              <StyledHeading>
                <StyledLink to="/">English for kids</StyledLink>
              </StyledHeading>
              {children}
              <BtnStartRepeatWrapper isHidden={!showBtnStartRepeat}>
                <BtnStartRepeat onClick={onStartRepeat} isStart={!game.isStarted} />
              </BtnStartRepeatWrapper>
              <ModeSwitchWrapper>
                <ModeSwitch />
              </ModeSwitchWrapper>
            </>
          )}
        </Wrapper>
      </StyledHeader>
    );
  }
);
