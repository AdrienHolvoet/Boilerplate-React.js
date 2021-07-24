import "./font.js";
import "./media.js";
import { variables } from "./variable.js";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 body {
  margin: 0;
  font-family: ${variables.fontFamily} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${variables.backgroundColor} !important;
  height : 100vh
}

#root {
  height: 100%;
  display: flex;
  overflow: hidden;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: $background-color;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: $theme-color-primary;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: $theme-color-primary-dark;
}
`;

export default GlobalStyle;
