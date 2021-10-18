import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { CategoryLink } from 'components/category/category-link';
import { styledScroll } from 'components/style/styled-scroll';

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
  display: flex;
  flex-direction: column;
  padding: 0 0 20px;
  row-gap: 10px;
  overflow: auto;
  ${styledScroll};
`;

export const ListItem = styled.li`
  position: relative;
  display: block;
  user-select: none;
`;

const SidebarLinkStyle = css`
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
  ${SidebarLinkStyle};
`;

export const SidebarCategoryLink = styled(CategoryLink)`
  ${SidebarLinkStyle};
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
