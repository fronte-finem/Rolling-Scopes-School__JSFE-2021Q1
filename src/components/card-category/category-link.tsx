import React from 'react';
import { NavLink } from 'react-router-dom';

import { StyledProps } from 'types/styled';

interface Props extends StyledProps {
  path: string;
  onClick?: () => void;
}

export const CategoryLink: React.FC<Props> = ({ path, className, onClick, children }) => {
  return (
    <NavLink className={className} to={`/category/${path}`} onClick={onClick} draggable={false}>
      {children}
    </NavLink>
  );
};
