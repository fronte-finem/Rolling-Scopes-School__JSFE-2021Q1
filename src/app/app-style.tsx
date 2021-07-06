import styled, { keyframes } from 'styled-components';

const hueRotate = keyframes`
  0% {
    filter: hue-rotate(0);
  }
  100% {
    filter: hue-rotate(360deg);
  }
`;

export const AppBackgroundWrapper = styled.div`
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: repeating-linear-gradient(90deg, #fff 0 10px, #eee 10px 30px, #fff 30px 40px);
  background-size: 40px 40px;
  background-position: center;
`;

export const AppBackground = styled.div`
  --c1: hsla(0, 100%, 50%, 0.8);
  --c2: hsla(120, 100%, 50%, 0.8);
  --c3: hsla(240, 100%, 50%, 0.8);

  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(217deg, var(--c1), #fff0 70.71%),
    linear-gradient(127deg, var(--c2), #fff0 70.71%),
    linear-gradient(336deg, var(--c3), #fff0 70.71%);
  animation: ${hueRotate} 30s linear infinite;
`;

export const StyledApp = styled.div`
  position: relative;
  min-height: 100vh;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  overflow: hidden;
`;

export const Main = styled.main``;
