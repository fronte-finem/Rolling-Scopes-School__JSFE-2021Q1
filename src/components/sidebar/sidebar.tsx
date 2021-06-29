import React, { useContext } from 'react';

import { DataContext, getCategories } from 'services/data-context';
import { StyledProps } from 'types/styled';

import { useSidebarCloseHook } from './hook';
import { StyledBar, StyledBtnMenu, StyledCategoriesItem, StyledLink, StyledList } from './style';

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
          <StyledLink exact to="/" draggable={false} onClick={handleLinkClick}>
            Home
          </StyledLink>
        </StyledCategoriesItem>
        {categories.map(({ category, path }) => (
          <StyledCategoriesItem key={category}>
            <StyledLink to={`/${path}`} draggable={false} onClick={handleLinkClick}>
              {category}
            </StyledLink>
          </StyledCategoriesItem>
        ))}
      </StyledList>
    </StyledBar>
  );
};
