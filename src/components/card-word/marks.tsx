import React from 'react';

import { MarkItem, MarksList } from 'components/card-word/marks-style';
import { Emoji } from 'components/emoji/emoji';

interface MarkProps {
  emojiName: string;
}

const Mark: React.FC<MarkProps> = ({ emojiName }) => {
  return (
    <MarkItem>
      <Emoji name={emojiName} />
    </MarkItem>
  );
};

interface MarksProps {
  marks: string[];
  show: boolean;
}

export const Marks: React.FC<MarksProps> = ({ marks, show }) => {
  return (
    <MarksList show={show}>
      {marks.map((emojiName, index) => {
        const key = `${index} ${emojiName}`;
        return <Mark key={key} emojiName={emojiName} />;
      })}
    </MarksList>
  );
};
