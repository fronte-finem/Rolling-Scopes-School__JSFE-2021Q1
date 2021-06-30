import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledCategoryLink = styled(Link).attrs({ draggable: false })`
  --aspect-ratio: 1 / 1;
  --path: inset(0% 0% 0% 0% round 50%);
  --name-bg: #fff0;
  --font-bg: #0004;
  --name-sz: 70px;

  &:hover {
    --path: inset(0% 0% 0% 0% round 25%);
    --name-bg: #fff2;
    --font-bg: #0008;
    --name-sz: 100px;
  }

  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 0 2px 0 #0004;
  cursor: pointer;
  user-select: none;
  aspect-ratio: var(--aspect-ratio);
  clip-path: var(--path);
  transition: 300ms;

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

export const CategoryImage = styled.img.attrs({ draggable: false })`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: var(--mirror);
`;

export const NameWrapper = styled.div`
  --h: 70px;
  position: absolute;
  top: calc(50% - var(--name-sz) / 2);
  width: 100%;
  height: var(--name-sz);
  background-color: var(--font-bg);
  transition: 300ms;
`;

export const CategoryName = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--name-bg);
  background-image: linear-gradient(90deg, #fff8, #fff, #fff8);
  color: #000;
  mix-blend-mode: screen;
  backdrop-filter: blur(2px);
  font-size: calc(var(--h) / 2);
  font-weight: bold;
  transition: 300ms;
`;
