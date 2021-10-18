import styled from 'styled-components';

export const StyledGameEndPage = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  overflow: hidden;
`;

export const FailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FailMessage = styled.h2`
  padding: 20px 40px;
  text-align: center;
  font-size: 40px;
`;
