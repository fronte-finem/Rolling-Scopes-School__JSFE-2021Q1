import styled from 'styled-components';

interface StyledCardSideProps {
  readonly back?: boolean;
}

export const CardContainer = styled.div`
  --flip: 0deg;
  perspective: 200vw;

  &:hover {
    --flip: 180deg;
  }
`;

export const StyledCard = styled.div`
  --aspect-ratio: 3 / 4;
  position: relative;
  border-radius: 10px;
  aspect-ratio: var(--aspect-ratio);
  transform-style: preserve-3d;
  transform: rotateY(var(--flip));
  transition: 500ms;

  @supports not (aspect-ratio: var(--aspect-ratio)) {
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

export const StyledCardSide = styled.div<StyledCardSideProps>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
  backface-visibility: hidden;
  transform: ${(props) => props.back && 'rotateY(180deg)'};
`;

export const CardImage = styled.img`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
