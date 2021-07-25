import styled from "styled-components";
import { variables } from "../../styles/bases/variable";

const SecondaryButton = ({ title, className, onClick, type }) => {
  return (
    <div className="position-relative d-flex align-items-center">
      <InputButton
        onClick={onClick}
        type={`${type ? type : "submit"}`}
        value={title}
        className={`w-100 btn secondary-button ${className ? className : ""}`}
      />
    </div>
  );
};

const InputButton = styled.input`
  border-radius: 10px;
  background-color: ${variables.themeColorSecondary};
  border: 1px solid ${variables.themeColorBlack};
  border: none;
  text-transform: uppercase;
  font-size: 11px;
  padding: 10px;
  min-width: 160px;
  font-weight: bold;
`;

export default SecondaryButton;
