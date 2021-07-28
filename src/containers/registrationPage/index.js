import React, { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import Header from "../../components/header/header";
import PrimaryButton from "../../components/inputs/primaryButton";
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
import styled from "styled-components";
import { media } from "../../styles/bases/media";
import { variables } from "../../styles/bases/variable";

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
            </FormInputWrapper>

            <FormInputWrapper className="registration-input">
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
            </FormInputWrapper>
            <FormInputWrapper>
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
            </FormInputWrapper>
          </FormGroup>
          <FormInputWrapper>
            <Form.Control
              {...register("email", { required: true })}
              autoComplete="email"
              type="email"
              placeholder="Email*"
            />
            {errors?.email?.type === "required" && (
              <ErrorMessage>L'email est requis</ErrorMessage>
            )}
          </FormInputWrapper>
          <FormSubmit title="s'inscrire" />
          <Text>
            Vous avez déjà un compte?
            <Link to="/login"> Aller à connexion</Link>
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
