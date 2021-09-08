import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { SUPPORTED_LANGUAGES } from "./constant";
import { variables } from "@variable";
import { useState } from "react";
import { media } from "@media";

function LanguageSelection() {
  const { t, i18n } = useTranslation();

  const [showDropdown, setShowDropdown] = useState(false);

  const changeLanguageHandler = (lang) => {
    i18n.changeLanguage(lang);
    setShowDropdown(false);
  };

  const getImageFlag = (lang) => {
    const image = require("../../resources/images/flags/" + lang + ".svg")
      .default;

    return <img src={image} alt={"Flag" + lang} />;
    return;
  };

  return (
    <Wrapper>
      <CurrentMultiLang onClick={() => setShowDropdown(!showDropdown)}>
        {getImageFlag(i18n.language)}
        <span>{i18n.language.substring(0, 2)}</span>
      </CurrentMultiLang>
      <Dropdown>
        {SUPPORTED_LANGUAGES.map((lang, index) => (
          <MultiLang
            key={index}
            className={`${showDropdown ? "" : "d-none"}`}
            onClick={() => changeLanguageHandler(lang)}
          >
            {getImageFlag(lang)}
            <span>{t(lang).substring(0, 2)}</span>
          </MultiLang>
        ))}
      </Dropdown>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-transform: uppercase;
  margin-right: 5px;
`;

const MultiLang = styled.div`
  color: ${variables.themeColorWhite};
  cursor: pointer;
  font-size: 18px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  img {
    width: 19px;
    text-transform: lowercase;
  }
  span {
    display: none;

    ${media.tablet`display : block`}
  }
`;

const CurrentMultiLang = styled(MultiLang)`
  background: ${variables.themeColorPrimary};
  border-radius: 5px;
  width: 40px;
  padding: 5px;
  ${media.tablet`width: 70px;  padding: 3px;`};
`;

const Dropdown = styled.div`
  margin-top: 2px;
  border-radius: 5px !important;
  background: ${variables.themeColorPrimary};
  color: ${variables.themeColorWhite};
  position: absolute;
  width: 40px;

  ${media.tablet` width: 70px;`};
`;
export default LanguageSelection;
