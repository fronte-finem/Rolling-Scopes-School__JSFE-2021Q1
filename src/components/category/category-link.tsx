import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { StyledProps } from 'types/styled';

interface Props extends StyledProps {
  name: string;
  onClick?: () => void;
}

export const CategoryLink: FC<Props> = ({ name, className, onClick, children }) => {
  return (
    <NavLink className={className} to={`/category/${name}`} onClick={onClick}>
      {children}
    </NavLink>
  );
};

const CATEGORY_REGEX = /^\/category\//;

export const useCategoryLocation = (): string => {
  const { pathname } = useLocation();
  return CATEGORY_REGEX.test(pathname) ? pathname.replace(CATEGORY_REGEX, '') : '';
};
