import React from 'react';
import { useHistory } from 'react-router-dom';

import { Login } from 'components/login/login';
import { useModalContext } from 'components/modal/modal-context';
import { SidebarCategoryLink } from 'components/sidebar/sidebar-category-link';
import { authService } from 'services/admin/auth';
import { useDataContext } from 'services/data/data-context';
import { StyledProps } from 'types/styled';

import { BtnToggle } from './btn-toggle';
import { useSidebarCloseHook } from './hook';
import {
  BtnContainer,
  BtnLogin,
  BtnLoginContainer,
  Heading,
  List,
  ListItem,
  SidebarLink,
  SidebarNav,
  StaticContainer,
} from './sidebar-style';

export const Sidebar = ({ className }: StyledProps): JSX.Element => {
  const token = authService.getCurrentToken();
  const history = useHistory();
  const { setModalShow, setModalContent } = useModalContext();
  const { ref, isClosed, setClose } = useSidebarCloseHook();
  const { categoriesData } = useDataContext();
  const sidebarClassName = `${className || ''} ${isClosed ? 'close' : ''}`;

  const handleToggle = () => setClose(!isClosed);
  const handleLinkClick = () => setClose(true);

  const handleLoginClick = () => {
    setModalContent(<Login />);
    setModalShow(true);
  };
  const handleLogoutClick = async () => {
    await authService.logout();
    history.push('/');
  };

  return (
    <SidebarNav className={sidebarClassName} ref={ref}>
      <BtnLoginContainer>
        {token ? (
          <BtnLogin type="button" onClick={handleLogoutClick}>
            Logout
          </BtnLogin>
        ) : (
          <BtnLogin type="button" onClick={handleLoginClick}>
            Login
          </BtnLogin>
        )}
      </BtnLoginContainer>
      <BtnContainer>
        <BtnToggle isClosed={isClosed} onToggle={handleToggle} />
      </BtnContainer>
      <StaticContainer>
        {token && <Heading>Hello, admin! 🙃</Heading>}
        {token && (
          <SidebarLink to="/admin" onClick={handleLinkClick}>
            Admin page
          </SidebarLink>
        )}
        <SidebarLink exact to="/" onClick={handleLinkClick}>
          Home
        </SidebarLink>
        <SidebarLink exact to="/statistic" onClick={handleLinkClick}>
          Statistic
        </SidebarLink>
      </StaticContainer>
      <Heading>Categories:</Heading>
      <List>
        {categoriesData.map(({ category }) => (
          <ListItem key={category._id}>
            <SidebarCategoryLink
              categoryId={category._id}
              text={category.name}
              onClick={handleLinkClick}
            />
          </ListItem>
        ))}
      </List>
    </SidebarNav>
  );
};
