import React from 'react';

import { getAudioUrl, getImageUrl } from 'app/config';
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
import { WordDocument } from 'services/rest-api/word-api';

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
        <Description term="Word" value={initialWord.word} />
        <Description term="Translation" value={initialWord.translation} />
        <CardAudio url={getAudioUrl(initialWord.audio)} />
      </DescriptionContainer>
      <BtnBottomContainer>
        <BtnUpdate type="button" onClick={onEdit}>
          Edit
        </BtnUpdate>
      </BtnBottomContainer>
    </Wrapper>
  );
};
