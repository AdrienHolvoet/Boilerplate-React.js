import React from "react";
import { Link } from "react-router-dom";
import Header from "@components/header/header";
import { ContentLayout } from "@styles/components/contentLayout";
import { PageLayout } from "@styles/components/pageLayout";
import styled from "styled-components";
import { media } from "@media";
import { variables } from "@variable";
import { useTranslation } from "react-i18next";
function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <PageLayout>
      <Header>{t("error")}</Header>
      <Wrapper>
        <div className="text-center">
          <h1>{t("notFound.page.info")}</h1>
          <h2>
            {t("notFound.page.returnHome")}
            <Link to="/">{t("notFound.page.clickHere")}</Link>
          </h2>
          <hr />
          <Text className="text-secondary">{t("error")} 404</Text>
        </div>
      </Wrapper>
    </PageLayout>
  );
}

const Wrapper = styled(ContentLayout)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    text-decoration: underline;
    color: ${variables.themeColorPrimary};
  }

  h1 {
    font-size: 1.75rem;
    ${media.tablet`font-size: 2.5rem;`}
    margin-bottom: 5px;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 200;
    ${media.tablet`
      font-size: 1.75rem;
    `}
  }
`;

const Text = styled.span`
  text-align: left;
`;
export default NotFoundPage;
