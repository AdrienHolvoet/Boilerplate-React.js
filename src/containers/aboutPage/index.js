import Header from "../../components/header/header";
import CustomCheckbox from "../../components/inputs/customCheckbox";
import PrimaryButton from "../../components/inputs/primaryButton";
import { ContentLayout } from "../../styles/components/contentLayout";
import { PageLayout } from "../../styles/components/pageLayout";

import "./style.js";

function About() {
  return (
    <PageLayout>
      <Header>A propos</Header>
      <ContentLayout>
        La section About <PrimaryButton>test</PrimaryButton>
        <CustomCheckbox label="test" on onChange={() => {}}></CustomCheckbox>
      </ContentLayout>
    </PageLayout>
  );
}

export default About;
