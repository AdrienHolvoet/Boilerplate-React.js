import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import PrimaryButton from "../../components/inputs/primaryButton";

import React, { useRef } from "react";
import MultipleSelection from "../../components/inputs/multipleSelection";
import SecondaryButton from "../../components/inputs/secondaryButton";
import model_training_img from "../../resources/images/model_training_white.svg";
import {
  SORTING_OPTIONS,
  SORTWAY_ASCENDING,
  SORTWAY_DESCENDING,
} from "./constant";
import { Link } from "react-router-dom";

function FilterComponent({
  isCropped,
  multipleSelection,
  setMultipleSelection,
  setIsCropped,
  currentControl,
  datasetEntryIdsToChange,
  setClassifyModalShow,
  onSelectAll,
  isAllChecked,
  setImportFilesModalShow,
  setShowConfirmTrainingModal,
  selectedFilter,
  setSelectedFilter,
  returnPath,
}) {
  const sortway = useRef(SORTWAY_ASCENDING);

  function handleSelect(option) {
    const optionArray = option.split(",");
    setSelectedFilter({
      label: optionArray[0],
      value: optionArray[1],
      sortway: sortway.current,
    });
  }

  return (
    <section className="check-container">
      <div className="d-flex flex-column justify-content-center">
        <Form.Check
          type="switch"
          id="zoom-cropped"
          label="Zones zoomées"
          onChange={() => {
            setIsCropped(!isCropped);
          }}
          defaultChecked={isCropped}
        />
        {currentControl && currentControl.initialControl && (
          <MultipleSelection
            multipleSelection={multipleSelection}
            arrayOfObjects={datasetEntryIdsToChange}
            setMultipleSelection={setMultipleSelection}
            onSelectAll={onSelectAll}
            setClassifyModalShow={setClassifyModalShow}
            isAllChecked={isAllChecked}
            datasetEntryIdsToChange={datasetEntryIdsToChange}
            action="classer"
          ></MultipleSelection>
        )}
      </div>
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex">
          <label className="sorting-label">Trier par </label>
          <DropdownButton
            onSelect={handleSelect}
            id="dropdown-basic-button"
            title={selectedFilter.label}
          >
            {SORTING_OPTIONS.map((option, index) => (
              <Dropdown.Item
                key={index}
                eventKey={option.label + ", " + option.value}
              >
                {option.label}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
        <div className="d-flex">
          <Form.Check
            defaultChecked
            name="sortway"
            inline
            label="Croissant(e)"
            type="radio"
            id="sortway1"
            value={SORTWAY_ASCENDING}
            onChange={(e) => {
              sortway.current = e.target.value;
              setSelectedFilter({ ...selectedFilter, sortway: e.target.value });
            }}
          />
          <Form.Check
            name="sortway"
            inline
            label="Décroissant(e)"
            type="radio"
            id="sortway2"
            value={SORTWAY_DESCENDING}
            onChange={(e) => {
              sortway.current = e.target.value;
              setSelectedFilter({ ...selectedFilter, sortway: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center">
        <Link
          to={{
            pathname: "/analyse/" + currentControl.publicId,
            state: { returnPath: returnPath },
          }}
        >
          <PrimaryButton title="Analyse" />
        </Link>
        <SecondaryButton
          title="Ajouter des images"
          className="add-images-button"
          onClick={setImportFilesModalShow.bind(this, true)}
        />
        {currentControl && currentControl.initialControl && (
          <SecondaryButton
            src={model_training_img}
            className="secondary-reverse_button"
            title="Réentraînement"
            onClick={setShowConfirmTrainingModal.bind(this, true)}
          />
        )}
      </div>
    </section>
  );
}

export default FilterComponent;
