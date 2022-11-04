import React from "react";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/navigation/Navbar";
import { Main } from "./components/main/Main";

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}
#root {
    margin: 0;
}
html {
    background-color: #a9a9d7;
}
`;
export const Container = styled.div`
min-height: 100vh;
display: grid;
grid-template-columns: 200px auto;
grid-template-rows: 1fr;
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <BrowserRouter>
          <Container>
            <Navbar />
            <Main />
          </Container>
        </BrowserRouter>
      </Provider>
    </>
  );
};
export default App;
