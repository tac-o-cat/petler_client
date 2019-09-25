import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import GlobalStyle from "common/GlobalStyle";

function Root() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </>
  );
}

export default Root;
