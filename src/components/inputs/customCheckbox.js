import { useState } from "react";

import { useEffect } from "react";

function CustomCheckbox({
  label,
  className,
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
    <label className={`checkbox-container ${className}`}>
      {label}
      <input
        checked={isChecked}
        type="checkbox"
        onChange={(e) => onModify(e)}
        defaultChecked={defaultChecked && defaultChecked}
      />
      <span className="checkmark"></span>
    </label>
  );
}

export default CustomCheckbox;
