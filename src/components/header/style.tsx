import { BtnMenu } from 'components/btn-menu/btn-menu';
import styled from 'styled-components';

export const StyledHeader = styled.header`
  height: 100px;
`;

export const Wrapper = styled.div`
  --ofsset: 100px;
  position: relative;
  max-width: 1440px;
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

export const StyledBtnMenu = styled(BtnMenu)`
  position: absolute;
  left: var(--ofsset);
  top: 50%;
  transform: translateY(-50%);
`;

export const StyledHeading = styled.h1`
  flex: 1;
  text-align: center;

  @media (max-width: 800px) {
    display: none;
  }
`;

export const StyledGameModeSwitch = styled.button`
  width: 100px;
  height: 100px;
`;
