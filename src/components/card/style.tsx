import styled from 'styled-components';

export const CardContainer = styled.div`
  --aspect-ratio: 1 / 1;
  aspect-ratio: var(--aspect-ratio);
  position: relative;
  user-select: none;

  @supports not (aspect-ratio: 1 / 1) {
    &::before {
      content: '';
      float: left;
      padding-top: calc(100% / (var(--aspect-ratio)));
    }
    &::after {
      content: '';
      display: block;
      clear: both;
    }
  }
`;

export const StyledCard = styled.div`
  --flip: rotateY(0deg);
  --pointer-events: all;

  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  border-radius: 20px;
  box-shadow: 0 0 3px 0 #0008;
  transform: var(--flip);
  transition: 500ms;
  cursor: pointer;
  pointer-events: var(--pointer-events);

  &.flip {
    --flip: rotateY(180deg);
    --pointer-events: none;
    cursor: default;
  }
`;

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
  transform: rotateY(180deg);
`;

export const CardImage = styled.img`
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
  bottom: 0;
  width: 100%;
  height: 70px;
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
`;

export const StyledBtnFlip = styled.button`
  display: block;
  position: absolute;
  right: 5%;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: transparent;
  box-shadow: 0 0 5px 2px #0004;
  pointer-events: var(--pointer-events);
  transition: all 300ms;

  &:hover {
    transform: rotate(180deg);
    box-shadow: 0 0 5px 4px #0004;
  }

  &:active {
    transform: rotate(360deg);
    box-shadow: 0 0 1px 2px #0004;
  }
`;
