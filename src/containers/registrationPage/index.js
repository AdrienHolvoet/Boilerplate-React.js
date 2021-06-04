import React, { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import Header from "../../components/header/header";
import PrimaryButton from "../../components/inputs/primaryButton";
import "./registration.scss";
import logo from "../../resources/images/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import registerService from "../../services/registerService/registerService";
import alertify from "alertifyjs";
import User from "../../contexts/user";

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useContext(User);

  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.replace("/");
    }
  }, [user]);

  const onSubmit = (data) => {
    registerService.post(data).then((res) => {
      if (res) {
        alertify.success(
          "L'inscription est un succès, vous pouvez vous connecter"
        );
        history.push("/login");
      } else {
        alertify.error("L'inscription n'a pas abouti.");
      }
    });
  };

  return (
    <>
      <Header title="Inscription" showLoggedUser={false}></Header>
      <section className="registration-container">
        <img className="registration-logo" src={logo} alt="logo" />

        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="registration-form d-flex flex-column align-items-center w-100"
        >
          <div className="form-group">
            <div className="registration-input">
              <Form.Control
                {...register("firstName", {
                  required: true,
                  pattern: /^[A-Za-z-éè ]+$/i,
                })}
                autoComplete="given-name"
                type="text"
                placeholder="Prénom*"
              />
              {errors?.firstName?.type === "required" && (
                <div className="error-message">Le prénom est requis</div>
              )}
              {errors?.firstName?.type === "pattern" && (
                <span className="error-message">
                  Le prénom ne peut pas contenir de caractères spéciaux autre
                  que '-' et espace
                </span>
              )}
            </div>

            <div className="registration-input">
              <Form.Control
                {...register("lastname", {
                  required: true,
                  pattern: /^[A-Za-z-éè ]+$/i,
                })}
                autoComplete="family-name"
                type="text"
                placeholder="Nom*"
              />
              {errors?.lastname?.type === "required" && (
                <div className="error-message">Le nom est requis</div>
              )}
              {errors?.lastname?.type === "pattern" && (
                <span className="error-message">
                  Le nom ne peut pas contenir de caractères spéciaux autre que
                  '-' et espace
                </span>
              )}
            </div>
          </div>
          <div className="form-group">
            <div className="registration-input">
              <Form.Control
                {...register("username", {
                  required: true,
                  pattern: /^(?=[a-zA-Z0-9._-àéèç@ -]+$)/,
                  minLength: 8,
                  maxLength: 30,
                })}
                autoComplete="username"
                type="text"
                placeholder="Nom d'utilisateur*"
              />
              {errors?.username?.type === "required" && (
                <div className="error-message">
                  Le nom d'utilisateur est requis
                </div>
              )}
              {errors?.username?.type === "pattern" && (
                <div className="error-message">
                  Le nom d'utilisateur ne peut pas contenir de caractères
                  spéciaux autre que ' - ', ' _ ', ' . ' et espace.
                </div>
              )}
              {(errors?.username?.type === "minLength" ||
                errors?.username?.type === "maxLength") && (
                <div className="error-message">
                  Le nom d'utilisateur doit être compris entre 8 et 30
                  caractères
                </div>
              )}
            </div>
            <div className="registration-input">
              <Form.Control
                {...register("password", {
                  required: true,
                  pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,25}/g,
                })}
                autoComplete="current-password"
                type="password"
                placeholder="Mot de passe*"
                autoComplete="password"
              />
              {errors?.password?.type === "required" && (
                <span className="error-message">
                  Le mot de passe est requis
                </span>
              )}
              {errors?.password?.type === "pattern" && (
                <span className="error-message">
                  Le mot de passe doit faire au moins 8 caractères et contenir
                  au moins une majuscule, une minuscule et un chiffre
                </span>
              )}
            </div>
          </div>
          <div className="registration-input">
            <Form.Control
              {...register("email", { required: true })}
              autoComplete="email"
              type="email"
              placeholder="Email*"
            />
            {errors?.email?.type === "required" && (
              <div className="error-message">L'email est requis</div>
            )}
          </div>
          <PrimaryButton className="registration-submit" title="s'inscrire" />
          <span className="registration-registration-span">
            Vous avez déjà un compte?
            <Link to="/login"> Aller à connexion</Link>
          </span>
        </Form>
      </section>
    </>
  );
}

export default Registration;
