import styled from 'styled-components';

export const StyledApp = styled.div`
  position: relative;
  min-height: 100vh;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
`;

export const Main = styled.main`
  background: linear-gradient(#ff0, #0ff);
`;
