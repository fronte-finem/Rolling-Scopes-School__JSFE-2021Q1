import styled, { css } from 'styled-components';

const COLORS_VARS = css`
  --c-1-a-hue: 240;
  --c-1-b-hue: 280;
  --c-1-c-hue: 320;

  --c-2-a-hue: 80;
  --c-2-b-hue: 40;
  --c-2-c-hue: 0;

  --c-bg-a-sl: 70%, 30%;
  --c-bg-b-sl: 80%, 70%;
  --c-bg-c-sl: 90%, 80%;

  --c-fg-a-sl: 70%, 90%;
  --c-fg-b-sl: 80%, 10%;
  --c-fg-c-sl: 90%, 20%;

  --bg-o: 1;

  --c-bg-train-all: hsla(var(--c-1-a-hue), var(--c-bg-a-sl), var(--bg-o));
  --c-bg-train-ask-a: hsla(var(--c-1-b-hue), var(--c-bg-b-sl), var(--bg-o));
  --c-bg-train-ask-b: hsla(var(--c-1-b-hue), var(--c-bg-c-sl), var(--bg-o));
  --c-bg-train-flip-a: hsla(var(--c-1-c-hue), var(--c-bg-b-sl), var(--bg-o));
  --c-bg-train-flip-b: hsla(var(--c-1-c-hue), var(--c-bg-c-sl), var(--bg-o));

  --c-fg-train-all: hsl(var(--c-1-a-hue), var(--c-fg-a-sl));
  --c-fg-train-ask-a: hsl(var(--c-1-b-hue), var(--c-fg-b-sl));
  --c-fg-train-ask-b: hsl(var(--c-1-b-hue), var(--c-fg-c-sl));
  --c-fg-train-flip-a: hsl(var(--c-1-c-hue), var(--c-fg-b-sl));
  --c-fg-train-flip-b: hsl(var(--c-1-c-hue), var(--c-fg-c-sl));

  --c-bg-game-all: hsla(var(--c-2-a-hue), var(--c-bg-a-sl), var(--bg-o));
  --c-bg-game-match-a: hsla(var(--c-2-b-hue), var(--c-bg-b-sl), var(--bg-o));
  --c-bg-game-match-b: hsla(var(--c-2-b-hue), var(--c-bg-c-sl), var(--bg-o));
  --c-bg-game-error-a: hsla(var(--c-2-c-hue), var(--c-bg-b-sl), var(--bg-o));
  --c-bg-game-error-b: hsla(var(--c-2-c-hue), var(--c-bg-c-sl), var(--bg-o));

  --c-fg-game-all: hsl(var(--c-2-a-hue), var(--c-fg-a-sl));
  --c-fg-game-match-a: hsl(var(--c-2-b-hue), var(--c-fg-b-sl));
  --c-fg-game-match-b: hsl(var(--c-2-b-hue), var(--c-fg-c-sl));
  --c-fg-game-error-a: hsl(var(--c-2-c-hue), var(--c-fg-b-sl));
  --c-fg-game-error-b: hsl(var(--c-2-c-hue), var(--c-fg-c-sl));
`;

export const Cell = styled.td`
  ${COLORS_VARS};

  &.train {
    background: var(--c-bg-train-all);
    color: var(--c-fg-train-all);
  }
  &.train-ask-a {
    background: var(--c-bg-train-ask-a);
    color: var(--c-fg-train-ask-a);
  }
  &.train-ask-b {
    background: var(--c-bg-train-ask-b);
    color: var(--c-fg-train-ask-b);
  }
  &.train-flip-a {
    background: var(--c-bg-train-flip-a);
    color: var(--c-fg-train-flip-a);
  }
  &.train-flip-b {
    background: var(--c-bg-train-flip-b);
    color: var(--c-fg-train-flip-b);
  }
  &.game {
    background: var(--c-bg-game-all);
    color: var(--c-fg-game-all);
  }
  &.game-match-a {
    background: var(--c-bg-game-match-a);
    color: var(--c-fg-game-match-a);
  }
  &.game-match-b {
    background: var(--c-bg-game-match-b);
    color: var(--c-fg-game-match-b);
  }
  &.game-error-a {
    background: var(--c-bg-game-error-a);
    color: var(--c-fg-game-error-a);
  }
  &.game-error-b {
    background: var(--c-bg-game-error-b);
    color: var(--c-fg-game-error-b);
  }
`;

export const StyledHeadCell = styled(Cell)`
  padding: 10px;
  font-size: 16px;
  font-weight: lighter;
  letter-spacing: 2px;
  text-align: center;
  text-transform: uppercase;

  &.num {
    background: #000;
    color: #fff;
  }
  &.category {
    background: #222;
    color: #999;
  }
  &.word {
    background: #444;
    color: #bbb;
  }
  &.translation {
    background: #666;
    color: #ddd;
  }
`;

export const BodyCell = styled(Cell)`
  padding: 3px 6px;

  &.num {
    background: #0008;
    color: #fff;
    text-align: center;
    font-family: monospace;
  }
  &.category {
    background: #0006;
    color: #111;
  }
  &.word {
    background: #0004;
    color: #222;
  }
  &.translation {
    background: #0002;
    color: #333;
  }
  &.stats {
    --bg-o: 0.75;
    width: 50px;
    font-family: monospace;
  }
  &.all {
    width: 75px;
    color: #fff;
    text-align: center;
  }
`;

export const StyledOrderCell = styled(StyledHeadCell)`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  user-select: none;

  &:hover {
    &::before,
    &::after {
      height: 82%;
      opacity: 1;
    }
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    height: 80%;
    aspect-ratio: 1 / 1;
    border-radius: 0 10px 0 10px;
    background-image: linear-gradient(-45deg, #fffa 30%, #fff0 60%);
    opacity: 0.5;
    transition: all 200ms;
  }
  &::before {
    bottom: -75%;
    transform: translateX(-50%) rotate(-135deg);
  }
  &::after {
    top: -75%;
    transform: translateX(-50%) rotate(45deg);
  }

  &.asc {
    &::before {
      bottom: -50%;
    }
    &::after {
      top: -100%;
    }
  }
  &.desc {
    &::before {
      bottom: -100%;
    }
    &::after {
      top: -50%;
    }
  }
`;
