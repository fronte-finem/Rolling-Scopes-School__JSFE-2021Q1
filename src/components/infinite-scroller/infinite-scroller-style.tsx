import styled from 'styled-components';

export const Container = styled.div<{ height: string }>`
  height: ${({ height }) => height};
  overflow: auto;
  background: #0002;
`;

export const Loading = styled.div<{ isLoading: boolean }>`
  height: 100px;
  margin: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #0008;
  opacity: ${({ isLoading }) => (isLoading ? '1' : '0')};
`;
