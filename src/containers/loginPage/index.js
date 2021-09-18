import React, { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import Header from "@components/header/header";
import PrimaryButton from "@components/inputs/primaryButton";
import logo from "@images/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import authenticationService from "@services/authenticationService/authenticationService";
import alertify from "alertifyjs";
import User from "@contexts/user";
import ShowSideNavbar from "@contexts/showSideNavbar";
import { addItem } from "@utils/localStorage";
import { ContentLayout } from "@styles/components/contentLayout";
import { PageLayout } from "@styles/components/pageLayout";
import { ErrorMessage } from "@styles/components/errorMessage";
import styled from "styled-components";
import { media } from "@styles/bases/media";
import { variables } from "@styles/bases/variable";
import { useTranslation } from "react-i18next";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

function Login(props) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user, setUser } = useContext(User);
  const { setShowSideNavbar } = useContext(ShowSideNavbar);
  const history = useHistory();

  useEffect(() => {
    setShowSideNavbar(false);
    if (user) {
      if (
        props &&
        props.location &&
        props.location.state &&
        props.location.state.redirectPath
      )
        history.replace(props.location.state.redirectPath);
      else {
        history.replace("/");
      }
    }
    return () => {
      setShowSideNavbar(true);
    };
  }, [user]);

  const onSubmit = (data) => {
    authenticationService.post(data).then((res) => {
      if (res) {
        setUser(res);
        //addItem to localStorage
        addItem("user", res);
        history.push("/");
      } else {
        alertify.error(t("login.page.connectionError"));
      }
    });
  };

  const responseFacebook = (response) => {
    console.log(response);
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <PageLayout>
      <Header showLoggedUser={false} showMenu={false}>
        {t("login.page.title")}
      </Header>
      <Wrapper>
        <img src={logo} alt="logo" />
        <FacebookLogin
          appId="4273682032669379"
          autoLoad
          callback={responseFacebook}
          render={(renderProps) => (
            <button onClick={renderProps.onClick}>
              This is my custom FB button
            </button>
          )}
        />
        <GoogleLogin
          clientId="78721849523-2v06tdrlosbps0j7vl3uq6mo9c3fo2fa.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />

        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <FormInputWrapper>
            <Form.Control
              {...register("username", { required: true })}
              autoComplete="username"
              type="text"
              placeholder={t("username") + "*"}
            />
            {errors?.username?.type === "required" && (
              <ErrorMessage>{t("username.required")}</ErrorMessage>
            )}
          </FormInputWrapper>
          <FormInputWrapper>
            <Form.Control
              {...register("password", { required: true })}
              autoComplete="current-password"
              type="password"
              placeholder={t("password") + "*"}
              id="current-password"
            />
            {errors?.password?.type === "required" && (
              <ErrorMessage>{t("password.required")}</ErrorMessage>
            )}
            <Link to="forgot-password">{t("login.page.forgotPassword")}</Link>
          </FormInputWrapper>
          <FormSubmit title={t("connection")} />
          <Text>
            {t("login.page.notYetRegister")}
            <Link to="/registration"> {t("registration")}</Link>
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

export default Login;
