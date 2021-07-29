import styled from "styled-components";
import { variables } from "@variable";

export const ErrorMessage = styled.div`
  padding-top: 5px;
  padding: 0.25em 0.5em;
  border-left: 3px solid ${variables.errorColor};
  margin-top: 0.25em;
  background-color: ${variables.errorBackgroundColor};
  border-radius: 3px;
  color: ${variables.themeColorBlack};
`;
