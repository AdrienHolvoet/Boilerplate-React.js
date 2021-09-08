import PrimaryButton from "@components/inputs/primaryButton";
import SecondaryButton from "@components/inputs/secondaryButton";
import warning_img from "@images/warning.svg";
import { useTranslation } from "react-i18next";

const { Modal } = require("react-bootstrap");

function ConfirmModal({ show, handleClose, handleConfirm, text }) {
  const onHandleClose = () => handleClose(false);
  const onHandleConfirm = () => {
    handleConfirm();
    handleClose(false);
  };

  const { t } = useTranslation();
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("confirmModal.confirmation.title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <div className="pb-3">
            <img src={warning_img} />
          </div>

          {text ? text : t("confirmModal.confirmation.text")}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <SecondaryButton title="non" onClick={onHandleClose}></SecondaryButton>
        <PrimaryButton title="oui" onClick={onHandleConfirm}></PrimaryButton>
      </Modal.Footer>
    </Modal>
  );
}
export default ConfirmModal;
