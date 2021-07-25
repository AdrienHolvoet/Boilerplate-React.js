import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/header";
import "./notFound.scss";
import { ContentLayout } from "../../styles/components/contentLayout";
import { PageLayout } from "../../styles/components/pageLayout";
class NotFoundPage extends React.Component {
  render() {
    return (
      <PageLayout className="page">
        <Header>Erreur</Header>
        <ContentLayout className="not_found-container">
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
        </ContentLayout>
      </PageLayout>
    );
  }
}
export default NotFoundPage;
