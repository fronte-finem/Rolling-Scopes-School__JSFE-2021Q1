import styled from 'styled-components';

export const StyledSvg = styled.svg<{ fill?: string }>`
  display: block;
  width: 100%;
  height: 100%;
  fill: ${({ fill }) => fill};
`;
