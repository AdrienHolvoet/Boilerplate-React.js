import { Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import { IMAGE_HEIGHT, IMAGE_WIDTH, BASE_URL, RATIO_IMG } from "./constant";
import DatasetEntryModal from "./datasetEntryModal";

import CanvasImg from "../../components/canvasImg/canvasImg";
import model_training_img from "../../resources/images/model_training_black_24dp.svg";

import alertify from "alertifyjs";
import { convertDate } from "../../utils/util";
import CustomCheckbox from "../../components/inputs/customCheckbox";

function DiversityClass({
  datasetEntries,
  currentDiversityClass,
  otherDiversityClasses,
  changeDiversityClass,
  currentControl,
  updateCurrentLoadedImg,
  isCropped,
  multipleSelection,
  onChangedatasetEntryIds,
  isAllChecked,
}) {
  const [currentDatasetEntry, setCurrentDatasetEntry] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const onShowModal = (datasetEntry) => {
    if (currentControl.initialControl) {
      setCurrentDatasetEntry(datasetEntry);
      setModalShow(true);
    } else {
      alertify.warning(
        "Vous ne pouvez pas modifier le controle de base, veuillez utiliser une copie."
      );
    }
  };
  return (
    <>
      <div className="diversity_class-container">
        {datasetEntries && datasetEntries.length > 0 ? (
          datasetEntries.map((datasetEntry) => {
            return datasetEntry.datasetEntryDetails.map((detail) => {
              return (
                <DatasetEntryDetailImage
                  onClick={onShowModal.bind(this, datasetEntry)}
                  key={datasetEntry.publicId}
                  isAllChecked={isAllChecked}
                  detail={detail}
                  datasetEntry={datasetEntry}
                  isCropped={isCropped}
                  updateCurrentLoadedImg={updateCurrentLoadedImg}
                  multipleSelection={multipleSelection}
                  onChangedatasetEntryIds={onChangedatasetEntryIds}
                  toRetrain={currentControl.toRetrain}
                />
              );
            });
          })
        ) : (
          <span className="empty-message">Cette diversité est vide</span>
        )}
      </div>
      <DatasetEntryModal
        show={modalShow}
        datasetEntry={currentDatasetEntry}
        diversityClass={currentDiversityClass}
        otherDiversityClasses={otherDiversityClasses}
        onHide={() => setModalShow(false)}
        changeDiversityClass={changeDiversityClass}
      ></DatasetEntryModal>
    </>
  );
}

function DatasetEntryDetailImage({
  detail,
  datasetEntry,
  onClick,
  isCropped,
  updateCurrentLoadedImg,
  multipleSelection,
  onChangedatasetEntryIds,
  isAllChecked,
  toRetrain,
}) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (loaded) {
      updateCurrentLoadedImg();
    }
  }, [loaded]);
  return (
    <>
      <div className={`img-container  ${!loaded ? "d-none" : ""}`}>
        {detail && (
          <>
            {multipleSelection && (
              <CustomCheckbox
                className="select-checkbox"
                onChange={(e) => {
                  onChangedatasetEntryIds(
                    e.target.checked,
                    datasetEntry.publicId
                  );
                }}
                checked={isAllChecked && isAllChecked}
              />
            )}
            <div className="img-click" onClick={onClick}>
              <CanvasImg
                src={`${BASE_URL}/images/${detail.image.publicId}?width=${IMAGE_WIDTH}&height=${IMAGE_HEIGHT}`}
                alt="dataSetEntry"
                width={IMAGE_WIDTH}
                heigth={IMAGE_HEIGHT}
                zone={detail.zone}
                ratio={RATIO_IMG}
                setLoaded={setLoaded}
                isCropped={isCropped}
              />
            </div>
          </>
        )}
        <div>
          <span className="img-creation-date">
            Créée le {convertDate(detail.image.creationDate)}
          </span>
          {datasetEntry.confidenceIndex !== -1 ? (
            <Badge className={`ml-2 ${toRetrain ? "toretrain-badge" : ""}`}>
              {(datasetEntry.confidenceIndex * 100).toFixed(2)}%
            </Badge>
          ) : (
            <Badge className="ml-2 warning-badge">Nouvelle image</Badge>
          )}
          {toRetrain && (
            <img
              className="model_training-img"
              src={model_training_img}
              alt="model-training"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default DiversityClass;
