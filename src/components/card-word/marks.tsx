import React from 'react';

import { MarkItem, MarksList } from 'components/card-word/marks-style';
import { SvgIcon } from 'components/svg-icon/svg-icon';

interface MarkProps {
  src: string;
  name: string;
}

const Mark: React.FC<MarkProps> = ({ src, name }) => {
  return (
    <MarkItem>
      <SvgIcon src={src} name={name} />
    </MarkItem>
  );
};

interface MarksProps {
  src: string;
  marks: string[];
  show: boolean;
}

export const Marks: React.FC<MarksProps> = ({ src, marks, show }) => {
  return (
    <MarksList show={show}>
      {marks.map((name, index) => {
        const key = `${index} ${name}`;
        return <Mark key={key} src={src} name={name} />;
      })}
    </MarksList>
  );
};
