import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { InfiniteScroller } from 'components/infinite-scroller/infinite-scroller';
import { Login } from 'components/login/login';
import { useModalContext } from 'components/modal/modal-context';
import { SidebarCategoryLink } from 'components/sidebar/sidebar-category-link';
import { useDataContext } from 'services/data/context';
import { authService } from 'services/rest-api/auth';
import { AuthTokenStore } from 'services/rest-api/config';
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

const SCROLL_PART = 5;
const SWAGGER_LINK = 'https://app.swaggerhub.com/apis-docs/fronte_finem/english-for-kids/1';

export const Sidebar = ({ className }: StyledProps): JSX.Element => {
  const token = AuthTokenStore.get();
  const history = useHistory();
  const { setModalShow, setModalContent } = useModalContext();
  const { ref, isClosed, setClose } = useSidebarCloseHook();
  const dataService = useDataContext();
  const [itemsCount, setItemsCount] = useState(SCROLL_PART);
  const sidebarClassName = `${className || ''} ${isClosed ? 'close' : ''}`;

  const handleToggle = () => setClose(!isClosed);
  const handleLinkClick = () => setClose(true);

  const handleLoginClick = () => {
    setModalContent(<Login />);
    setModalShow(true);
  };
  const handleLogoutClick = () => {
    authService.logout();
    history.push('/');
  };

  const loadMore = async () => {
    if (itemsCount >= dataService.categories.length) return;
    await delay(200);
    setItemsCount(itemsCount + SCROLL_PART);
  };

  const adminElements = (
    <>
      <Heading>Hello, admin! 🙃</Heading>
      <SidebarLink to="/admin" onClick={handleLinkClick}>
        Admin page
      </SidebarLink>
      <SidebarExternalLink href={SWAGGER_LINK} target="_blank" onClick={handleLinkClick}>
        SwaggerHub
      </SidebarExternalLink>
    </>
  );

  const commonLinks = (
    <>
      <SidebarLink exact to="/" onClick={handleLinkClick}>
        Home
      </SidebarLink>
      <SidebarLink exact to="/statistic" onClick={handleLinkClick}>
        Statistic
      </SidebarLink>
    </>
  );

  const categories = (
    <>
      <Heading>Categories:</Heading>
      <InfiniteScroller
        height="30vh"
        loadMore={loadMore}
        haveMore={itemsCount < dataService.categories.length}
      >
        <List>
          {dataService.categories.slice(0, itemsCount).map((category) => (
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
    </>
  );

  return (
    <SidebarNav className={sidebarClassName} ref={ref}>
      <BtnLoginContainer>
        <BtnLogin type="button" onClick={token ? handleLogoutClick : handleLoginClick}>
          {token ? 'Logout' : 'Login'}
        </BtnLogin>
      </BtnLoginContainer>
      <BtnContainer>
        <BtnToggle isClosed={isClosed} onToggle={handleToggle} />
      </BtnContainer>
      <StaticContainer>
        {token && adminElements}
        {commonLinks}
      </StaticContainer>
      {categories}
    </SidebarNav>
  );
};
