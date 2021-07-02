import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

export const NotFoundRoute: FC = () => {
  const { route } = useParams<{ route: string }>();
  return <h2>Not found: &quot;{route}&quot;</h2>;
};
