import React, { useContext } from 'react';

import { DataContext, getCategories } from 'services/data-context';
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
  const categoriesContext = useContext(DataContext);
  const categories = getCategories(categoriesContext);
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
        {categories.map(({ category }) => (
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
