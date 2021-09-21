function CustomSwitch({ label, id, onChange, disabled, defaultChecked }) {
  return (
    <div className="custom-switch-container">
      <span className="custom-control custom-switch">
        <input
          disabled={disabled}
          type="checkbox"
          id={id}
          onChange={onChange}
          defaultChecked={defaultChecked}
          className="custom-control-input"
        />
        <label title="" htmlFor={id} className="custom-control-label">
          {label}
        </label>
      </span>
    </div>
  );
}

export default CustomSwitch;
