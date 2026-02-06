import React, { memo } from 'react';
import styled from 'styled-components';
import { Menu, Icon } from 'semantic-ui-react';

const StyledMenu = styled(Menu)`
  &&& {
    border: 3px solid ${props => props.theme.orange} !important;
    border-radius: 0 !important;
    margin: 0 !important;
  }
  &&& .item {
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
    color: ${props => props.theme.blue};
    &:hover {
      background: ${props => props.theme.blue} !important;
      color: white !important;
    }
  }
  &&& .header.item {
    background: ${props => props.theme.green} !important;
    color: ${props => props.theme.blue} !important;
    font-size: 1.2em;
    &:hover {
      background: ${props => props.theme.green} !important;
      color: ${props => props.theme.blue} !important;
    }
  }
`;

const Header = ({ session = null, onNavigate }) => (
  <StyledMenu>
    <Menu.Item header>
      <Icon name="graduation" /> educationELLy-GraphQL
    </Menu.Item>
    <Menu.Item onClick={() => onNavigate && onNavigate('/')}>About Us</Menu.Item>
    {session?.me ? (
      <Menu.Menu position="right">
        <Menu.Item onClick={() => onNavigate && onNavigate('/dashboard')}>Dashboard</Menu.Item>
        <Menu.Item onClick={() => onNavigate && onNavigate('/students')}>Student List</Menu.Item>
        <Menu.Item onClick={() => onNavigate && onNavigate('/signout')}>
          <Icon name="sign out" /> Logout
        </Menu.Item>
      </Menu.Menu>
    ) : (
      <Menu.Menu position="right">
        <Menu.Item onClick={() => onNavigate && onNavigate('/signup')}>Register</Menu.Item>
        <Menu.Item onClick={() => onNavigate && onNavigate('/signin')}>
          <Icon name="sign in" /> Login
        </Menu.Item>
      </Menu.Menu>
    )}
  </StyledMenu>
);

export default memo(Header);
