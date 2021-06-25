import styled from 'styled-components';

export const StyledHeader = styled.header`
  height: 100px;
`;

export const Wrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 800px) {
    padding: 0 50px;
  }
  @media (max-width: 400px) {
    padding: 0 10px;
  }
`;

export const StyledHeading = styled.h1`
  flex: 1;
  text-align: center;

  @media (max-width: 800px) {
    display: none;
  }
`;

export const StyledBtnToggleBar = styled.button`
  width: 100px;
  height: 100px;
`;

export const StyledGameModeSwitch = styled.button`
  width: 100px;
  height: 100px;
`;
