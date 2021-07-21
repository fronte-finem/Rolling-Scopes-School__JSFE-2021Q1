import React from 'react';

import {
  BtnBottomContainer,
  BtnCloseContainer,
  BtnUpdate,
  DescriptionContainer,
  Image,
  ImageContainer,
  Wrapper,
} from 'components/admin-card/card-style';
import { CardAudio, Description } from 'components/admin-card/description';
import { BtnClose } from 'components/button/button';
import { WordDocument } from 'services/rest-api/config';
import { getAudioUrl, getImageUrl } from 'services/rest-api/media-api';

enum ControlName {
  TERM_WORD = 'Word',
  TERM_TRANSLATION = 'Translation',
  BTN_EDIT = 'Edit',
}

interface Props {
  initialWord: WordDocument;
  onEdit: () => void;
  onDelete: () => void;
}

export const WordCardFront: React.FC<Props> = ({ initialWord, onEdit, onDelete }) => {
  return (
    <Wrapper isLoading={false}>
      <ImageContainer>
        <Image src={getImageUrl(initialWord.image)} alt={initialWord.word} />
      </ImageContainer>
      <BtnCloseContainer>
        <BtnClose onClick={onDelete} />
      </BtnCloseContainer>
      <DescriptionContainer>
        <Description term={ControlName.TERM_WORD} value={initialWord.word} />
        <Description term={ControlName.TERM_TRANSLATION} value={initialWord.translation} />
        <CardAudio url={getAudioUrl(initialWord.audio)} />
      </DescriptionContainer>
      <BtnBottomContainer>
        <BtnUpdate type="button" onClick={onEdit}>
          {ControlName.BTN_EDIT}
        </BtnUpdate>
      </BtnBottomContainer>
    </Wrapper>
  );
};
