import CustomCheckbox from "../../components/inputs/customCheckbox";
import { Form } from "react-bootstrap";
import PrimaryButton from "../../components/inputs/primaryButton";

function MultipleSelection({
  multipleSelection,
  setMultipleSelection,
  onSelectAll,
  setClassifyModalShow,
  isAllChecked,
  arrayOfObjects,
  action,
}) {
  return (
    <section>
      <Form.Check
        type="switch"
        id="selection-multiple"
        label="Selection multiple"
        onChange={() => {
          setMultipleSelection();
        }}
        defaultChecked={multipleSelection}
      />

      {multipleSelection && (
        <div className="p-2">
          <CustomCheckbox
            onChange={(e) => onSelectAll(e.target.checked)}
            label="Tout sélectionner"
            checked={isAllChecked}
          ></CustomCheckbox>
          <PrimaryButton
            className={`${arrayOfObjects.length > 0 ? "" : "disabled"}`}
            title={action}
            onClick={setClassifyModalShow.bind(
              this,
              arrayOfObjects.length > 0 && true
            )}
          ></PrimaryButton>
        </div>
      )}
    </section>
  );
}

export default MultipleSelection;
