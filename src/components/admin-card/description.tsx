import React from 'react';

import {
  AudioWrapper,
  DescriptionTerm,
  DescriptionValue,
  DescriptionWrapper,
} from 'components/admin-card/card-style';
import { playAudio } from 'services/audio';

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
      <DescriptionTerm>Audio 🔉:</DescriptionTerm>
      <DescriptionValue>{url.replace(/.*\//, '')}</DescriptionValue>
    </AudioWrapper>
  );
};
