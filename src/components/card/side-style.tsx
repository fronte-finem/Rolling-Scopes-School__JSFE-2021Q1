import styled from 'styled-components';

export const StyledCardSide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
  backface-visibility: hidden;
`;

export const StyledCardFrontSide = styled(StyledCardSide)``;

export const StyledCardBackSide = styled(StyledCardSide)`
  --mirror: scaleX(-1);
  transform: rotateY(180deg) rotateZ(-90deg);
`;

export const CardImage = styled.img.attrs({ draggable: false })`
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: var(--mirror);
`;

export const CardWord = styled.div`
  position: absolute;
  left: 0;
  bottom: var(--word-pos);
  width: 100%;
  height: var(--word-h);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0008;
  backdrop-filter: blur(2px);
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: bold;
  font-size: 25px;
  transition: 300ms;
`;
