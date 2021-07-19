import React from 'react';

import { SvgIcon } from 'components/svg-icon/svg-icon';
import { StyledProps } from 'types/styled';

import { List, ListItem, SpinnerAnimationStyle } from './spinner-style';

interface Props extends StyledProps {
  svgSpriteSrc: string;
  svgIcons: string[];
  svgFill?: string;
  animationStyle?: SpinnerAnimationStyle;
}

export const Spinner: React.FC<Props> = ({
  className,
  svgSpriteSrc,
  svgIcons,
  svgFill,
  animationStyle,
}) => {
  const amount = svgIcons.length;
  const tangent = Math.tan(Math.PI / amount);
  return (
    <List className={className} amount={amount} tangent={tangent} animationStyle={animationStyle}>
      {svgIcons.map((iconName, index) => (
        <ListItem key={`${iconName}${Math.random()}`} index={index + 1}>
          <SvgIcon src={svgSpriteSrc} name={iconName} fill={svgFill} className="icon-animate" />
        </ListItem>
      ))}
    </List>
  );
};
