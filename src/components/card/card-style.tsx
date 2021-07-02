import styled from 'styled-components';

import { BtnFlip } from './btn-flip';

interface CardStates {
  isFlipped: boolean;
  isGameMode: boolean;
  isGameReady: boolean;
  isGamePlay: boolean;
  isSolved: boolean;
}

export const getCardClassName = ({
  isFlipped,
  isGameMode,
  isGameReady,
  isGamePlay,
  isSolved,
}: CardStates): string => {
  let className = isGameMode ? 'game' : 'train';
  if (!isGamePlay && isFlipped) className += ' flip';
  if (isGameReady) className += ' game-ready';
  if (isGamePlay && !isSolved) className += ' game-play';
  if (isGameMode && isSolved) className += ' solved';
  return className;
};

export const CardContainer = styled.div`
  --aspect-ratio: 1 / 1;
  aspect-ratio: var(--aspect-ratio);
  position: relative;
  user-select: none;

  @supports not (aspect-ratio: 1 / 1) {
    &::before {
      content: '';
      float: left;
      padding-top: calc(100% / (var(--aspect-ratio)));
    }
    &::after {
      content: '';
      display: block;
      clear: both;
    }
  }
`;

export const StyledCard = styled.div`
  --flip: rotateY(0deg);
  --pointer-events: all;
  --word-pos: 0%;
  --word-h: 70px;
  --cursor: pointer;

  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  border-radius: 20px;
  box-shadow: 0 0 3px 0 #0008;
  transform: var(--flip);
  cursor: var(--cursor);
  pointer-events: var(--pointer-events);
  transition: box-shadow 200ms, all 500ms;

  &.train {
    &:hover {
      box-shadow: 0 0 10px 5px #0004;
    }
  }
  &.flip {
    --flip: rotate3d(-1, 1, 0, 180deg);
    --pointer-events: none;
    --cursor: default;
  }
  &.game {
    --word-pos: calc(-1 * var(--word-h));
  }
  &.game-ready {
    --cursor: default;
  }
  &.game-play {
    --cursor: pointer;
    &:hover {
      box-shadow: 0 0 10px 5px #0004;
      transform: translateZ(20px);
    }
  }
  &.solved {
    --cursor: default;
    opacity: 0.2;
  }
`;

export const StyledBtnFlip = styled(BtnFlip)`
  position: absolute;
  right: 5%;
`;
