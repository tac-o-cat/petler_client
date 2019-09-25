import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  //label
  button {
    font-size: 2rem;
  }
`;

export default GlobalStyle;
