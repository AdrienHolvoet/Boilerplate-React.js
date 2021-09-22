const SecondaryButton = ({ title, className, onClick, type }) => {
  return (
    <>
      <input
        onClick={onClick}
        type={`${type ? type : "submit"}`}
        value={title}
        className={`btn secondary-button ${className ? className : ""}`}
      />
    </>
  );
};

export default SecondaryButton;
