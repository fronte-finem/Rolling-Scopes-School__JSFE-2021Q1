import React from 'react';
import { NavLink } from 'react-router-dom';

import { StyledProps } from 'types/styled';

interface Props extends StyledProps {
  name: string;
  onClick?: () => void;
}

export const CategoryLink: React.FC<Props> = ({ name, className, onClick, children }) => {
  return (
    <NavLink className={className} to={`/category/${name}`} onClick={onClick} draggable={false}>
      {children}
    </NavLink>
  );
};
