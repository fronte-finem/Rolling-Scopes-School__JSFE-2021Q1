import React from 'react';

import { AddContainer, Wrapper } from 'components/admin-card/card-style';
import { BtnAdd } from 'components/button/button';

interface Props {
  title: string;
  onAdd: () => void;
}

export const CardAddFront: React.FC<Props> = ({ title, onAdd }) => (
  <Wrapper isLoading={false}>
    <AddContainer>
      <h2>{title}</h2>
      <BtnAdd onClick={onAdd} />
    </AddContainer>
  </Wrapper>
);
