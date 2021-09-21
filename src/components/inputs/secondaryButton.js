const SecondaryButton = ({ title, className, onClick, type, src }) => {
  return (
    <div className="position-relative d-flex align-items-center">
      <input
        onClick={onClick}
        type={`${type ? type : "submit"}`}
        value={title}
        className={`w-100 btn secondary-button ${className ? className : ""}`}
      />
    </div>
  );
};

export default SecondaryButton;
