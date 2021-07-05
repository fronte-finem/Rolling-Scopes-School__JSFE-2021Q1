import styled from 'styled-components';

export const StyledApp = styled.div`
  --c1: hsl(230, 35%, 55%);
  --c2: hsl(230, 45%, 45%);
  position: relative;
  min-height: 100vh;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  background-image: repeating-linear-gradient(
    90deg,
    var(--c2) 0px 10px,
    var(--c1) 10px 30px,
    var(--c2) 30px 40px
  );
  background-size: 40px 40px;
  background-position: center;
`;

export const Main = styled.main``;
