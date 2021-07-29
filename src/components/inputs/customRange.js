import { useState } from "react";
import styled from "styled-components";
import { variables } from "@variable";

const CustomRange = ({ value, disabled }) => {
  const [sValue, setSValue] = useState(value);

  return (
    <InputRange>
      <input
        disabled={disabled}
        min="0"
        max="100"
        type="range"
        id="formBasicRange"
        value={sValue}
        onChange={(e) => setSValue(e.target.value)}
        style={{
          background: `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${
            sValue / 100
          }, rgb(18, 18, 18)), color-stop(${
            sValue / 100
          }, rgb(186, 186, 186)))`,
        }}
      ></input>
    </InputRange>
  );
};

const InputRange = styled.div`
  input[type="range"] {
    width: 100%;
    height: 6px;
    margin: 13.8px 0;

    -webkit-appearance: none;
    border-radius: 5px;
    width: 300px;
  }

  input[type="range"]:focus {
    outline: none;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    background: transparent;
    border-radius: 1.3px;
    width: 100%;
    height: 8.4px;
    cursor: pointer;
  }
  input[type="range"]::-webkit-slider-thumb {
    margin-top: -14px;
    width: 16px;
    height: 36px;
    background: ${variables.themeColorPrimary};
    border: 1px solid white;
    border-radius: 3px;
    cursor: pointer;
    -webkit-appearance: none;
  }
  input[type="range"]:focus::-webkit-slider-runnable-track {
    background: transparent;
  }
  input[type="range"]::-moz-range-track {
    background: transparent;
    border: 0.2px solid ${variables.themeColorBlack};
    border-radius: 1.3px;
    width: 100%;
    height: 8.4px;
    cursor: pointer;
  }
  input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 36px;
    background: ${variables.themeColorPrimary};
    border: 1px solid white;
    border-radius: 3px;
    cursor: pointer;
  }
  input[type="range"]::-ms-track {
    background: transparent;
    border-color: transparent;
    border-width: 14.8px 0;
    color: transparent;
    width: 100%;
    height: 8.4px;
    cursor: pointer;
  }
  input[type="range"]::-ms-fill-lower {
    background: transparent;
    border-radius: 2.6px;
  }
  input[type="range"]::-ms-fill-upper {
    background: transparent;
    border-radius: 2.6px;
  }

  input[type="range"]::-ms-thumb {
    width: 16px;
    height: 36px;
    background: ${variables.themeColorPrimary};
    border: 1px solid white;
    border-radius: 3px;
    cursor: pointer;
    margin-top: 0px;
  }
`;

export default CustomRange;
