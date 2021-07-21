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

enum ControlName {
  TERM_WORDS = 'Words',
  BTN_EDIT = 'Edit',
  BTN_WORDS = 'Words',
}

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
        <Description term={ControlName.TERM_WORDS} value={words.length.toString()} />
      </DescriptionContainer>
    </CategoryContainer>
    <BtnBottomContainer>
      <BtnUpdate type="button" onClick={onUpdate}>
        {ControlName.BTN_EDIT}
      </BtnUpdate>
      <BtnAddWord type="submit" onClick={onAddWord}>
        {ControlName.BTN_WORDS}
      </BtnAddWord>
    </BtnBottomContainer>
  </Wrapper>
);
