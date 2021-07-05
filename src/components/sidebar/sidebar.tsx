import React from 'react';

import { useCategoriesData } from 'services/data/data-context';
import { StyledProps } from 'types/styled';

import { BtnToggle } from './btn-toggle';
import { useSidebarCloseHook } from './hook';
import {
  BtnContainer,
  Heading,
  List,
  ListItem,
  SidebarCategoryImg,
  SidebarCategoryLink,
  SidebarLink,
  SidebarNav,
} from './sidebar-style';

export const Sidebar = ({ className }: StyledProps): JSX.Element => {
  const { ref, isClosed, setClose } = useSidebarCloseHook();
  const categories = useCategoriesData();
  const sidebarClassName = `${className || ''} ${isClosed ? 'close' : ''}`;

  const handleToggle = () => setClose(!isClosed);
  const handleLinkClick = () => setClose(true);

  return (
    <SidebarNav className={sidebarClassName} ref={ref}>
      <BtnContainer>
        <BtnToggle isClosed={isClosed} onToggle={handleToggle} />
      </BtnContainer>
      <List>
        <ListItem key="home">
          <SidebarLink exact to="/" onClick={handleLinkClick}>
            Home
          </SidebarLink>
        </ListItem>
        <ListItem key="statistic">
          <SidebarLink exact to="/statistic" onClick={handleLinkClick}>
            Statistic
          </SidebarLink>
        </ListItem>
        <ListItem key="heading">
          <Heading>Categories:</Heading>
        </ListItem>
        {Array.isArray(categories) &&
          categories.map(({ category, image }) => (
            <ListItem key={category}>
              <SidebarCategoryImg src={image} alt={category} />
              <SidebarCategoryLink name={category} onClick={handleLinkClick}>
                {category}
              </SidebarCategoryLink>
            </ListItem>
          ))}
      </List>
    </SidebarNav>
  );
};
