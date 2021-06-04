import { Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  BASE_URL,
  RATIO_IMG_MODAL,
} from "./constant";
import PrimaryButton from "../../components/inputs/primaryButton";
import SecondaryButton from "../../components/inputs/secondaryButton";
import CanvasImg from "../../components/canvasImg/canvasImg";
import { convertDate } from "../../utils/util";

function DatasetEntryModal({
  onHide,
  show,
  datasetEntry,
  diversityClass,
  otherDiversityClasses,
  changeDiversityClass,
}) {
  useEffect(() => {
    setSelectedDiversityClass();
    setLoaded(false);
  }, [datasetEntry]);

  const [selectedDiversityClass, setSelectedDiversityClass] = useState("");
  const [isCropped, setIsCropped] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const onChangeDiversityClass = () => {
    const array = [];
    array.push(datasetEntry.publicId);
    changeDiversityClass(selectedDiversityClass.publicId, array);
    onHide();
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {diversityClass && ` Classe actuelle : ${diversityClass.name}`}
        </Modal.Title>
        <Form.Check
          className="zoom-cropped-check-modal"
          type="switch"
          id="custom-switch-modal"
          label="Zone zoomée"
          onChange={() => {
            setIsCropped(!isCropped);
          }}
          defaultChecked={isCropped}
        />
      </Modal.Header>
      <Modal.Body>
        <div className="detail_modal-container">
          {datasetEntry &&
            datasetEntry.datasetEntryDetails.map(
              (datasetEntryDetail, index) => (
                <div key={index} className={`${loaded ? "" : "d-none"}`}>
                  <CanvasImg
                    alt="datasetEntryImage"
                    src={`${BASE_URL}/images/${datasetEntryDetail.image.publicId}?width=${IMAGE_WIDTH}&height=${IMAGE_HEIGHT}`}
                    width={IMAGE_WIDTH}
                    heigth={IMAGE_HEIGHT}
                    ratio={RATIO_IMG_MODAL}
                    zone={datasetEntryDetail.zone}
                    isCropped={isCropped}
                    setLoaded={setLoaded}
                  />
                </div>
              )
            )}
          {datasetEntry && (
            <div className="d-flex flex-column p-3 w-100 align-items-center">
              <div className="mb-2">
                <b>
                  {" "}
                  Indice de confiance :{" "}
                  {(datasetEntry.confidenceIndex * 100).toFixed(2)} %
                </b>
              </div>

              <div>
                Créée le :{" "}
                {convertDate(
                  datasetEntry.datasetEntryDetails[0].image.creationDate
                )}
              </div>
              <div>
                Exportée le :{" "}
                {convertDate(
                  datasetEntry.datasetEntryDetails[0].image.exportDate
                )}
              </div>

              <hr />
              <h5>Sélectionnez la nouvelle classe : </h5>
              {otherDiversityClasses &&
                otherDiversityClasses.map((diversityClass, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedDiversityClass(diversityClass)}
                    className={`chooseClass-Card ${
                      selectedDiversityClass &&
                      selectedDiversityClass.publicId ===
                        diversityClass.publicId
                        ? "selected-class"
                        : ""
                    }`}
                  >
                    <span>Classe : {diversityClass.name}</span>
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className="d-flex justify-content-end mt-4">
          <SecondaryButton
            className="m-1"
            title="Annuler"
            onClick={onHide}
          ></SecondaryButton>
          <PrimaryButton
            disabled={!selectedDiversityClass}
            className="m-1"
            title="Valider"
            onClick={onChangeDiversityClass}
          ></PrimaryButton>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DatasetEntryModal;
