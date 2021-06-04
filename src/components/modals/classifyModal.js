import { useState } from "react";
import { Modal } from "react-bootstrap";
import PrimaryButton from "../inputs/primaryButton";
import SecondaryButton from "../inputs/secondaryButton";

function ClassifyModal({ onHide, show, controls, title, onConfirm }) {
  const [selectedDiversityClasses, setSelectedDiversityClasses] = useState([]);

  function getCopiedControls(controls) {
    return controls && controls.filter((control) => control.initialControl);
  }
  function confirm(selectedDiversityClasses) {
    setSelectedDiversityClasses([]);
    onConfirm(selectedDiversityClasses);
  }

  function hide() {
    setSelectedDiversityClasses([]);
    onHide();
  }

  const copiedControls = getCopiedControls(controls);
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={hide}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="classify-modal-body">
        {copiedControls && copiedControls.length > 0 ? (
          copiedControls.map(
            (control, cIndex) =>
              control && (
                <div key={cIndex}>
                  <h5 className="pl-4 pb-2 pt-2">{control && control.name}</h5>
                  {control && control.diversityClasses && (
                    <ClassifyModalClasses
                      diversityClasses={control.diversityClasses}
                      setSelectedDiversityClasses={setSelectedDiversityClasses}
                      selectedDiversityClasses={selectedDiversityClasses}
                    ></ClassifyModalClasses>
                  )}
                </div>
              )
          )
        ) : (
          <span className="empty-message">
            Veuillez copier un contrôle pour pouvoir classer ces images
          </span>
        )}
      </Modal.Body>
      <Modal.Footer>
        <SecondaryButton title="Annuler" onClick={onHide}></SecondaryButton>
        <PrimaryButton
          disabled={selectedDiversityClasses.length === 0}
          title="valider"
          onClick={() => confirm(selectedDiversityClasses)}
        ></PrimaryButton>
      </Modal.Footer>
    </Modal>
  );
}

function ClassifyModalClasses({
  diversityClasses,
  setSelectedDiversityClasses,
  selectedDiversityClasses,
}) {
  function OnSelectedDiversityClasses(diversityClass) {
    let selectedDiversityClassesCopy = [...selectedDiversityClasses];

    if (selectedDiversityClass) {
      selectedDiversityClassesCopy = selectedDiversityClassesCopy.filter(
        (dClass) => dClass.publicId !== selectedDiversityClass.publicId
      );
    }

    selectedDiversityClassesCopy.push(diversityClass);
    setSelectedDiversityClasses(selectedDiversityClassesCopy);
    setSelectedDiversityClass(diversityClass);
  }

  const [selectedDiversityClass, setSelectedDiversityClass] = useState("");
  return diversityClasses.map((diversityClass, index) => (
    <div
      key={index}
      onClick={() => OnSelectedDiversityClasses(diversityClass)}
      className={`chooseClass-Card ${
        selectedDiversityClass &&
        selectedDiversityClass.publicId === diversityClass.publicId
          ? "selected-class"
          : ""
      }`}
    >
      <span>Classe : {diversityClass.name}</span>
    </div>
  ));
}

export default ClassifyModal;
