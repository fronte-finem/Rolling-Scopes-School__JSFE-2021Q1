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
  StaticContainer,
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
      <StaticContainer>
        <SidebarLink exact to="/" onClick={handleLinkClick}>
          Home
        </SidebarLink>
        <SidebarLink exact to="/statistic" onClick={handleLinkClick}>
          Statistic
        </SidebarLink>
      </StaticContainer>
      <Heading>Categories:</Heading>
      <List>
        {Array.isArray(categories) &&
          categories.map(({ category, image }) => (
            <ListItem key={category}>
              <SidebarCategoryLink name={category} onClick={handleLinkClick}>
                {category}
                <SidebarCategoryImg src={image} alt={category} />
              </SidebarCategoryLink>
            </ListItem>
          ))}
      </List>
    </SidebarNav>
  );
};
