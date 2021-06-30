import styled from 'styled-components';

import { BtnFlip } from './btn-flip';

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
  --solved: 0;

  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  border-radius: 20px;
  box-shadow: 0 0 3px 0 #0008;
  transform: var(--flip);
  cursor: var(--cursor);
  pointer-events: var(--pointer-events);
  transition: 500ms;

  &.flip {
    --flip: rotateY(180deg);
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
  }
  &.waiting {
    --cursor: wait;
  }
  &.solved {
    --cursor: default;
    --solved: 1;
  }
`;

export const CardSolvedLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: #ff04;
  backdrop-filter: blur(5px);
  opacity: var(--solved);
  pointer-events: none;
`;

export const StyledBtnFlip = styled(BtnFlip)`
  position: absolute;
  right: 5%;
`;
