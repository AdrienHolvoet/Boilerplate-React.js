import { Card, CardGroup } from "react-bootstrap";
import "./home.scss";
import Header from "../../components/header/header";
import H1 from "../../components/titles/h1";
import SecondaryButton from "../../components/inputs/secondaryButton";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import checkpointService from "../../services/checkpointService/checkpointService";
import FileUpload from "../../components/fileUpload/fileUpload";
import importService from "../../services/importService/importService";
import moment from "moment";

function Home() {
  const [checkpoints, setCheckpoints] = useState([]);

  useEffect(() => {
    getAllCheckpoints();
  }, []);

  const getAllCheckpoints = () => {
    checkpointService.getAll().then((res) => {
      setCheckpoints(res);
    });
  };

  const updateCheckpoints = (checkpoint) => {
    setCheckpoints((checkpoints) => Array.from(checkpoints).concat(checkpoint));
  };
  const convertDate = (date) => {
    let newDate = new Date(date);
    return moment(newDate * 1000).format("DD-MM-YYYY");
  };

  const importCheckpoint = (formData) => {
    return importService.post(formData);
  };

  return (
    <>
      <Header title="Accueil" />
      <div className="page checkpoints-list-container ">
        <H1>Mes points de contrôle</H1>

        {checkpoints && checkpoints.length > 0 ? (
          <CardGroup className="cards">
            {checkpoints.map((checkpoint, index) => (
              <Card key={index} className="card-container card">
                <Card.Body>
                  <Card.Title className="card-title">
                    {checkpoint.name}
                  </Card.Title>

                  <div className="d-flex flex-column">
                    <Link
                      className="btn primary-button button-space"
                      to={`checkpoints/${checkpoint.publicId}/controls/${checkpoint.firstControlPublicId}/diversity-class/${checkpoint.firstDiversityClassPublicId}/`}
                    >
                      Visualiser
                    </Link>

                    <SecondaryButton
                      className="button-space"
                      title="Paramètres"
                    />
                    <Card.Text className="creation-date ">
                      Importé le {convertDate(checkpoint.importDate)}
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </CardGroup>
        ) : (
          <div className="text-center m-5">
            <h4>Veuillez importer un nouveau point de contrôle</h4>
          </div>
        )}
        <FileUpload
          updateState={updateCheckpoints}
          importService={importCheckpoint}
        ></FileUpload>
      </div>
    </>
  );
}

export default Home;
