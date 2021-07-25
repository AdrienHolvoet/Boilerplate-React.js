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
import ShowSideNavbar from "../../contexts/showSideNavbar";
import User from "../../contexts/user";
import { ContentLayout } from "../../styles/components/contentLayout";
import { PageLayout } from "../../styles/components/pageLayout";
import { ErrorMessage } from "../../styles/components/errorMessage";

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useContext(User);
  const { setShowSideNavbar } = useContext(ShowSideNavbar);

  const history = useHistory();

  useEffect(() => {
    setShowSideNavbar(false);
    if (user) {
      history.replace("/");
    }
    return () => {
      setShowSideNavbar(true);
    };
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
    <PageLayout>
      <Header showLoggedUser={false} showMenu={false}>
        Inscription
      </Header>
      <ContentLayout className="registration-container">
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
                <ErrorMessage>Le prénom est requis</ErrorMessage>
              )}
              {errors?.firstName?.type === "pattern" && (
                <ErrorMessage>
                  Le prénom ne peut pas contenir de caractères spéciaux autre
                  que '-' et espace
                </ErrorMessage>
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
                <ErrorMessage>Le nom est requis</ErrorMessage>
              )}
              {errors?.lastname?.type === "pattern" && (
                <ErrorMessage>
                  Le nom ne peut pas contenir de caractères spéciaux autre que
                  '-' et espace
                </ErrorMessage>
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
                <ErrorMessage>Le nom d'utilisateur est requis</ErrorMessage>
              )}
              {errors?.username?.type === "pattern" && (
                <ErrorMessage>
                  Le nom d'utilisateur ne peut pas contenir de caractères
                  spéciaux autre que ' - ', ' _ ', ' . ' et espace.
                </ErrorMessage>
              )}
              {(errors?.username?.type === "minLength" ||
                errors?.username?.type === "maxLength") && (
                <ErrorMessage>
                  Le nom d'utilisateur doit être compris entre 8 et 30
                  caractères
                </ErrorMessage>
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
                <ErrorMessage>Le mot de passe est requis</ErrorMessage>
              )}
              {errors?.password?.type === "pattern" && (
                <ErrorMessage>
                  Le mot de passe doit faire au moins 8 caractères et contenir
                  au moins une majuscule, une minuscule et un chiffre
                </ErrorMessage>
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
              <ErrorMessage>L'email est requis</ErrorMessage>
            )}
          </div>
          <PrimaryButton className="registration-submit" title="s'inscrire" />
          <span className="registration-registration-span">
            Vous avez déjà un compte?
            <Link to="/login"> Aller à connexion</Link>
          </span>
        </Form>
      </ContentLayout>
    </PageLayout>
  );
}

export default Registration;
