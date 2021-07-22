import React from 'react';
import { useHistory } from 'react-router-dom';

import { InfiniteScroller } from 'components/infinite-scroller/infinite-scroller';
import { useInfiniteScroller } from 'components/infinite-scroller/use-infinite-scroller';
import { Login } from 'components/login/login';
import { useModalContext } from 'components/modal/modal-context';
import { SidebarCategoryLink } from 'components/sidebar/sidebar-category-link';
import { useDataContext } from 'services/data/context';
import { authService } from 'services/rest-api/auth';
import { AuthTokenStore } from 'services/rest-api/config';
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
  SidebarExternalLink,
  SidebarLink,
  SidebarNav,
  StaticContainer,
} from './sidebar-style';

const SCROLL_PART = 5;
const SWAGGER_LINK = 'https://app.swaggerhub.com/apis-docs/fronte_finem/english-for-kids/1';
const ADMIN_MSG = 'Hello, admin! 🙃';

enum LinkTitle {
  ADMIN_PAGE = 'Admin page',
  SWAGGER_HUB = 'SwaggerHub',
  HOME = 'Home',
  STATISTIC = 'Statistic',
}

enum BtnTitle {
  LOGOUT = 'Logout',
  LOGIN = 'Login',
}

export const Sidebar = ({ className }: StyledProps): JSX.Element => {
  const token = AuthTokenStore.get();
  const history = useHistory();
  const { setModalShow, setModalContent } = useModalContext();
  const { ref, isClosed, setClose } = useSidebarCloseHook();
  const dataService = useDataContext();
  const sidebarClassName = `${className || ''} ${isClosed ? 'close' : ''}`;

  const { loadMore, itemsCount } = useInfiniteScroller({
    minCount: SCROLL_PART,
    getSize: () => dataService.categories.length,
  });

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

  const adminElements = (
    <>
      <Heading>{ADMIN_MSG}</Heading>
      <SidebarLink to="/admin" onClick={handleLinkClick}>
        {LinkTitle.ADMIN_PAGE}
      </SidebarLink>
      <SidebarExternalLink href={SWAGGER_LINK} target="_blank" onClick={handleLinkClick}>
        {LinkTitle.SWAGGER_HUB}
      </SidebarExternalLink>
    </>
  );

  const commonLinks = (
    <>
      <SidebarLink exact to="/" onClick={handleLinkClick}>
        {LinkTitle.HOME}
      </SidebarLink>
      <SidebarLink exact to="/statistic" onClick={handleLinkClick}>
        {LinkTitle.STATISTIC}
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
          {token ? BtnTitle.LOGOUT : BtnTitle.LOGIN}
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
