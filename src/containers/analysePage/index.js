import "./analyse.scss";
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { Table, Form } from "react-bootstrap";
import Header from "../../components/header/header";
import analyseService from "../../services/analyseService/analyseService";
import { useParams } from "react-router-dom";
import { BASIC_THRESHOLD } from "./constant";
import variables from "../../resources/scss/base.module.scss";

function Analyse(props) {
  const [confusionMatrix, setConfusionMatrix] = useState();
  const [falseAlertChart, setFalseAlertChart] = useState();
  const [threshold, setThreshold] = useState(BASIC_THRESHOLD);

  const { controlPublicId } = useParams();

  useEffect(() => {
    const params = {
      threshold: threshold,
    };
    analyseService.getConfusionMatrix(controlPublicId, params).then((res) => {
      if (res) setConfusionMatrix(res);
    });
    analyseService.getFalseAlertChart(controlPublicId, params).then((res) => {
      if (res) {
        res.forEach((v) => {
          v.mode = "lines+markers";
        });
        setFalseAlertChart(res);
      }
    });
  }, [threshold]);

  return (
    <>
      <Header
        returnPath={
          props.location.state ? props.location.state.returnPath : "/"
        }
        title="Analyse"
      />
      <section className="page graphics-container">
        <div className="alert-container ">
          <Form>
            <Form.Group controlId="formBasicRange">
              <Form.Label>
                Seuil d'alerte :
                <label className="treshold-label">{threshold}</label>
              </Form.Label>
              <Form.Control
                className="custom display-value"
                min="0"
                max="100"
                type="range"
                value={threshold * 100}
                custom
                style={{
                  background: `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${threshold}, rgb(18, 18, 18)), color-stop(${threshold}, rgb(186, 186, 186)))`,
                }}
                onChange={(e) => setThreshold(e.target.value / 100)}
              />
            </Form.Group>
          </Form>
          <Table className="confusion-matrix" bordered>
            <tbody>
              <tr>
                <td></td>
                <td>AOP</td>
                <td>NAOP</td>
              </tr>
              {confusionMatrix &&
                Object.entries(confusionMatrix).map((object, index) => (
                  <tr key={index}>
                    <td>{object[1].className}</td>
                    <td
                      bgcolor={
                        object[1].className === "NOK"
                          ? variables.successColor
                          : variables.themeColorPrimary
                      }
                    >
                      {object[1].aop}
                    </td>
                    <td
                      bgcolor={
                        object[1].className === "OK"
                          ? variables.successColor
                          : variables.errorColor
                      }
                    >
                      {object[1].naop}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <div className="d-flex">
          <Plot
            className="false-alert-chart"
            data={falseAlertChart}
            layout={{
              width: 520,
              height: 320,
              title: "Fausses alertes en fonction de l'indice de confiance",
            }}
          />
        </div>
      </section>
    </>
  );
}

export default Analyse;
