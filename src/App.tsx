import React, { useState, useEffect } from "react";
import { useAppSelector } from "./redux/hook";
import { RootState } from "./redux/store";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import {
  lightTheme,
  darkTheme,
  themeType,
} from "./assets/Theme.styled";
import StickyBox from "react-sticky-box";
import Exo from "./assets/Exo_2/Exo2-VariableFont_wght.ttf";
import ExoItalic from "./assets/Exo_2/Exo2-Italic-VariableFont_wght.ttf";
import { Navbar } from "./components/navigation/Navbar";
import { Main } from "./components/main/Main";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Exo 2', sans-serif;
  src: url(${Exo}) format('ttf'),
       url(${ExoItalic}) format('ttf');
}
* {
    transition: 450ms;
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Exo 2', sans-serif;
}
#root {
    margin: 0;
}
`;
export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const App: React.FC = () => {
  const changeTheme = useAppSelector((state: RootState) => state.theme.value);
  const appLang = useAppSelector((state: RootState) => state.lang.value);
  const [myTheme, setMyTheme] = useState<themeType>(lightTheme);
  useEffect(() => {
    const changeMyTheme = () => {
      return changeTheme === "lightTheme"
        ? setMyTheme(lightTheme)
        : setMyTheme(darkTheme);
    };
    changeMyTheme();
  }, [changeTheme]);
  return (
    <>
      <ThemeProvider theme={myTheme}>
        <GlobalStyle />
        <Container style={{ backgroundColor: `${myTheme.background}` }}>
          <StickyBox
            style={{
              width: "100vw",
              zIndex: 999,
              display: "flex",
              flexFlow: "row",
              justifyContent: "center",
            }}
            offsetTop={15}
            offsetBottom={0}
          >
            <Navbar language={appLang} />
          </StickyBox>
          <Main />
        </Container>
      </ThemeProvider>
    </>
  );
};
export default App;