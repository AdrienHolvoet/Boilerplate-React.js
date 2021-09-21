const PrimaryButton = ({ disabled, title, className, onClick, onChange }) => {
  return (
    <>
      <input
        disabled={disabled}
        onChange={onChange}
        onClick={onClick}
        type="submit"
        value={title}
        className={`primary-button ${className ? className : ""}`}
      />
    </>
  );
};

export default PrimaryButton;
