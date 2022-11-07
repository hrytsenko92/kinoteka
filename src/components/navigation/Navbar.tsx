import * as React from 'react';
import styled from "styled-components"
import { Routes, Route } from 'react-router-dom';
import { Link} from 'react-router-dom';
import {Logo} from "./Logo"
import {Setting} from "./Setting"

export const Container = styled.div`
  background-color: gray;
`
export const Menu = styled.ul`
  
`
export const MenuItem = styled.li`
  
`

export const Navbar: React.FC = props => {

  return (
    <Container>
      <Logo/>
      <Menu>
          <MenuItem><Link to='/'>Home</Link></MenuItem>
          <MenuItem><Link to='/discover'>Discover</Link></MenuItem>
          <MenuItem><Link to='/playlist'>Playlist</Link></MenuItem>
          <MenuItem><Link to='/recent'>Recent</Link></MenuItem>
        </Menu>
      <Setting/>
    </Container>
  );
};