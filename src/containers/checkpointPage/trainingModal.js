import { Modal, ProgressBar, Spinner } from "react-bootstrap";

function TrainingModal({ show, progress }) {
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={() => {}}
    >
      <Modal.Header>
        <Modal.Title>Chargement</Modal.Title>
        <Spinner animation="border"></Spinner>
      </Modal.Header>
      <Modal.Body className="training-modal ">
        <h4>{progress} %</h4>
        <ProgressBar now={progress}></ProgressBar>
        <label>Réentraînement en cours...</label>
      </Modal.Body>
    </Modal>
  );
}

export default TrainingModal;
