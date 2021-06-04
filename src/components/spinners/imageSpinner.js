import { Spinner } from "react-bootstrap";

function ImageSpinner({ loadedImagesNumber, imagesNumber }) {
  return (
    <>
      {loadedImagesNumber < imagesNumber && (
        <div className="spinner-container">
          <span className="position-absolute">
            {loadedImagesNumber} / {imagesNumber}
          </span>
          <Spinner animation="border" variant="primary"></Spinner>
        </div>
      )}
    </>
  );
}

export default ImageSpinner;
