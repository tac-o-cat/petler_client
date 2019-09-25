import * as React from "react";
import { configure, addDecorator } from "@storybook/react";
import GlobalStyle from "common/GlobalStyle";

const withGlobal = cb => (
  <React.Fragment>
    <GlobalStyle />
    {cb()}
  </React.Fragment>
);

configure(require.context("../src", true, /\.stories\.js$/), module);
addDecorator(withGlobal);
