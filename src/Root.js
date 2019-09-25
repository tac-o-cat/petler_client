import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Spoqa Han Sans", "Sans-serif"].join(","),
  },
});

function Root() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default Root;
