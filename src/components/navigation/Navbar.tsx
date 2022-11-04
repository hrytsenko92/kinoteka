import * as React from 'react';
import styled from "styled-components"
import { Routes, Route } from 'react-router-dom';
import { Link} from 'react-router-dom';

export const Container = styled.div`
  background-color: gray;
`


export const Navbar: React.FC = props => {

  return (
    <Container>
      navbar
      
    </Container>
  );
};