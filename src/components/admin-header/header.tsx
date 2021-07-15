import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  BtnContainer,
  BtnLogout,
  HeaderLink,
  Splitter,
  Wrapper,
} from 'components/admin-header/header-style';
import { authService } from 'services/rest-api/auth';

interface Props {
  category?: string;
  words?: number;
}

export const AdminHeader: React.FC<Props> = ({ category, words }) => {
  const history = useHistory();

  const handleLogout = async () => {
    await authService.logout();
    history.push('/');
  };

  const first = category ? <HeaderLink to="/admin">Categories</HeaderLink> : <div>Categories</div>;

  const second = category ? <div>Words ({words || 0})</div> : null;

  const splitter = category && <Splitter />;

  return (
    <Wrapper>
      {first}
      {splitter}
      {category}
      {splitter}
      {second}
      <BtnContainer>
        <BtnLogout type="button" onClick={handleLogout}>
          Logout
        </BtnLogout>
      </BtnContainer>
    </Wrapper>
  );
};
