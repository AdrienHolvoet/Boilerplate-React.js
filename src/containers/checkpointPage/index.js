import "./checkpoint.scss";
import Header from "../../components/header/header";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import checkpointService from "../../services/checkpointService/checkpointService";
import datasetEntryService from "../../services/datasetEntryService/datasetEntryService";
import imageFileService from "../../services/imageFileService/imageFileService";
import diversityTrainingService from "../../services/diversityTrainingService/diversityTrainingService";
import SideBar from "./sideBar";
import DiversityClass from "./diversityClass";
import alertify from "alertifyjs";
import {
  PER_PAGE,
  SORTING_OPTIONS,
  SORTWAY_ASCENDING,
  WEBSOCKET_URL,
} from "./constant";
import controlService from "../../services/controlService/controlService";
import { Modal } from "react-bootstrap";
import ConfirmModal from "../../components/modals/confirmModal";
import ClassifyModal from "../../components/modals/classifyModal";
import FilterComponent from "./filterComponent";
import lock_black from "../../resources/images/lock_black_24dp.svg";
import FileUpload from "../../components/fileUpload/fileUpload";
import ImportedImages from "../importedImages";
import ZoneView from "../zone";
import ImageSpinner from "../../components/spinners/imageSpinner";
import SockJsClient from "react-stomp";
import TrainingModal from "./trainingModal";

function Checkpoint() {
  const {
    checkpointPublicId,
    controlPublicId,
    diversityClassPublicId,
  } = useParams();

  let history = useHistory();
  const matchImportedImagesRoute = useRouteMatch(
    "/checkpoints/:checkpointPublicId/imported-images"
  );

  const [checkpoint, setCheckpoint] = useState("");
  const [datasetEntries, setDatasetEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentLoadedImg, setCurrentLoadedImg] = useState(0);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [controlPublicIdToDelete, setControlPublicIdToDelete] = useState();
  const [isCropped, setIsCropped] = useState(false);
  const [multipleSelection, setMultipleSelection] = useState(false);
  const [datasetEntryIdsToChange, setDatasetEntryIdsToChange] = useState([]);
  const [classifyModalShow, setClassifyModalShow] = useState(false);
  const [importFilesModalShow, setImportFilesModalShow] = useState(false);
  const [showConfirmTrainingModal, setShowConfirmTrainingModal] = useState(
    false
  );
  const [trainingInProgress, setTrainingInProgress] = useState(false);
  const [trainingProgressNumber, setTrainingProgressNumber] = useState(0);
  const [copyInProgress, setCopyInProgress] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    ...SORTING_OPTIONS[0],
    sortway: SORTWAY_ASCENDING,
  });

  const isAllChecked = useRef(false);

  useEffect(() => {
    getCheckpoint();
  }, []);

  useEffect(() => {
    if (diversityClassPublicId) {
      freshUpdateOfDatasetEntriesOfClass();
    }
  }, [diversityClassPublicId]);

  function getCheckpoint() {
    checkpointService.get(checkpointPublicId).then((res) => {
      setCheckpoint(res);
    });
  }
  const freshUpdateOfDatasetEntriesOfClass = () => {
    setDatasetEntries([]);
    setCurrentLoadedImg(0);
    setCurrentPage(0);

    const params = {
      page: 0,
      per: PER_PAGE,
      filtertype: selectedFilter.value,
      sortway: selectedFilter.sortway,
    };
    datasetEntryService
      .getAllDatasetEntriesOfClass(diversityClassPublicId, params)
      .then((res) => {
        setDatasetEntries(res);
        setTrainingProgressNumber(0);
      });
  };

  const changeDiversityClass = (newDiversityClassId, datasetEntryIds) => {
    datasetEntryService
      .changeDiversityClass(newDiversityClassId, datasetEntryIds)
      .then((res) => {
        if (res) {
          //Put allChecked false
          isAllChecked.current = false;
          alertify.success("La classe a été mise à jour");
          //Update state
          let datasetEntriesCopy = datasetEntries;
          datasetEntryIds.forEach((element) => {
            datasetEntriesCopy = datasetEntriesCopy.filter(
              (datasetEntry) => datasetEntry.publicId !== element
            );
          });
          currentControl.toRetrain = true;
          setDatasetEntries(datasetEntriesCopy);
          setCurrentLoadedImg(datasetEntriesCopy.length);
          if (datasetEntriesCopy.length < 6) {
            const params = { page: 0, per: PER_PAGE };
            datasetEntryService
              .getAllDatasetEntriesOfClass(diversityClassPublicId, params)
              .then((res) => {
                setDatasetEntries(res);
              });
          }
        } else {
          alertify.error("La classe n'a pas été mise à jour");
        }
      });
  };

  const loadNewPageOfDatasetEntries = () => {
    const newCurrentPage = currentPage + 1;
    setCurrentPage(newCurrentPage);
    const params = {
      page: newCurrentPage,
      per: PER_PAGE,
      filtertype: selectedFilter.value,
      sortway: selectedFilter.sortway,
    };
    datasetEntryService
      .getAllDatasetEntriesOfClass(diversityClassPublicId, params)
      .then((res) => {
        if (res && res.length > 0)
          setDatasetEntries([...datasetEntries, ...res]);
        else {
          if (currentLoadedImg !== datasetEntries.length) {
            alertify.warning("Les images sont cours de téléchargement");
          } else {
            alertify.warning("Toutes les images sont déjà téléchargées");
          }
        }
      });
  };

  const copyControl = (controlPublicId) => {
    setCopyInProgress(true);
    controlService.copyControl(controlPublicId).then((res) => {
      if (res) {
        setCheckpoint({
          ...checkpoint,
          controls: [...checkpoint.controls, res],
        });
        alertify.success("Le contrôle a été copié");
      } else {
        alertify.error("Le contrôle n'a pas été copié");
      }
      setCopyInProgress(false);
    });
  };

  const renameControl = (controlPublicId, controlName) => {
    controlService
      .rename({
        publicId: controlPublicId,
        name: controlName,
      })
      .then((res) => {
        if (res) {
          let checkpointCopy = { ...checkpoint };
          checkpointCopy.controls.forEach((control) => {
            if (control.publicId === controlPublicId) {
              control.name = controlName;
            }
          });
          setCheckpoint(checkpointCopy);
          alertify.success("Le contrôle a été modifié");
        } else {
          alertify.error("Le contrôle n'a pas été modifié");
        }
      });
  };

  const deleteControl = () => {
    controlService.remove(controlPublicIdToDelete).then((res) => {
      if (res) {
        let checkpointCopy = { ...checkpoint };
        checkpointCopy.controls = checkpoint.controls.filter(
          (item) => item.publicId !== controlPublicIdToDelete
        );
        if (
          currentControl &&
          currentControl.publicId === controlPublicIdToDelete
        ) {
          history.push(
            `/checkpoints/${checkpoint.publicId}/controls/${checkpoint.controls[0].publicId}/diversity-class/${checkpoint.controls[0].diversityClasses[0].publicId}`
          );
        }
        setCheckpoint(checkpointCopy);

        alertify.success("Le controle a été supprimé");
      } else {
        alertify.error("Le controle n'a pas été supprimé");
      }
    });
  };

  const launchTraining = () => {
    setTrainingInProgress(true);
    diversityTrainingService
      .launchTraining(currentControl.publicId)
      .then((res) => {
        if (!res) {
          alertify.error("Une erreur s'est produite pendant le réentraînement");
        }
      });
  };

  const importNewImages = (formData) => {
    return imageFileService.addNewImages(checkpoint.publicId, formData);
  };

  const getCurrentControl = () => {
    return (
      checkpoint &&
      checkpoint.controls.find((control) => control.publicId == controlPublicId)
    );
  };

  //select the current diversityClass
  const getControlWithoutCurrentDiversityClass = () => {
    const currentControl = getCurrentControl();
    let copyCurrentControl = { ...currentControl };
    if (currentControl) {
      copyCurrentControl.diversityClasses = currentControl.diversityClasses.filter(
        (diversityClass) => diversityClass.publicId !== diversityClassPublicId
      );
    }
    let array = [];
    array.push(copyCurrentControl);
    return array;
  };

  //Select the current diversityClass
  const getCurrentDiversityClass = () => {
    const currentControl = getCurrentControl();

    return (
      currentControl &&
      currentControl.diversityClasses.find(
        (diversityClass) => diversityClass.publicId === diversityClassPublicId
      )
    );
  };

  //select the current diversityClass
  const getOtherDiversityClass = () => {
    const currentControl = getCurrentControl();

    return (
      currentControl &&
      currentControl.diversityClasses.filter(
        (diversityClass) => diversityClass.publicId !== diversityClassPublicId
      )
    );
  };

  const confirmDeleteControl = (controlPublicId) => {
    setShowConfirmDeleteModal(true);
    setControlPublicIdToDelete(controlPublicId);
  };

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop == e.target.clientHeight;
    if (bottom && datasetEntries.length > 0) {
      loadNewPageOfDatasetEntries();
    }
  };

  const updateCurrentLoadedImg = () => {
    setCurrentLoadedImg(currentLoadedImg + 1);
  };

  function onChangeDatasetEntryIds(checkedValue, datasetEntryPublicId) {
    if (checkedValue)
      setDatasetEntryIdsToChange([
        ...datasetEntryIdsToChange,
        datasetEntryPublicId,
      ]);
    else {
      let newArray = datasetEntryIdsToChange.filter(
        (item) => item != datasetEntryPublicId
      );
      setDatasetEntryIdsToChange(newArray);
    }
  }

  function onChangeDiversityClass(selectedDiversityClasses) {
    changeDiversityClass(
      selectedDiversityClasses[0].publicId,
      datasetEntryIdsToChange
    );
    setClassifyModalShow(false);
    setDatasetEntryIdsToChange([]);
  }

  function onSetMultipleSelection() {
    if (!multipleSelection) {
      setDatasetEntryIdsToChange([]);
    }
    setMultipleSelection(!multipleSelection);
  }

  function onSelectAll(checkedValue) {
    if (checkedValue) {
      const lDatasetEntryIdsToChange = datasetEntries.map((item) => {
        return item.publicId;
      });
      isAllChecked.current = true;
      setDatasetEntryIdsToChange(lDatasetEntryIdsToChange);
    } else {
      isAllChecked.current = false;
      setDatasetEntryIdsToChange([]);
    }
  }

  function onTrainingInProgress(progress) {
    if (!trainingInProgress) {
      setTrainingInProgress(true);
    }

    setTrainingProgressNumber(progress);

    if (progress === 100) {
      setTrainingInProgress(false);
      freshUpdateOfDatasetEntriesOfClass();
      updateControlsInCheckpointState(currentControl);
      alertify.success("Réentraînement terminé");
    }
  }

  function updateControlsInCheckpointState(controlToInsert) {
    let copyCheckpoint = { ...checkpoint };

    copyCheckpoint.controls.forEach((control) => {
      if (control.publicId === controlToInsert.publicId) {
        control.toRetrain = false;
      }
    });
    setCheckpoint(copyCheckpoint);
  }

  function onSetSelectedFilter(object) {
    setSelectedFilter(object);
    const params = {
      page: 0,
      per: PER_PAGE,
      filtertype: object.value,
      sortway: object.sortway,
    };

    datasetEntryService
      .getAllDatasetEntriesOfClass(diversityClassPublicId, params)
      .then((res) => {
        setDatasetEntries(res);
        setTrainingProgressNumber(0);
      });
  }

  const currentDiversityClass = getCurrentDiversityClass();
  const currentControl = getCurrentControl();
  const otherDiversityClasses = getOtherDiversityClass();
  const matchZoneRoute = useRouteMatch(
    "/checkpoints/:checkpointPublicId/controls/:controlPublicId"
  );

  return (
    <>
      <section className="d-flex h-100">
        <SideBar
          checkpoint={checkpoint}
          currentMenuItem={
            currentDiversityClass ? currentDiversityClass : "Images importées"
          }
          copyControl={copyControl}
          deleteControl={confirmDeleteControl}
          renameControl={renameControl}
          loading={copyInProgress}
        />
        <div className="d-flex flex-column w-100">
          {matchImportedImagesRoute && matchImportedImagesRoute.isExact ? (
            <ImportedImages
              checkpoint={checkpoint}
              setCheckpoint={setCheckpoint}
            />
          ) : matchZoneRoute && matchZoneRoute.isExact ? (
            <ZoneView
              datasetEntries={datasetEntries}
              checkpoint={checkpoint}
              currentControl={currentControl}
            ></ZoneView>
          ) : (
            <>
              {currentControl && currentControl.initialControl ? (
                <Header
                  title={`${checkpoint.name} / ${
                    currentControl && currentControl.name
                  } / ${currentDiversityClass && currentDiversityClass.name}`}
                />
              ) : (
                <Header
                  classNameImg="lock_black-read_only"
                  srcImg={lock_black}
                  title={`${checkpoint.name} / ${
                    currentControl && currentControl.name
                  } / ${currentDiversityClass && currentDiversityClass.name}`}
                />
              )}
              <FilterComponent
                selectedFilter={selectedFilter}
                setSelectedFilter={onSetSelectedFilter}
                isCropped={isCropped}
                multipleSelection={multipleSelection}
                setMultipleSelection={onSetMultipleSelection}
                setIsCropped={setIsCropped}
                currentControl={currentControl}
                datasetEntryIdsToChange={datasetEntryIdsToChange}
                setClassifyModalShow={setClassifyModalShow}
                setImportFilesModalShow={setImportFilesModalShow}
                setShowConfirmTrainingModal={setShowConfirmTrainingModal}
                onSelectAll={onSelectAll}
                isAllChecked={isAllChecked.current}
                returnPath={history.location.pathname}
              ></FilterComponent>
              <div className="page content" onScroll={handleScroll}>
                <DiversityClass
                  currentControl={currentControl}
                  datasetEntries={datasetEntries}
                  currentDiversityClass={currentDiversityClass}
                  otherDiversityClasses={otherDiversityClasses}
                  changeDiversityClass={changeDiversityClass}
                  updateCurrentLoadedImg={updateCurrentLoadedImg}
                  isCropped={isCropped}
                  multipleSelection={multipleSelection}
                  onChangedatasetEntryIds={onChangeDatasetEntryIds}
                  isAllChecked={isAllChecked.current}
                ></DiversityClass>
                <ClassifyModal
                  show={classifyModalShow}
                  onHide={() => setClassifyModalShow(false)}
                  controls={getControlWithoutCurrentDiversityClass()}
                  title={`Affecter les images de "${
                    currentDiversityClass && currentDiversityClass.name
                  }"`}
                  onConfirm={onChangeDiversityClass}
                />
                <ImageSpinner
                  loadedImagesNumber={currentLoadedImg}
                  imagesNumber={datasetEntries.length}
                />
              </div>
            </>
          )}
        </div>
      </section>
      <ConfirmModal
        show={showConfirmDeleteModal || showConfirmTrainingModal}
        handleClose={
          showConfirmDeleteModal
            ? setShowConfirmDeleteModal
            : setShowConfirmTrainingModal
        }
        handleConfirm={showConfirmDeleteModal ? deleteControl : launchTraining}
        text={
          showConfirmTrainingModal && (
            <>
              Êtes-vous sur de voir réentraîner cette zone? <br /> Cela peut
              prendre du temps.
            </>
          )
        }
      ></ConfirmModal>
      <TrainingModal
        show={trainingInProgress}
        progress={trainingProgressNumber}
      ></TrainingModal>
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
            importService={importNewImages}
            onSuccess={() => setImportFilesModalShow(false)}
          />
        </Modal.Body>
      </Modal>
      <SockJsClient
        url={WEBSOCKET_URL}
        topics={["/topic/loading"]}
        onMessage={(progress) => {
          onTrainingInProgress(progress);
        }}
      />
    </>
  );
}

export default Checkpoint;
