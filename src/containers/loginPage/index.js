import React, { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import Header from "../../components/header/header";
import PrimaryButton from "../../components/inputs/primaryButton";
import logo from "../../resources/images/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import authenticationService from "../../services/authenticationService/authenticationService";
import alertify from "alertifyjs";
import User from "../../contexts/user";
import ShowSideNavbar from "../../contexts/showSideNavbar";
import { addItem } from "../../utils/localStorage";
import { ContentLayout } from "../../styles/components/contentLayout";
import { PageLayout } from "../../styles/components/pageLayout";
import { ErrorMessage } from "../../styles/components/errorMessage";
import styled from "styled-components";
import { media } from "../../styles/bases/media";
import { variables } from "../../styles/bases/variable";

function Login(props) {
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
        alertify.error("Le nom d'utilisateur ou le mot de passe est incorrect");
      }
    });
  };

  return (
    <PageLayout>
      <Header showLoggedUser={false} showMenu={false}>
        Connexion
      </Header>
      <Wrapper>
        <img src={logo} alt="logo" />

        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <FormInputWrapper>
            <Form.Control
              {...register("username", { required: true })}
              autoComplete="username"
              type="text"
              placeholder="Nom d'utilisateur*"
            />
            {errors?.username?.type === "required" && (
              <ErrorMessage>Le nom d'utilisateur est requis</ErrorMessage>
            )}
          </FormInputWrapper>
          <FormInputWrapper>
            <Form.Control
              {...register("password", { required: true })}
              autoComplete="current-password"
              type="password"
              placeholder="Mot de passe* "
              id="current-password"
            />
            {errors?.password?.type === "required" && (
              <ErrorMessage>Le mot de passe est requis</ErrorMessage>
            )}
            <Link to="forgot-password">Mot de passe oublié?</Link>
          </FormInputWrapper>
          <FormSubmit title="s'identifier" />
          <Text>
            Pas encore inscrit? <Link to="/registration"> S'INSCRIRE</Link>
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
