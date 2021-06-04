import React, { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import Header from "../../components/header/header";
import PrimaryButton from "../../components/inputs/primaryButton";
import "./login.scss";
import logo from "../../resources/images/logo_black.svg";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import authenticationService from "../../services/authenticationService/authenticationService";
import alertify from "alertifyjs";
import User from "../../contexts/user";
import { addItem } from "../../utils/localStorage";

function Login(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user, setUser } = useContext(User);
  const history = useHistory();

  useEffect(() => {
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
    <>
      <Header title="Connexion" showLoggedUser={false}></Header>
      <img className="login-logo" src={logo} alt="AIManager" />
      <div className="login-container">
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
              <div className="error-message">
                Le nom d'utilisateur est requis
              </div>
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
              <span className="error-message">Le mot de passe est requis</span>
            )}
            <Link to="forgot-password">Mot de passe oublié?</Link>
          </div>
          <PrimaryButton className="login-submit" title="s'identifier" />
          <span className="login-registration-span">
            Pas encore inscrit? <Link to="/registration"> S'INSCRIRE</Link>
          </span>
        </Form>
      </div>
    </>
  );
}

export default Login;
