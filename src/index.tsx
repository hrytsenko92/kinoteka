import React from "react";
import ReactDOM from "react-dom/client";
import {createGlobalStyle} from "styled-components";
import App from "./App";

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
`
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <>
    <GlobalStyle />
    <App />
  </>
);