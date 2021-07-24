import { createGlobalStyle } from "styled-components";

import BostonRegular from "../../resources/fonts/Boston-Regular.woff";
import BostonRegular2 from "../../resources/fonts/Boston-Regular.woff2";
import BostonHeavy from "../../resources/fonts/Boston-Heavy.woff";
import BostonHeavy2 from "../../resources/fonts/Boston-Heavy.woff2";

export default createGlobalStyle`
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
`;
