import styled, { keyframes } from 'styled-components';

import { CategoryLink } from './category-link';

const pulsate = keyframes`
  0% {
    transform: rotate3d(0,0,0,0deg);
    transform-origin: center;
  }
  25% {
    transform: rotate3d(0,1,0,10deg);
    transform-origin: left;
  }
  50% {
    transform-origin: center;
  }
  75% {
    transform: rotate3d(0,1,0,-10deg);
    transform-origin: right;
  }
  100% {
    transform: rotate3d(0,0,0,0deg);
    transform-origin: center;
  }
`;

export const CategoryBase = styled.div.attrs((props: { delay?: number }) => ({
  delay: props.delay || Math.random(),
}))`
  --delay: ${(props) => props.delay}s;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const StyledCategoryLink = styled(CategoryLink)`
  --aspect-ratio: 1 / 1;
  --path: inset(0% 0% 0% 0% round 50%);
  --name-bg: #fff0;
  --font-bg: #0004;
  --name-sz: 70px;
  --name-radius: 50%;
  --play-scale: 0;
  --play-bg: #0008;

  &:hover {
    --path: inset(0% 0% 0% 0% round 25%);
    --name-bg: #fff2;
    --font-bg: #0008;
    --name-sz: 100px;
    --name-radius: 50px;
    --play-bg: #000a;
  }

  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  user-select: none;
  aspect-ratio: var(--aspect-ratio);
  transition: 300ms;
  transform-style: preserve-3d;

  &.game {
    --play-scale: 1;
    animation: 2s ${pulsate} var(--delay) linear infinite;
  }

  &::after {
    content: 'play';
    position: absolute;
    display: block;
    bottom: 0;
    left: 50%;
    padding: 10px 20px;
    transform: translateX(-50%) translateZ(30px) scale(var(--play-scale));
    background: var(--play-bg);
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-radius: 100%;
    transition: 300ms;
  }
`;

export const CategoryImage = styled.img.attrs({ draggable: false })`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  clip-path: var(--path);
  transition: 300ms;
`;

export const NameWrapper = styled.div`
  --h: 70px;
  position: absolute;
  top: calc(50% - var(--name-sz) / 2);
  width: 100%;
  height: var(--name-sz);
  background-color: var(--font-bg);
  border-radius: var(--name-radius);
  overflow: hidden;
  border: 5px solid #0008;
  //clip-path: var(--path);
  //transform: translateZ(50px) scale(0.95);
  transition: 300ms;
`;

export const CategoryName = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  //background-color: #fff8;
  background-image: linear-gradient(90deg, #fff1, #fff, #fff1);
  color: #000;
  mix-blend-mode: screen;
  //backdrop-filter: blur(2px);
  font-size: calc(var(--h) / 2);
  font-weight: bold;
  transition: 300ms;
`;
