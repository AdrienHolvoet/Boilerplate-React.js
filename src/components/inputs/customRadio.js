import { useState } from "react";
import styled from "styled-components";
import { variables } from "../../styles/bases/variable";

const CustomRadio = ({ id, disabled, name, children }) => {
  return (
    <Wrapper>
      <InputRadio disabled={disabled} name={name} type="radio" id={id} />
      <Label htmlFor={id}>{children}</Label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0;
  margin-right: 0.75rem;
  position: relative;

  input[type="radio"]:checked:after {
    width: 15px;
    height: 15px;
    border-radius: 19px;
    top: -3px;
    left: -1px;
    position: relative;
    background-color: ${variables.themeColorPrimary};
    content: "";
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
  }

  input[type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }
`;

const InputRadio = styled.input`
  position: static;
  margin-top: 0;
  margin-right: 0.3125rem;
  margin-left: 0;
`;

const Label = styled.label`
  margin-bottom: 0;
`;

export default CustomRadio;
