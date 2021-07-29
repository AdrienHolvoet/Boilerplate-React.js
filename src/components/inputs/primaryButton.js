import styled from "styled-components";
import { variables } from "@variable";

const PrimaryButton = ({ disabled, title, className, onClick, onChange }) => {
  return (
    <>
      <InputButton
        disabled={disabled}
        onChange={onChange}
        onClick={onClick}
        type="submit"
        value={title}
        className={`${className ? className : ""}`}
      />
    </>
  );
};

const InputButton = styled.input`
  border-radius: 10px;
  background-color: ${variables.themeColorPrimary};
  color: ${variables.themeColorWhite};
  border: none;
  text-transform: uppercase;
  font-size: 11px;
  padding: 10px;
  min-width: 160px;
  font-weight: bold;
`;

export default PrimaryButton;
