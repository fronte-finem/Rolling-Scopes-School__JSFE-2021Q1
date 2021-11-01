import styled from 'styled-components';

const CARD_WIDTH = 300;

export const StyledCardsField = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 50px 20px;
`;

export const StyledCardsFieldItem = styled.li`
  flex: 0 0 ${CARD_WIDTH}px;
  perspective: ${CARD_WIDTH * 3}px;
`;
