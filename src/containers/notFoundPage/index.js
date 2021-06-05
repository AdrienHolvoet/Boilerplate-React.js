import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/header";
import "./notFound.scss";
class NotFoundPage extends React.Component {
  render() {
    return (
      <section className="page">
        <Header title="Erreur" />
        <div className="not_found-container">
          <div>
            <h1>
              <span className="display-4">Oups</span>, une erreur s'est
              produite.
            </h1>
            <h3>
              Vous pouvez retourner à l'accueil en{" "}
              <Link to="/">Cliquant ici</Link>
            </h3>
            <hr />
            <p className="text-secondary">404 : Resource not found</p>
          </div>
        </div>
      </section>
    );
  }
}
export default NotFoundPage;
