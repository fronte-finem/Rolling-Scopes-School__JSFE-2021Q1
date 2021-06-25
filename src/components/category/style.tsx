import styled from 'styled-components';

export const CategoryCardContainer = styled.div`
  --aspect-ratio: 1 / 1;
  user-select: none;
`;

export const StyledCategoryCard = styled.div`
  --bump: translateZ(0);

  &:hover {
    --bump: translateZ(50px);
  }

  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 0 2px 0 #0004;
  aspect-ratio: var(--aspect-ratio);
  transform-style: preserve-3d;
  transform: var(--bump);
  transition: 500ms;
  cursor: pointer;
  clip-path: circle(50%);

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

export const CategoryImage = styled.img`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: var(--mirror);
`;

export const CategoryName = styled.div`
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
