import React, { memo } from 'react';
import styled from 'styled-components';

const CustomNavContainer = styled.div`
  border: 5px solid ${props => props.theme.orange};
  border-radius: 5px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  flex-wrap: wrap;
`;

const Logo = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 1.5em;
  font-weight: 700;
  color: ${props => props.theme.blue};
  padding: 0.5rem;
`;

const NavItems = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const NavItem = styled.a`
  font-size: 1.1em;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.blue};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: ${props => props.theme.blue};
    color: ${props => props.theme.white};
  }
`;

const Header = ({ isAuthenticated = false, onNavigate }) => (
  <CustomNavContainer>
    <Logo>educationELLy</Logo>
    <NavItems>
      <NavItem href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('/'); }}>About Us</NavItem>
      {isAuthenticated ? (
        <>
          <NavItem href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('/dashboard'); }}>Dashboard</NavItem>
          <NavItem href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('/students'); }}>Student List</NavItem>
          <NavItem href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('/students/new'); }}>Add Student</NavItem>
          <NavItem href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('/signout'); }}>Log Out</NavItem>
        </>
      ) : (
        <>
          <NavItem href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('/signup'); }}>Register</NavItem>
          <NavItem href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('/signin'); }}>Log In</NavItem>
        </>
      )}
    </NavItems>
  </CustomNavContainer>
);

export default memo(Header);
