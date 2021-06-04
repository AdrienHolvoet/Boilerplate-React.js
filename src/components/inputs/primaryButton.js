const PrimaryButton = ({ disabled, title, className, onClick, onChange }) => {
  return (
    <>
      <img />
      <input
        disabled={disabled}
        onChange={onChange}
        onClick={onClick}
        type={"submit"}
        value={title}
        className={`btn primary-button ${className ? className : ""}`}
      />
    </>
  );
};

export default PrimaryButton;
