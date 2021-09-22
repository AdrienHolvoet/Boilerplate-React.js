import React from "react";
import { Link } from "react-router-dom";
import Header from "@components/header/header";
import { useTranslation } from "react-i18next";
import "./notFound.scss";

function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <section className="page">
      <Header>{t("error")}</Header>
      <div className="not_found-container">
        <h1>{t("notFound.page.info")}</h1>
        <h2>
          {t("notFound.page.returnHome")}
          <Link to="/">{t("notFound.page.clickHere")}</Link>
        </h2>
        <hr />
        <span>{t("error")} 404</span>
      </div>
    </section>
  );
}
export default NotFoundPage;
