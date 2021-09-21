const CustomRadio = ({ id, disabled, name, children }) => {
  return (
    <div className="custom-radio-container">
      <input
        className="custom-radio__input"
        disabled={disabled}
        name={name}
        type="radio"
        id={id}
      />
      <label className="custom-radio__label" htmlFor={id}>
        {children}
      </label>
    </div>
  );
};

export default CustomRadio;
