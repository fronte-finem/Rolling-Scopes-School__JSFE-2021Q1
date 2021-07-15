import styled from 'styled-components';

const CARD_WIDTH = 300;

export const StyledCategories = styled.ul`
  padding: 50px 20px;
  //overflow: hidden;
  height: 700px;
  overflow: auto;
`;

export const StyledCategoriesItem = styled.li`
  display: block;
  flex: 0 0 ${CARD_WIDTH}px;
  perspective: ${CARD_WIDTH * 3}px;
`;
