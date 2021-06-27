import styled from 'styled-components';

import { Card } from 'components/card/card';

export const StyledCardsField = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  overflow: hidden;
`;

const CARD_WIDTH = 300;

export const StyledCardsFieldItem = styled(Card)`
  flex: 0 0 ${CARD_WIDTH}px;
  perspective: ${CARD_WIDTH * 3}px;
`;
