import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';

import { Login } from 'components/login/login';
import { useModalContext } from 'components/modal/modal-context';
import { SidebarCategoryLink } from 'components/sidebar/sidebar-category-link';
import { useDataContext } from 'services/data/data-context';
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
  SidebarLink,
  SidebarNav,
  StaticContainer,
} from './sidebar-style';

const SCROLL_PART = 6;

export const Sidebar = ({ className }: StyledProps): JSX.Element => {
  const token = authService.getCurrentToken();
  const history = useHistory();
  const { setModalShow, setModalContent } = useModalContext();
  const { ref, isClosed, setClose } = useSidebarCloseHook();
  const { categoriesData, getWords } = useDataContext();
  const [categoriesPart, setCategoriesPart] = useState(categoriesData.slice(0, SCROLL_PART));
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
    if (categoriesPart.length >= categoriesData.length) return;
    await delay(500);
    const { length } = categoriesPart;
    setCategoriesPart(categoriesData.slice(0, length + SCROLL_PART));
  };

  useEffect(() => {
    (async () => {
      await loadMore();
    })();
  }, [categoriesData]);

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
      <List id="scrollable-list">
        <InfiniteScroll
          next={loadMore}
          dataLength={categoriesPart.length}
          hasMore={categoriesPart.length < categoriesData.length}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollable-list"
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '10px',
          }}
        >
          {categoriesPart.map(({ category }) => (
            <ListItem key={category._id}>
              <SidebarCategoryLink
                categoryId={category._id}
                text={category.name}
                words={getWords(category._id)}
                onClick={handleLinkClick}
              />
            </ListItem>
          ))}
        </InfiniteScroll>
      </List>
    </SidebarNav>
  );
};
