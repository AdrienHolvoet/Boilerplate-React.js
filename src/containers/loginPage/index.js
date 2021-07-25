import React, { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import Header from "../../components/header/header";
import PrimaryButton from "../../components/inputs/primaryButton";
import "./login.scss";
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
      <ContentLayout className="login-container">
        <img className="login-logo" src={logo} alt="logo" />

        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form d-flex flex-column align-items-center w-100"
        >
          <div className="login-input">
            <Form.Control
              {...register("username", { required: true })}
              autoComplete="username"
              type="text"
              placeholder="Nom d'utilisateur*"
            />
            {errors?.username?.type === "required" && (
              <ErrorMessage>Le nom d'utilisateur est requis</ErrorMessage>
            )}
          </div>
          <div className="login-input">
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
          </div>
          <PrimaryButton className="login-submit" title="s'identifier" />
          <span className="login-registration-span">
            Pas encore inscrit? <Link to="/registration"> S'INSCRIRE</Link>
          </span>
        </Form>
      </ContentLayout>
    </PageLayout>
  );
}

export default Login;
