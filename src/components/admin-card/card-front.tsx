import React from 'react';

import {
  BtnAddWord,
  BtnBottomContainer,
  BtnCloseContainer,
  BtnUpdate,
  CategoryContainer,
  CategoryName,
  DescriptionContainer,
  Image,
  ImageContainer,
  Wrapper,
} from 'components/admin-card/card-style';
import { CardAudio, Description } from 'components/admin-card/description';
import { BtnClose } from 'components/button/button';
import { CategoryDocument, WordDocument } from 'services/rest-api/config';
import { getAudioUrl, getImageUrl } from 'services/rest-api/media-api';

enum ControlName {
  BTN_EDIT = 'Edit',
  BTN_WORDS = 'Words',
  TERM_WORDS = 'Words',
  TERM_WORD = 'Word',
  TERM_TRANSLATION = 'Translation',
}

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  secondBtn?: JSX.Element;
}

export const CardFront: React.FC<Props> = ({ children, onEdit, onDelete, secondBtn }) => {
  return (
    <Wrapper isLoading={false}>
      <BtnCloseContainer>
        <BtnClose onClick={onDelete} />
      </BtnCloseContainer>
      {children}
      <BtnBottomContainer>
        <BtnUpdate type="button" onClick={onEdit}>
          {ControlName.BTN_EDIT}
        </BtnUpdate>
        {secondBtn}
      </BtnBottomContainer>
    </Wrapper>
  );
};

interface CardFrontCategoryProps {
  category: CategoryDocument;
  words: WordDocument[];
  onDelete: () => void;
  onUpdate: () => void;
  onAddWord: () => void;
}

export const CardFrontCategory: React.FC<CardFrontCategoryProps> = ({
  category,
  words,
  onUpdate,
  onDelete,
  onAddWord,
}) => {
  const btnAddWords = (
    <BtnAddWord type="submit" onClick={onAddWord}>
      {ControlName.BTN_WORDS}
    </BtnAddWord>
  );
  return (
    <CardFront onEdit={onUpdate} onDelete={onDelete} secondBtn={btnAddWords}>
      <CategoryContainer>
        <CategoryName>{category.name}</CategoryName>
        <DescriptionContainer>
          <Description term={ControlName.TERM_WORDS} value={words.length.toString()} />
        </DescriptionContainer>
      </CategoryContainer>
    </CardFront>
  );
};

interface CardFrontWordProps {
  initialWord: WordDocument;
  onEdit: () => void;
  onDelete: () => void;
}

export const CardFrontWord: React.FC<CardFrontWordProps> = ({ initialWord, onEdit, onDelete }) => {
  return (
    <CardFront onEdit={onEdit} onDelete={onDelete}>
      <ImageContainer>
        <Image src={getImageUrl(initialWord.image)} alt={initialWord.word} />
      </ImageContainer>
      <DescriptionContainer>
        <Description term={ControlName.TERM_WORD} value={initialWord.word} />
        <Description term={ControlName.TERM_TRANSLATION} value={initialWord.translation} />
        <CardAudio url={getAudioUrl(initialWord.audio)} />
      </DescriptionContainer>
    </CardFront>
  );
};
