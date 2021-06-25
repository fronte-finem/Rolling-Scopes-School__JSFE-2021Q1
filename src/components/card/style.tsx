import styled from 'styled-components';

export const CardContainer = styled.div`
  --aspect-ratio: 1 / 1;
  --flip: rotateY(0deg);
  aspect-ratio: var(--aspect-ratio);
  /* margin: 10px; */
  position: relative;
  user-select: none;

  &:hover {
    --flip: rotateY(180deg);
  }

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
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  border-radius: 20px;
  box-shadow: 0 0 3px 0 #0008;
  transform: var(--flip);
  transition: 500ms;
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
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
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
