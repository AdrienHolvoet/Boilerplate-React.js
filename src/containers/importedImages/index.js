import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/header/header";
import imageFileService from "../../services/imageFileService/imageFileService";
import { useParams } from "react-router-dom";
import {
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  BASE_URL,
} from "../checkpointPage/constant";
import "./importedImages.scss";
import { Modal } from "react-bootstrap";
import FileUpload from "../../components/fileUpload/fileUpload";
import MultipleSelection from "../../components/inputs/multipleSelection";
import CustomCheckbox from "../../components/inputs/customCheckbox";
import ImageSpinner from "../../components/spinners/imageSpinner";
import ClassifyModal from "../../components/modals/classifyModal";
import alertify from "alertifyjs";
import SecondaryButton from "../../components/inputs/secondaryButton";

function ImportedImages({ checkpoint, setCheckpoint }) {
  const [importedImages, setImportedImages] = useState([]);
  const [importFilesModalShow, setImportFilesModalShow] = useState(false);
  const [classifyModalShow, setClassifyModalShow] = useState(false);
  const [currentLoadedImg, setCurrentLoadedImg] = useState(0);
  const [multipleSelection, setMultipleSelection] = useState(true);
  const [imgToClassify, setImageToClassify] = useState([]);

  const { checkpointPublicId } = useParams();
  const isAllChecked = useRef(false);

  useEffect(() => {
    imageFileService.getImportedImages(checkpointPublicId).then((res) => {
      setImportedImages(res);
    });
  }, []);

  const importNewImages = (formData) => {
    return imageFileService.addNewImages(checkpoint.publicId, formData);
  };

  const updateImportedImagesState = (newImportedImages) => {
    setImportedImages([...importedImages, ...newImportedImages]);
  };

  function onSelectAll(checkedValue) {
    if (checkedValue) {
      const lIimgToClassify = importedImages.map((item) => {
        return item.publicId;
      });
      isAllChecked.current = true;
      setImageToClassify(lIimgToClassify);
    } else {
      isAllChecked.current = false;
      setImageToClassify([]);
    }
  }

  function onSetMultipleSelection() {
    if (!multipleSelection) {
      setImageToClassify([]);
    }
    setMultipleSelection(!multipleSelection);
  }

  function onChangeImgToClassify(checkedValue, imageToClassifyPublicId) {
    if (checkedValue)
      setImageToClassify([...imgToClassify, imageToClassifyPublicId]);
    else {
      let newArray = imgToClassify.filter(
        (item) => item != imageToClassifyPublicId
      );
      setImageToClassify(newArray);
    }
  }

  const updateCurrentLoadedImg = () => {
    setCurrentLoadedImg(currentLoadedImg + 1);
  };

  function onClassImportedImages(selectedDiversityClasses) {
    let selectedDiversityPublicIds = selectedDiversityClasses.map(
      (diversityClass) => {
        return diversityClass.publicId;
      }
    );
    imageFileService
      .classImportedImage({
        importedImages: imgToClassify,
        diversityClasses: selectedDiversityPublicIds,
      })
      .then((res) => {
        if (res) {
          selectedDiversityPublicIds.forEach((selectedDiversityPublicId) => {
            let copyControl = checkpoint.controls.find((control) => {
              return control.diversityClasses.find(
                (diversityClass) =>
                  diversityClass.publicId === selectedDiversityPublicId
              );
            });

            if (copyControl.toRetrain === false) {
              updateControlsInCheckpointState(copyControl);
            }
          });

          //Put allChecked false
          isAllChecked.current = false;
          alertify.success("Les images ont été ajoutées");
          //Update state
          let importedImagesCopy = importedImages;
          imgToClassify.forEach((element) => {
            importedImagesCopy = importedImagesCopy.filter(
              (image) => image.publicId !== element
            );
          });

          setImportedImages(importedImagesCopy);
          setCurrentLoadedImg(importedImagesCopy.length);
        } else {
          alertify.error("Les images n'ont pas été ajoutées");
        }
      });

    setClassifyModalShow(false);
    setImageToClassify([]);
  }

  function updateControlsInCheckpointState(controlToInsert) {
    let copyCheckpoint = { ...checkpoint };

    copyCheckpoint.controls.forEach((control) => {
      if (control.publicId === controlToInsert.publicId) {
        control.toRetrain = true;
      }
    });
    setCheckpoint(copyCheckpoint);
  }

  return (
    <>
      <Header title={`${checkpoint.name} / Images importées`} />
      <section className="check-container">
        <MultipleSelection
          multipleSelection={multipleSelection}
          setMultipleSelection={onSetMultipleSelection}
          onSelectAll={onSelectAll}
          setClassifyModalShow={setClassifyModalShow}
          isAllChecked={isAllChecked.current}
          arrayOfObjects={imgToClassify}
          action="classer"
        ></MultipleSelection>

        <div>
          <SecondaryButton
            title="Ajouter des images"
            onClick={setImportFilesModalShow.bind(this, true)}
          />
        </div>
      </section>
      <div className="page content imported_images_container">
        {importedImages && importedImages.length > 0 ? (
          importedImages.map((image, index) => (
            <CheckBoxImg
              showCheckBox={multipleSelection}
              key={index}
              className="img-imported"
              checked={
                isAllChecked.current ||
                !!imgToClassify.find((imgId) => imgId === image.publicId)
              }
              src={`${BASE_URL}/images/${image.publicId}?width=${IMAGE_WIDTH}&height=${IMAGE_HEIGHT}`}
              onChange={(e) =>
                onChangeImgToClassify(e.target.checked, image.publicId)
              }
              onLoad={updateCurrentLoadedImg}
            ></CheckBoxImg>
          ))
        ) : (
          <span className="empty-message">
            Vous n'avez pas d'images importées
          </span>
        )}
        <ImageSpinner
          loadedImagesNumber={currentLoadedImg}
          imagesNumber={importedImages.length}
        ></ImageSpinner>
      </div>
      <ClassifyModal
        show={classifyModalShow}
        onHide={() => setClassifyModalShow(false)}
        controls={checkpoint.controls}
        title={`Affecter les images selectionnées`}
        onConfirm={onClassImportedImages}
      />
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={importFilesModalShow}
        onHide={() => setImportFilesModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Importer des images dans "{checkpoint.name}"
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FileUpload
            className="m-0"
            updateState={updateImportedImagesState}
            importService={importNewImages}
            onSuccess={() => setImportFilesModalShow(false)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

function CheckBoxImg({
  className,
  src,
  checked,
  showCheckBox,
  onChange,
  onLoad,
}) {
  const [loaded, setLoaded] = useState(false);
  function load() {
    if (onLoad) {
      onLoad();
    }
    setLoaded(true);
  }
  return (
    <>
      <div className={`${className} ${loaded ? "" : "d-none"}`}>
        {showCheckBox && (
          <div>
            <CustomCheckbox
              className="select-checkbox"
              onChange={onChange}
              checked={checked ? checked : checked}
            />
          </div>
        )}
        <img
          className={`img-checkbox ${
            showCheckBox ? "img-checkbox_opacity" : ""
          }`}
          src={src}
          onLoad={() => load()}
        ></img>
      </div>
    </>
  );
}

export default ImportedImages;
