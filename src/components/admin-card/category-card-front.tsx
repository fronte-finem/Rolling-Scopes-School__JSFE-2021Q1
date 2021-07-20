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
import { CategoryDocument, WordDocument } from 'services/rest-api/config';

interface Props {
  category: CategoryDocument;
  onDelete: () => void;
  onUpdate: () => void;
  onAddWord: () => void;
  words: WordDocument[];
}

export const CategoryCardFront: React.FC<Props> = ({
  category,
  onAddWord,
  onDelete,
  onUpdate,
  words,
}) => (
  <Wrapper isLoading={false}>
    <BtnCloseContainer>
      <BtnClose onClick={onDelete} />
    </BtnCloseContainer>
    <CategoryContainer>
      <CategoryName>{category.name}</CategoryName>
      <DescriptionContainer>
        <Description term="Words" value={words.length.toString()} />
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
