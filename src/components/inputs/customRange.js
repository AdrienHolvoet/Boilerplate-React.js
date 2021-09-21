import { useState } from "react";

const CustomRange = ({ value, disabled }) => {
  const [sValue, setSValue] = useState(value);

  return (
    <div className="input-range-container">
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
    </div>
  );
};

export default CustomRange;
