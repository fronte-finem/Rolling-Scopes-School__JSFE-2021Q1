import React from 'react';

import { useCategoriesData } from 'services/data/data-context';
import { StyledProps } from 'types/styled';

import { useSidebarCloseHook } from './hook';
import {
  StyledBar,
  StyledBtnMenu,
  StyledCategoriesItem,
  StyledCategoryLink,
  StyledHomeLink,
  StyledList,
} from './sidebar-style';

export const Sidebar = ({ className }: StyledProps): JSX.Element => {
  const { ref, isClosed, setClose } = useSidebarCloseHook();
  const categories = useCategoriesData();
  const sidebarClassName = `${className || ''} ${isClosed ? 'close' : ''}`;

  const handleToggle = () => setClose(!isClosed);
  const handleLinkClick = () => setClose(true);

  return (
    <StyledBar className={sidebarClassName} ref={ref}>
      <StyledBtnMenu isClosed={isClosed} onToggle={handleToggle} />
      <StyledList>
        <StyledCategoriesItem key="nome">
          <StyledHomeLink exact to="/" draggable={false} onClick={handleLinkClick}>
            Home
          </StyledHomeLink>
        </StyledCategoriesItem>
        {Array.isArray(categories) &&
          categories.map(({ category }) => (
            <StyledCategoriesItem key={category}>
              <StyledCategoryLink name={category} onClick={handleLinkClick}>
                {category}
              </StyledCategoryLink>
            </StyledCategoriesItem>
          ))}
      </StyledList>
    </StyledBar>
  );
};
