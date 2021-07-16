import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { button } from 'components/button/button-style';
import { CategoryLink } from 'components/category/category-link';

export const SidebarNav = styled.nav`
  --w: 300px;
  --ofsset: 20px;

  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  width: var(--w);
  transition: all 500ms;
  background: linear-gradient(#777, #999, #777);

  display: flex;
  flex-direction: column;
  row-gap: 40px;

  @supports (backdrop-filter: none) {
    background: #0008;
    backdrop-filter: blur(10px);
  }

  &.close {
    left: -300px;
    --ofsset: -100px;
  }
`;

export const BtnLoginContainer = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
`;

export const BtnLogin = styled.button`
  ${button};
  --fg: #fff;
  --bg: #f80;
  --fg-hover: #fff;
  --bg-hover: #fa0;
  --fg-active: #111;
  --bg-active: #ff0;
  padding: 10px 30px;
`;

export const BtnContainer = styled.div`
  position: absolute;
  right: var(--ofsset);
  top: 20px;
  transition: all 500ms;
`;

export const StaticContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px 0 0;
  row-gap: 20px;
`;

export const Heading = styled.h3`
  color: #fff;
  text-align: center;
  text-transform: uppercase;
`;

export const List = styled.ul`
  padding: 0 0 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// ${styledScroll};

export const ListItem = styled.li`
  position: relative;
  display: block;
  user-select: none;
`;

const sidebarLinkStyle = css`
  display: block;
  padding: 10px 20px;
  background: #fff;
  color: #000;
  text-decoration: none;
  transition: all 300ms;

  &:hover {
    background: #00f;
    color: #fff;
  }
  &:active {
    background: #08f;
  }
  &.active {
    background: #000;
    color: #fff;
    pointer-events: none;
  }
`;

export const SidebarLink = styled(NavLink).attrs({ draggable: false })`
  ${sidebarLinkStyle};
`;

export const StyledSidebarCategoryLink = styled(CategoryLink)`
  ${sidebarLinkStyle};
  position: relative;
  background: linear-gradient(90deg, #fff 20%, #fff0 80%);
  font-size: 30px;
  overflow: hidden;

  &:hover {
    background: #00f8;
  }
  &:active {
    background: #08f8;
  }
  &.active {
    background: #0008;
  }
`;

export const SidebarCategoryImg = styled.img`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100px;
  pointer-events: none;
  mask-image: linear-gradient(90deg, #fff0, #000);
`;
