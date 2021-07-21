import React from 'react';

import {
  AudioWrapper,
  DescriptionTerm,
  DescriptionValue,
  DescriptionWrapper,
} from 'components/admin-card/card-style';
import { playAudio } from 'services/audio';

const CUT_URL_LAST_PART_REGEX = /.*\//;

enum ControlName {
  AUDIO_TERM = 'Audio 🔉:',
}

interface Props {
  term: string;
  value: string;
}

export const Description: React.FC<Props> = ({ term, value }) => {
  return (
    <DescriptionWrapper>
      <DescriptionTerm>{term}:</DescriptionTerm>
      <DescriptionValue>{value}</DescriptionValue>
    </DescriptionWrapper>
  );
};

export const CardAudio: React.FC<{ url: string }> = ({ url }) => {
  const ignore = () => {};
  return (
    <AudioWrapper role="button" tabIndex={0} onClick={() => playAudio(url)} onKeyDown={ignore}>
      <DescriptionTerm>{ControlName.AUDIO_TERM}</DescriptionTerm>
      <DescriptionValue>{url.replace(CUT_URL_LAST_PART_REGEX, '')}</DescriptionValue>
    </AudioWrapper>
  );
};
