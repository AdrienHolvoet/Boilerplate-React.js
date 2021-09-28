import React, { useEffect } from "react";
import Header from "@components/header/header";
import PrimaryButton from "@components/inputs/primaryButton";
import logo from "@images/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import authenticationService from "@services/authenticationService/authenticationService";
import alertify from "alertifyjs";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setShowSideNavbar(false));
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
    <section className="page">
      <Header showLoggedUser={false} showMenu={false}>
        {t("registration")}
      </Header>
      <div className="content registration-container">
        <img className="registration-logo" src={logo} alt="logo" />

        <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
          <div className="form-group">
            <div className="registration-input">
              <input
                className="form-control"
                {...register("firstName", {
                  required: true,
                  pattern: /^[A-Za-z-éè ]+$/i,
                })}
                autoComplete="given-name"
                type="text"
                placeholder={t("forename") + "*"}
              />
              {errors?.firstName?.type === "required" && (
                <div className="error-message">
                  {t("registration.page.forename.required")}
                </div>
              )}
              {errors?.firstName?.type === "pattern" && (
                <span className="error-message">
                  {t("registration.page.forename.pattern")}
                </span>
              )}
            </div>

            <div className="registration-input">
              <input
                className="form-control"
                {...register("lastname", {
                  required: true,
                  pattern: /^[A-Za-z-éè ]+$/i,
                })}
                autoComplete="family-name"
                type="text"
                placeholder={t("name") + "*"}
              />
              {errors?.lastname?.type === "required" && (
                <div className="error-message">
                  {t("registration.page.name.required")}
                </div>
              )}
              {errors?.lastname?.type === "pattern" && (
                <span className="error-message">
                  {t("registration.page.name.pattern")}
                </span>
              )}
            </div>
          </div>
          <div className="form-group">
            <div className="registration-input">
              <input
                className="form-control"
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
                <div className="error-message">{t("username.required")}</div>
              )}
              {errors?.username?.type === "pattern" && (
                <div className="error-message">
                  {t("registration.page.username.pattern")}
                </div>
              )}
              {(errors?.username?.type === "minLength" ||
                errors?.username?.type === "maxLength") && (
                <div className="error-message">
                  {t("registration.page.username.length")}
                </div>
              )}
            </div>
            <div className="registration-input">
              <input
                className="form-control"
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
                <span className="error-message">{t("password.required")}</span>
              )}
              {errors?.password?.type === "pattern" && (
                <span className="error-message">
                  {t("registration.page.password.pattern")}
                </span>
              )}
            </div>
          </div>
          <div className="registration-input">
            <input
              className="form-control"
              {...register("email", { required: true })}
              autoComplete="email"
              type="email"
              placeholder={t("email") + "*"}
            />
            {errors?.email?.type === "required" && (
              <div className="error-message">
                {t("registration.page.email.required")}
              </div>
            )}
          </div>
          <PrimaryButton
            className="registration-submit"
            title={t("register")}
          />
          <span className="registration-login-span">
            {t("registration.page.alreadyRegister")}
            <Link to="/login">{t("registration.page.goToLogin")}</Link>
          </span>
        </form>
      </div>
    </section>
  );
}

export default Registration;
