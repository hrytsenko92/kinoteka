import * as React from 'react';
import styled from "styled-components"
import myLogo from "../../assets/logoImg.svg"

export const Container = styled.div`
    width: 100%;
    height: auto;
`

export const Logo: React.FC = props => {
  return (
    <Container>
      <img src={myLogo} alt="logo" />
    </Container>
  );
};