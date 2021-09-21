import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "./constant";
import "./languageSelection.scss";

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
  };

  return (
    <div className="language-select-container">
      <div
        className="language-select-container-lang language-select-container-current-lang"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {getImageFlag(i18n.language)}
        <span>{i18n.language.substring(0, 2)}</span>
      </div>
      <div className="language-select-container-dropdown">
        {SUPPORTED_LANGUAGES.map((lang, index) => (
          <div
            key={index}
            className={`language-select-container-lang ${
              showDropdown ? "" : "d-none"
            }`}
            onClick={() => changeLanguageHandler(lang)}
          >
            {getImageFlag(lang)}
            <span>{t(lang).substring(0, 2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default LanguageSelection;
