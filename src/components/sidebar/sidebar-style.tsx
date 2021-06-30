import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { BtnToggle } from 'components/sidebar/btn-toggle';

export const StyledBar = styled.nav`
  --w: 300px;
  --ofsset: 20px;

  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: var(--w);
  height: 100vh;
  transition: all 500ms;
  background: linear-gradient(#777, #999, #777);

  @supports (backdrop-filter: none) {
    background: #0008;
    backdrop-filter: blur(5px);
  }

  &.close {
    left: -300px;
    --ofsset: -100px;
  }
`;

export const StyledBtnMenu = styled(BtnToggle)`
  position: absolute;
  right: var(--ofsset);
  top: 20px;
  transition: all 500ms;
`;

export const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 100px 0;
  row-gap: 20px;
`;

export const StyledCategoriesItem = styled.li`
  display: block;
`;

export const StyledLink = styled(NavLink)`
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

  &.active {
    background: #000;
    color: #fff;
    pointer-events: none;
  }
`;
