import React from 'react';

import { Emoji } from 'components/emoji/emoji';
import { StyledProps } from 'types/styled';

import { List, ListItem } from './emoji-list-style';

interface Props extends StyledProps {
  emojiNames: string[];
}

export const EmojiList: React.FC<Props> = ({ className, emojiNames }) => {
  const amount = emojiNames.length;
  const tangent = Math.tan(Math.PI / amount);
  return (
    <List className={className} amount={amount} tangent={tangent}>
      {emojiNames.map((emojiName, index) => (
        <ListItem key={emojiName} index={index + 1}>
          <Emoji name={emojiName} className="emoji-animate" />
        </ListItem>
      ))}
    </List>
  );
};
