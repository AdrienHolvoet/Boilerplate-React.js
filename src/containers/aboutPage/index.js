import Header from "@components/header/header";
import CustomCheckbox from "@components/inputs/customCheckbox";
import CustomRadio from "@components/inputs/customRadio";
import CustomRange from "@components/inputs/customRange";
import CustomSwitch from "@components/inputs/customSwitch";
import PrimaryButton from "@components/inputs/primaryButton";
import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();
  return (
    <section className="page">
      <Header>{t("about.page.title")}</Header>
      <div className="content">
        <PrimaryButton title={t("about.page.input.label")}></PrimaryButton>
        <CustomCheckbox label="test" onChange={() => {}}></CustomCheckbox>
        <CustomRange value={70}></CustomRange>
        <div className="d-flex">
          <CustomRadio id="test" name="test">
            {t("about.page.labeName1")}
          </CustomRadio>
          <CustomRadio id="test2" name="test">
            {t("about.page.labeName2")}
          </CustomRadio>
        </div>
        <CustomSwitch id="idSwitch" label="switch" />
      </div>
    </section>
  );
}

export default About;
