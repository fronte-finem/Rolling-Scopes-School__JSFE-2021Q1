import styled from 'styled-components';

export const StyledFooter = styled.footer`
  height: 100px;
`;

export const Wrapper = styled.div`
  --ofsset: 100px;
  position: relative;
  max-width: 1440px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 var(--ofsset);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 800px) {
    --ofsset: 50px;
  }
  @media (max-width: 400px) {
    --ofsset: 20px;
  }
`;

export const StyledHeading = styled.h1`
  flex: 1;
  text-align: center;

  @media (max-width: 800px) {
    display: none;
  }
`;
