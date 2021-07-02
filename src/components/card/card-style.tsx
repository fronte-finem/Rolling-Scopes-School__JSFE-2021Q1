import styled from 'styled-components';

import { BtnFlip } from './btn-flip';

interface CardStates {
  isGameMode: boolean;
  isGameReady: boolean;
  isGamePlay: boolean;
  isSolved: boolean;
}

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

export const MarkContainer = styled.ul<{ isGameMode: boolean }>`
  position: absolute;
  bottom: 10px;
  left: 5%;
  width: 90%;
  height: 50px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 10px;
  padding: 0 5px;

  background: #0004;
  border-radius: 25px;
  opacity: ${({ isGameMode }) => (isGameMode ? '1' : '0')};
  pointer-events: none;
`;

export const MarkItem = styled.li`
  --size: 40px;
  flex: 0 0 var(--size);
  width: var(--size);
  height: var(--size);
`;

export const Emo = styled.svg`
  display: block;
  width: 100%;
  height: 100%;
`;

export const getCardClassName = (
  isFlipped: boolean,
  { isGameMode, isGameReady, isGamePlay, isSolved }: CardStates
): string => {
  let className = isGameMode ? 'game' : 'train';
  if (!isGameMode) className += isFlipped ? ' flip' : ' flip-not';
  if (isGameReady) className += ' game-ready';
  if (isGamePlay && !isSolved) className += ' game-play';
  if (isGameMode && isSolved) className += ' solved';
  return className;
};

export const StyledCard = styled.div`
  --time: 500ms;
  --ease-out-back: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --flip: 0deg;
  --pointer-events: all;
  --word-pos: 0%;
  --word-h: 70px;
  --cursor: pointer;

  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  border-radius: 30px 0;
  box-shadow: 0 0 3px 0 #0008;
  transform: rotate3d(-1, 1, 0, var(--flip));
  cursor: var(--cursor);
  pointer-events: var(--pointer-events);
  transition: box-shadow 200ms, all 500ms, transform 1s;
  transition-timing-function: linear, linear, var(--ease-out-back);

  &.train {
    &:hover {
      box-shadow: 0 0 10px 5px #0004;
    }
  }
  &.flip {
    --flip: 180deg;
    --pointer-events: none;
    --cursor: default;
  }
  &.flip-not {
  }
  &.game {
    --word-pos: calc(-1 * var(--word-h));
  }
  &.game-ready {
    --cursor: default;
  }
  &.game-play {
    --cursor: pointer;
    transition: all 200ms;
    &:hover {
      box-shadow: 0 0 10px 5px #0004;
      transform: translateZ(10px);
    }
    &:active {
      box-shadow: 0 0 5px 5px #0004;
      transform: translateZ(0px);
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
