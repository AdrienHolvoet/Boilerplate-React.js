const SecondaryButton = ({ title, className, onClick, type, src }) => {
  return (
    <div className="position-relative d-flex align-items-center">
      {src && <img className="position-absolute pl-1" src={src} />}
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
