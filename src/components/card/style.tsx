import styled from 'styled-components';

export const CardContainer = styled.div`
  --flip: rotateY(0deg);

  &:hover {
    --flip: rotateY(180deg);
  }
`;

export const StyledCard = styled.div`
  --aspect-ratio: 1 / 1;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 0 2px 0 #0004;
  aspect-ratio: var(--aspect-ratio);
  transform-style: preserve-3d;
  transform: var(--flip);
  transition: 500ms;

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

export const StyledCardSide = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
  backface-visibility: hidden;
`;

export const StyledCardBackSide = styled(StyledCardSide)`
  --mirror: scaleX(-1);
  transform: rotateY(180deg);
`;

export const CardImage = styled.img`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: var(--mirror);
`;

export const CardWord = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  background-color: #0008;
  color: #fff;
`;

export const BtnFlip = styled.button`
  display: block;
  position: absolute;
  right: 5%;
  width: 15%;
  height: 0;
  padding: 0 0 15%;
  border-radius: 50%;
  border: unset;
  box-shadow: 0 2px 5px 2px #0004;
`;
