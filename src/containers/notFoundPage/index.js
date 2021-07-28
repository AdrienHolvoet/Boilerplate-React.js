import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/header";
import { ContentLayout } from "../../styles/components/contentLayout";
import { PageLayout } from "../../styles/components/pageLayout";
import styled from "styled-components";
import { media } from "../../styles/bases/media";
import { variables } from "../../styles/bases/variable";
class NotFoundPage extends React.Component {
  render() {
    return (
      <PageLayout>
        <Header>Erreur</Header>
        <Wrapper>
          <h1>La page demandée n'est pas disponible.</h1>
          <h2>
            Vous pouvez retourner à l'accueil en{" "}
            <Link to="/">Cliquant ici</Link>
          </h2>
          <hr />
          <Text className="text-secondary">Erreur 404</Text>
        </Wrapper>
      </PageLayout>
    );
  }
}

const Wrapper = styled(ContentLayout)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  a {
    text-decoration: underline;
    color: ${variables.themeColorPrimary};
  }

  h1 {
    font-size: 1.75rem;
    ${media.tablet`font-size: 2.5rem;`}
  }

  h2 {
    font-size: 1.25rem;
    ${media.tablet`
      font-size: 1.75rem;
    `}
  }
`;

const Text = styled.span`
  text-align: left;
`;
export default NotFoundPage;
