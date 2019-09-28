import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Spoqa Han Sans", "Sans-serif"].join(","),
  },
});

function Root() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default Root;
