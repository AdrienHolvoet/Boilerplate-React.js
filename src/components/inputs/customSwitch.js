import { useState, useEffect } from "react";

import styled from "styled-components";
import { variables } from "../../styles/bases/variable";

function CustomSwitch({ label, id, onChange, disabled, defaultChecked }) {
  return (
    <Wrapper>
      <span className="custom-control custom-switch">
        <input
          disabled={disabled}
          type="checkbox"
          id={id}
          onChange={onChange}
          defaultChecked={defaultChecked}
          class="custom-control-input"
        />
        <label title="" htmlFor={id} class="custom-control-label">
          {label}
        </label>
      </span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .custom-control {
    position: relative;
    z-index: 1;
    display: block;
    min-height: 1.5rem;
    padding-left: 1.5rem;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }

  .custom-switch {
    padding-left: 2.25rem;
  }

  .custom-control-input:checked ~ .custom-control-label::before {
    border-color: ${variables.themeColorPrimary};
    background-color: ${variables.themeColorPrimary};
  }

  .custom-switch .custom-control-label::before {
    left: -2.25rem;
    width: 1.7rem;
    pointer-events: all;
    border-radius: 0.5rem;
  }

  .custom-control-label::before,
  .custom-file-label,
  .custom-select {
    transition: background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .custom-control-label::before {
    position: absolute;
    top: 0.25rem;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 14px;
    pointer-events: none;
    content: "";
    background-color: ${variables.themeColorWhite};
    border: #adb5bd solid 1px;
  }

  .custom-switch .custom-control-input:checked ~ .custom-control-label::after {
    background-color: ${variables.themeColorWhite};
    transform: translateX(0.75rem);
  }

  .custom-switch .custom-control-label::after {
    top: calc(0.25rem + 1px);
    left: calc(-2.25rem + 2px);
    width: calc(1rem - 4px);
    height: calc(1rem - 4px);
    background-color: #adb5bd;
    border-radius: 0.5rem;
    transition: transform 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .custom-control-label::after {
    position: absolute;
    top: 0.25rem;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 14px;
    content: "";
    background: 50%/50% 50% no-repeat;
  }

  .custom-control-label {
    position: relative;
    margin-bottom: 0;
    vertical-align: top;
  }

  .custom-control-input {
    position: absolute;
    left: 0;
    z-index: -1;
    width: 1rem;
    height: 1.25rem;
    opacity: 0;
  }
`;

export default CustomSwitch;
