import Header from "../../components/header/header";
import { ContentLayout } from "../../styles/components/contentLayout";
import { PageLayout } from "../../styles/components/pageLayout";

import "./style.js";

function About() {
  return (
    <PageLayout>
      <Header>A propos</Header>
      <ContentLayout>La section About</ContentLayout>
    </PageLayout>
  );
}

export default About;
