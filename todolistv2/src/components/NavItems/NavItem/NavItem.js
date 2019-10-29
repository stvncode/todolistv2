import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

const Li = styled.li`
  display: flex;
  height: 100%;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  text-transform: uppercase;
  align-items: center;
  border-bottom: ${props =>
    props.mobile ? '1px solid transparent' : '2px solid transparent;'};
  font-size: 1.2rem;
  padding: ${props => (props.mobile ? '.5rem 1rem' : '1rem')};
  margin: ${props => (props.mobile ? '2rem 0' : '0 1rem')};
  font-weight: 400;
  color: var(--color-white);
  transition: all 0.2s;
`;

const NavItem = ({link, children}) => {
    return (
        <Li>
            <StyledNavLink to={link}>{children}</StyledNavLink>
        </Li>
    )
}

export default NavItem;