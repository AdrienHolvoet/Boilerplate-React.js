import React, { useState, useEffect, useRef } from "react";
import file_upload from "../../resources/images/file_upload_black_24dp.svg";
import alertify from "alertifyjs";

const FileUpload = ({ updateState, importService, className, onSuccess }) => {
  const [isDragOver, setIsDragOver] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const isDragOverRef = useRef();
  isDragOverRef.current = isDragOver;
  const isUploadedRef = useRef();
  isUploadedRef.current = isUploaded;
  const isUploadingRef = useRef();
  isUploadingRef.current = isUploading;

  useEffect(() => {
    const dropArea = document.getElementById("drop-area");

    function dragover(event) {
      event.stopPropagation();
      event.preventDefault();
      if (!isUploadedRef.current && !isUploadingRef.current) {
        // Style the drag-and-drop as a "copy file" operation.
        event.dataTransfer.dropEffect = "copy";
        setIsDragOver("is-dragover");
      }
    }

    function dragleave(event) {
      if (event.target.id == "drop-area") {
        setIsDragOver("");
      }
    }

    function drop(event) {
      event.stopPropagation();
      event.preventDefault();

      if (!isUploadedRef.current && !isUploadingRef.current) {
        const fileList = event.dataTransfer.files;
        onFileUpload(fileList);
      }
    }

    dropArea.addEventListener("dragover", dragover);
    dropArea.addEventListener("dragleave", dragleave);
    dropArea.addEventListener("drop", drop);

    return () => {
      dropArea.removeEventListener("dragover", dragover);
      dropArea.removeEventListener("dragleave", dragleave);
      dropArea.removeEventListener("drop", drop);
    };
  }, []);

  function onFileChange(event) {
    onFileUpload(event.target.files);
  }

  const onResetUpload = () => {
    setIsUploaded(false);
    setIsUploading(false);
    setIsDragOver("");
  };

  function onFileUpload(files) {
    setIsDragOver("is-dragover");
    setIsUploading(true);

    // Create an object of formData
    const formData = new FormData();
    let successMessage = "Le fichier a été uploadé";
    let errorMessage = "Le fichier n'a pas été uploadé";
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i], files[i].name);
    }

    if (files.length > 1) {
      successMessage = "Les fichiers ont été uploadés";
      errorMessage = "Les fichiers n'ont été uploadés";
    }

    // Update the formData object

    importService(formData).then((res) => {
      if (res) {
        updateState && updateState(res);
        alertify.success(successMessage);
        onSuccess && onSuccess();
      } else {
        alertify.error(errorMessage);
      }
      setIsUploading(false);
      setIsUploaded(true);
      setIsDragOver("");
    });
  }

  return (
    <div
      id="drop-area"
      className={`import-container ${className} ${isDragOver}`}
    >
      <div className="inputfile-container">
        {isUploading ? (
          <>Upload en cours...</>
        ) : isUploaded ? (
          <>
            Fini !
            <b onClick={onResetUpload}>
              <i> Relancer un upload?</i>
            </b>
          </>
        ) : (
          <>
            <img src={file_upload} alt="upload"></img>
            <input
              type="file"
              name="file"
              id="file"
              onChange={onFileChange}
              className="inputfile"
              multiple
            />
            <label htmlFor="file">
              <b>
                <i>Choisissez un fichier </i>
              </b>
              ou faites-le glisser ici
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
