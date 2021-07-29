import { useState, useEffect } from "react";

import styled from "styled-components";
import { variables } from "@variable";

function CustomCheckbox({
  label,

  onChange,
  checked,
  defaultChecked,
}) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [checked]);

  function onModify(e) {
    onChange(e);
    e.target.checked = !isChecked;
    setIsChecked(!isChecked);
  }
  return (
    <Wrapper>
      {label}
      <input
        checked={isChecked}
        type="checkbox"
        onChange={(e) => onModify(e)}
        defaultChecked={defaultChecked && defaultChecked}
      />
      <Checkmark className="checkmark" />
    </Wrapper>
  );
}

const Wrapper = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;

  /* Hide the browser's default checkbox */
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* When the checkbox is checked, add a blue background */
  input:checked ~ .checkmark {
    background-color: ${variables.themeColorPrimary};
  }

  /* Show the checkmark when checked */
  input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
`;

const Checkmark = styled.span`
  /* Create a custom checkbox */
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: ${variables.themeColorWhite};
  box-shadow: 0 0 20px rgb(25 25 25 / 15%);
  border-radius: 2px;
  border: 1px solid ${variables.themeColorPrimaryLight};

  &:after {
    left: 8px;
    top: 4px;
    width: 7px;
    height: 12px;
    border: solid ${variables.themeColorWhite};
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    content: "";
    position: absolute;
    display: none;
  }
`;

export default CustomCheckbox;
