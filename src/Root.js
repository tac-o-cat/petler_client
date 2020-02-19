import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";

const wsurl = "ws://localhost:4000/graphql";
const httpurl = "http://localhost:4000/graphql";

const wsLink = new WebSocketLink({
  uri: wsurl,
  options: {
    reconnect: true,
  },
});
const httpLink = new HttpLink({
  uri: httpurl,
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
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
