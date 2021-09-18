import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import Header from "@components/header/header";
import PrimaryButton from "@components/inputs/primaryButton";
import logo from "@images/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import authenticationService from "@services/authenticationService/authenticationService";
import alertify from "alertifyjs";
import { ContentLayout } from "@styles/components/contentLayout";
import { PageLayout } from "@styles/components/pageLayout";
import { ErrorMessage } from "@styles/components/errorMessage";
import styled from "styled-components";
import { media } from "@media";
import { variables } from "@variable";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { setShowSideNavbar } from "../app/actions";

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state.user);

  const history = useHistory();

  const { t } = useTranslation();

  useEffect(() => {
    setShow(false);
    if (user) {
      history.replace("/");
    }
    return () => {
      dispatch(setShowSideNavbar(true));
    };
  }, [user]);

  const onSubmit = (data) => {
    authenticationService.register(data).then((res) => {
      if (res) {
        alertify.success(t("registration.page.register.success"));
        history.push("/login");
      } else {
        alertify.success(t("registration.page.register.error"));
      }
    });
  };

  return (
    <PageLayout>
      <Header showLoggedUser={false} showMenu={false}>
        {t("registration")}
      </Header>
      <Wrapper>
        <img src={logo} alt="logo" />

        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <FormInputWrapper>
              <Form.Control
                {...register("firstName", {
                  required: true,
                  pattern: /^[A-Za-z-éè ]+$/i,
                })}
                autoComplete="given-name"
                type="text"
                placeholder={t("forename") + "*"}
              />
              {errors?.firstName?.type === "required" && (
                <ErrorMessage>
                  {t("registration.page.forename.required")}
                </ErrorMessage>
              )}
              {errors?.firstName?.type === "pattern" && (
                <ErrorMessage>
                  {t("registration.page.forename.pattern")}
                </ErrorMessage>
              )}
            </FormInputWrapper>

            <FormInputWrapper className="registration-input">
              <Form.Control
                {...register("lastname", {
                  required: true,
                  pattern: /^[A-Za-z-éè ]+$/i,
                })}
                autoComplete="family-name"
                type="text"
                placeholder={t("name") + "*"}
              />
              {errors?.lastname?.type === "required" && (
                <ErrorMessage>
                  {t("registration.page.name.required")}
                </ErrorMessage>
              )}
              {errors?.lastname?.type === "pattern" && (
                <ErrorMessage>
                  {t("registration.page.name.pattern")}
                </ErrorMessage>
              )}
            </FormInputWrapper>
          </FormGroup>
          <FormGroup>
            <FormInputWrapper>
              <Form.Control
                {...register("username", {
                  required: true,
                  pattern: /^(?=[a-zA-Z0-9._-àéèç@ -]+$)/,
                  minLength: 8,
                  maxLength: 30,
                })}
                autoComplete="username"
                type="text"
                placeholder={t("username") + "*"}
              />
              {errors?.username?.type === "required" && (
                <ErrorMessage>{t("username.required")}</ErrorMessage>
              )}
              {errors?.username?.type === "pattern" && (
                <ErrorMessage>
                  {t("registration.page.username.pattern")}
                </ErrorMessage>
              )}
              {(errors?.username?.type === "minLength" ||
                errors?.username?.type === "maxLength") && (
                <ErrorMessage>
                  {t("registration.page.username.length")}
                </ErrorMessage>
              )}
            </FormInputWrapper>
            <FormInputWrapper>
              <Form.Control
                {...register("password", {
                  required: true,
                  pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,25}/g,
                })}
                autoComplete="current-password"
                type="password"
                placeholder={t("password") + "*"}
                autoComplete="password"
              />
              {errors?.password?.type === "required" && (
                <ErrorMessage>{t("password.required")}</ErrorMessage>
              )}
              {errors?.password?.type === "pattern" && (
                <ErrorMessage>
                  {t("registration.page.password.pattern")}
                </ErrorMessage>
              )}
            </FormInputWrapper>
          </FormGroup>
          <FormInputWrapper>
            <Form.Control
              {...register("email", { required: true })}
              autoComplete="email"
              type="email"
              placeholder={t("email") + "*"}
            />
            {errors?.email?.type === "required" && (
              <ErrorMessage>
                {t("registration.page.email.required")}
              </ErrorMessage>
            )}
          </FormInputWrapper>
          <FormSubmit title={t("register")} />
          <Text>
            {t("registration.page.alreadyRegister")}
            <Link to="/login">{t("registration.page.goToLogin")}</Link>
          </Text>
        </FormWrapper>
      </Wrapper>
    </PageLayout>
  );
}

const Wrapper = styled(ContentLayout)`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;

  img {
    display: block;
    margin: 0 auto;
    width: 160px;
    height: 30%;
    ${media.tablet`width: 320px;`}
  }
`;

const FormWrapper = styled(Form)`
  max-width: 1400px;
  margin: 0 auto;
  height: 70%;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const FormGroup = styled.div`
  display: flex;
  width: 81%;
`;

const FormInputWrapper = styled.div`
  width: 80%;
  margin: auto;
  margin: 5px;

  input {
    height: 60px;
  }

  a {
    color: ${variables.themeColorPrimary};
    font-size: 1em;
    cursor: pointer;
    padding-top: 2px;
    float: right;
  }
`;

const FormSubmit = styled(PrimaryButton)`
  width: 80%;
  font-size: 15px;
  padding: 15px;
  margin-top: 10px;
`;

const Text = styled.span`
  padding: 15px 0.5em;
  a {
    color: ${variables.themeColorPrimary};
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
  }
`;

export default Registration;
