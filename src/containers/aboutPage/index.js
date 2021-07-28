import Header from "../../components/header/header";
import CustomCheckbox from "../../components/inputs/customCheckbox";
import CustomRadio from "../../components/inputs/customRadio";
import CustomRange from "../../components/inputs/customRange";
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
        <CustomCheckbox label="test" onChange={() => {}}></CustomCheckbox>
        <CustomRange value={70}></CustomRange>
        <div className="d-flex">
          <CustomRadio id="test" name="test">
            Name1
          </CustomRadio>
          <CustomRadio id="test2" name="test">
            Name2
          </CustomRadio>
        </div>
      </ContentLayout>
    </PageLayout>
  );
}

export default About;
