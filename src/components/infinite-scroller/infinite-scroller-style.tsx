import styled, { keyframes } from 'styled-components';

import { scrollbar } from 'components/scrollbar/scrollbar';

export const Container = styled.div<{ height: string }>`
  position: relative;
  height: ${({ height }) => height};
  overflow: auto;
  background: #0004;
  margin: 15px 0;
  box-shadow: inset 0 0 10px 5px #0004;
  ${scrollbar}
`;

export const WrapperLayer = styled.div`
  position: sticky;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
`;

export const ShadowLayer = styled.div<{ height: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ height }) => height};
  pointer-events: none;
  background: linear-gradient(0deg, #000a, #fff0 5% 95%, #000a);
`;

export const Loading = styled.div<{ isLoading: boolean }>`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(0deg, #0008, #fff0);
  opacity: ${({ isLoading }) => (isLoading ? '1' : '0')};
  color: #fff;
`;

const pulse = keyframes`
  0% { transform: translateY(0)}
  30% { transform: translateY(-5px)}
  70% { transform: translateY(5px)}
  100% { transform: translateY(0)}
`;

export const HaveMore = styled.div<{ isLeft?: boolean; isRight?: boolean }>`
  position: absolute;
  bottom: 10px;
  left: ${({ isLeft, isRight }) => (!isLeft && !isRight ? 'calc(50% - 25px)' : isLeft && '10px')};
  right: ${({ isRight }) => isRight && '10px'};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  fill: #fff8;
  animation: 1s ${pulse} ease-out infinite;
`;
