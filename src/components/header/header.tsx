import React from 'react';

import { ModeSwitch } from 'components/header/mode-switch';
import { useGameContext } from 'services/game/game-context';
import { isGameStarted } from 'services/game/game-state';
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

export const Header: React.FC<Props> = ({
  children,
  className,
  isAdmin = false,
  showBtnStartRepeat = false,
  onStartRepeat = () => {},
}) => {
  const { gameState } = useGameContext();

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
              <BtnStartRepeat onClick={onStartRepeat} isStart={!isGameStarted(gameState)} />
            </BtnStartRepeatWrapper>
            <ModeSwitchWrapper>
              <ModeSwitch />
            </ModeSwitchWrapper>
          </>
        )}
      </Wrapper>
    </StyledHeader>
  );
};
