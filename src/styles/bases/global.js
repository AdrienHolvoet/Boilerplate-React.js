import { variables } from "./variable.js";
import "./font.js";
import { createGlobalStyle } from "styled-components";
import "alertifyjs/build/css/alertify.css";
import BostonRegular from "../../resources/fonts/Boston-Regular.woff";
import BostonRegular2 from "../../resources/fonts/Boston-Regular.woff2";
import BostonHeavy from "../../resources/fonts/Boston-Heavy.woff";
import BostonHeavy2 from "../../resources/fonts/Boston-Heavy.woff2";

const GlobalStyle = createGlobalStyle`
  @font-face {
      font-family: 'Boston';
      src: local('Boston'), local('Boston'),
      url(${BostonRegular2}) format('woff2'),
      url(${BostonRegular}) format('woff');
      font-weight: normal;
      font-style: normal;
  }

  @font-face {
      font-family: 'BostonHeavy';
      src: local('BostonHeavy'), local('BostonHeavy'),
      url(${BostonHeavy}) format('woff2'),
      url(${BostonHeavy2}) format('woff');
      font-weight: 900;
      font-style: normal;
  }
 body {
  margin: 0;
  font-family: ${variables.fontFamily} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${variables.backgroundColor} !important;
  height : 100vh
}

hr {
  width: 100%;
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

a {
  text-decoration :unset;
  color :unset;
}

::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: ${variables.backgroundColor};
}

/* Handle */
::-webkit-scrollbar-thumb {
  background:${variables.themeColorPrimary};
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: ${variables.themeColorPrimaryDark};
}


.alertify-notifier .ajs-message {
  text-align: center;
  border: solid 1px ${variables.themeColorWhite};
  border-radius: 5px;
  color: ${variables.themeColorWhite};
}
.alertify-notifier .ajs-message.ajs-success {
  background:${variables.successColor};
}
.alertify-notifier .ajs-message.ajs-error {
  background:${variables.errorColor};
}

.alertify-notifier .ajs-message.ajs-warning {
  background: ${variables.warningColor};
}

h1 {
  margin: 0;
}

a {
  color: unset;
}

a:hover {
  color: unset;
  text-decoration: none;
}
`;

export default GlobalStyle;
