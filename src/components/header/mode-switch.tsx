import React from 'react';

import { StyledProps } from 'types/styled';

import { ModeFirst, ModeSecond, StyledModeSwitch, Switch } from './mode-switch-style';

interface Props extends StyledProps {
  firstName: string;
  secondName: string;
  changeMode: (isSecond: boolean) => void;
}

export const ModeSwitch = ({
  className,
  firstName,
  secondName,
  changeMode,
}: Props): JSX.Element => {
  const [isSecond, setSecond] = React.useState(false);

  const switchClassName = `${className || ''} ${isSecond ? 'second' : ''}`;

  const handleChangeMode = () => {
    setSecond(!isSecond);
    changeMode(isSecond);
  };

  return (
    <StyledModeSwitch className={switchClassName} onClick={handleChangeMode}>
      <ModeFirst>{firstName}</ModeFirst>
      <ModeSecond>{secondName}</ModeSecond>
      <Switch />
    </StyledModeSwitch>
  );
};
