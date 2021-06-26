import styled from 'styled-components';

export const StyledCategories = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-gap: 20px;
`;

const CARD_WIDTH = 300;

export const StyledCategoriesItem = styled.li`
  display: block;
  flex: 0 0 ${CARD_WIDTH}px;
  perspective: ${CARD_WIDTH * 3}px;
`;
