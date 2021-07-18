import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { InfiniteScroller } from 'components/infinite-scroller/infinite-scroller';
import { Login } from 'components/login/login';
import { useModalContext } from 'components/modal/modal-context';
import { SidebarCategoryLink } from 'components/sidebar/sidebar-category-link';
import { useDataContext } from 'services/data/context';
import { authService } from 'services/rest-api/auth';
import { StyledProps } from 'types/styled';
import { delay } from 'utils/async';

import { BtnToggle } from './btn-toggle';
import { useSidebarCloseHook } from './hook';
import {
  BtnContainer,
  BtnLogin,
  BtnLoginContainer,
  Heading,
  List,
  ListItem,
  SidebarExternalLink,
  SidebarLink,
  SidebarNav,
  StaticContainer,
} from './sidebar-style';

const SCROLL_PART = 6;
const SWAGGER_LINK = 'https://app.swaggerhub.com/apis-docs/fronte_finem/english-for-kids/1';

export const Sidebar = ({ className }: StyledProps): JSX.Element => {
  const token = authService.getCurrentToken();
  const history = useHistory();
  const { setModalShow, setModalContent } = useModalContext();
  const { ref, isClosed, setClose } = useSidebarCloseHook();
  const dataService = useDataContext();
  const [categoriesPart, setCategoriesPart] = useState(
    dataService.categories.slice(0, SCROLL_PART)
  );
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

  const loadMore = async () => {
    if (categoriesPart.length >= dataService.categories.length) return;
    await delay(500);
    const { length } = categoriesPart;
    setCategoriesPart(dataService.categories.slice(0, length + SCROLL_PART));
  };

  useEffect(() => {
    (async () => {
      await loadMore();
    })();
  }, [dataService.categories]);

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
          <>
            <SidebarLink to="/admin" onClick={handleLinkClick}>
              Admin page
            </SidebarLink>
            <SidebarExternalLink href={SWAGGER_LINK} target="_blank" onClick={handleLinkClick}>
              SwaggerHub
            </SidebarExternalLink>
          </>
        )}
        <SidebarLink exact to="/" onClick={handleLinkClick}>
          Home
        </SidebarLink>
        <SidebarLink exact to="/statistic" onClick={handleLinkClick}>
          Statistic
        </SidebarLink>
      </StaticContainer>
      <Heading>Categories:</Heading>
      <InfiniteScroller height="50vh" loadMore={loadMore}>
        <List>
          {categoriesPart.map((category) => (
            <ListItem key={category._id}>
              <SidebarCategoryLink
                categoryId={category._id}
                text={category.name}
                words={dataService.getWordsByCategoryId(category._id)}
                onClick={handleLinkClick}
              />
            </ListItem>
          ))}
        </List>
      </InfiniteScroller>
    </SidebarNav>
  );
};
