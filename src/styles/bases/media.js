import { css } from "styled-components";

const breakpoints = {
  tablet: "768px",
  desktop: "1024px",
  desktopL: "1440px",
};

export const media = Object.keys(breakpoints).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    ${() => {
      const size = breakpoints[label];

      return css`
        @media (min-width: ${size}) {
          ${css(...args)};
        }
      `;
    }};
  `;
  return accumulator;
}, {});
