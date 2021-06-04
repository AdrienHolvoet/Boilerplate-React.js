import { Card, CardGroup } from "react-bootstrap";
import React, { useState } from "react";
import Header from "../../components/header/header";
import { Link } from "react-router-dom";
import CanvasImg from "../../components/canvasImg/canvasImg";
import { IMAGE_HEIGHT, IMAGE_WIDTH, RATIO_IMG, BASE_URL } from "./constant";
import "./zone.scss";
import PrimaryButton from "../../components/inputs/primaryButton";
import SecondaryButton from "../../components/inputs/secondaryButton";
import H1 from "../../components/titles/h1";

function ZoneView({ checkpoint, currentControl }) {
  const [changeZone, setChangeZone] = useState(false);
  return (
    <>
      <Header title={`${checkpoint?.name} / ${currentControl?.name}`} />

      <div className="page content zone_view-page">
        <div className="zone_view-container">
          {currentControl && (
            <CanvasImg
              src={`${BASE_URL}/images/${
                currentControl ? currentControl.zones[0].showcasePublicId : ""
              }?width=${IMAGE_WIDTH}&height=${IMAGE_HEIGHT}`}
              alt="dataSetEntry"
              width={IMAGE_WIDTH}
              heigth={IMAGE_HEIGHT}
              zone={currentControl && currentControl.zones[0]}
              ratio={RATIO_IMG}
              editZone={changeZone}
            />
          )}
          {currentControl && currentControl.diversityClasses?.length > 0 && (
            <section>
              <H1 className="classname-title ">Classes</H1>
              <CardGroup className="classname-container">
                {currentControl.diversityClasses.map(
                  (diversityClass, index) => (
                    <Card key={index} className="card-container card">
                      <Link
                        to={`/checkpoints/${checkpoint.publicId}/controls/${currentControl.publicId}/diversity-class/${diversityClass.publicId}`}
                        className="text-decoration-none"
                      >
                        <Card.Body className="d-flex align-items-center">
                          <img
                            className="img-zone"
                            src={`${BASE_URL}/images/diversityClasses/${diversityClass.publicId}`}
                            alt={`${diversityClass.name} showcase`}
                          />
                          <h4 className="class-name">{diversityClass.name}</h4>
                        </Card.Body>
                      </Link>
                    </Card>
                  )
                )}
              </CardGroup>
            </section>
          )}
        </div>

        <div className="button-change-container">
          {!changeZone ? (
            <PrimaryButton
              title="Modifier la zone"
              onClick={() => setChangeZone(true)}
            />
          ) : (
            <>
              <SecondaryButton
                title="Annuler"
                className="mr-2"
                onClick={() => setChangeZone(false)}
              />
              <PrimaryButton title="Sauvegarder" />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ZoneView;
