import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledBar = styled.nav`
  position: absolute;
  z-index: 10;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100vh;
  background: #0008;
  backdrop-filter: blur(5px);
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
