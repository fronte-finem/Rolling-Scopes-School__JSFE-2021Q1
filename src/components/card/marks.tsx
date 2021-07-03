import React from 'react';

import { Emo, MarkItem, MarksList } from 'components/card/marks-style';

interface MarkProps {
  emo: string;
}

const Mark: React.FC<MarkProps> = ({ emo }) => {
  const iconSrc = `./svg/emoji.svg#${emo}`;
  return (
    <MarkItem>
      <Emo>
        <use href={iconSrc} />
      </Emo>
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
      {marks.map((emo, index) => {
        const key = `${index} ${emo}`;
        return <Mark key={key} emo={emo} />;
      })}
    </MarksList>
  );
};
