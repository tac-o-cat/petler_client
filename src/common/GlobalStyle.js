import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * { font-family: 'Spoqa Han Sans', 'Sans-serif'; }
  html, body {
    font-size: 16px;
  }
`;

export default GlobalStyle;
