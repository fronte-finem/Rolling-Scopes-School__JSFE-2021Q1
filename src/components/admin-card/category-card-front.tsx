import React from 'react';

import {
  BtnAddWord,
  BtnBottomContainer,
  BtnCloseContainer,
  BtnUpdate,
  CategoryContainer,
  CategoryName,
  DescriptionContainer,
  Wrapper,
} from 'components/admin-card/card-style';
import { Description } from 'components/admin-card/description';
import { BtnClose } from 'components/button/button';
import { CategoryCardData } from 'services/rest-api/category-api';

interface Props {
  data: CategoryCardData;
  onDelete: () => Promise<void>;
  onUpdate: () => void;
  onAddWord: () => void;
}

export const CategoryCardFront: React.FC<Props> = ({
  data: { category, words },
  onAddWord,
  onDelete,
  onUpdate,
}) => (
  <Wrapper isLoading={false}>
    <BtnCloseContainer>
      <BtnClose onClick={onDelete} />
    </BtnCloseContainer>
    <CategoryContainer>
      <CategoryName>{category.name}</CategoryName>
      <DescriptionContainer>
        <Description term="Words" value={words.toString()} />
      </DescriptionContainer>
    </CategoryContainer>
    <BtnBottomContainer>
      <BtnUpdate type="button" onClick={onUpdate}>
        Edit
      </BtnUpdate>
      <BtnAddWord type="submit" onClick={onAddWord}>
        Edit words
      </BtnAddWord>
    </BtnBottomContainer>
  </Wrapper>
);
