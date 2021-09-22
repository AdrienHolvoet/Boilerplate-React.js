import React, { useEffect } from "react";

import Header from "@components/header/header";
import PrimaryButton from "@components/inputs/primaryButton";
import logo from "@images/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import alertify from "alertifyjs";
import { addItem } from "@utils/localStorage";
import { useTranslation } from "react-i18next";
import { login, setUser } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { setShowSideNavbar } from "../app/actions";
import "./login.scss";

function Login(props) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    dispatch(setShowSideNavbar(false));
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
      dispatch(setShowSideNavbar(true));
    };
  }, [user]);

  const onSubmit = (data) => {
    login(data).then((res) => {
      if (res) {
        dispatch(setUser(res));
        //addItem to localStorage
        addItem("user", res);
        history.push("/");
      } else {
        alertify.error(t("login.page.connectionError"));
      }
    });
  };

  return (
    <section className="page">
      <Header showLoggedUser={false} showMenu={false}>
        {t("login.page.title")}
      </Header>
      <div className="content login-container">
        <img className="login-logo" src={logo} alt="logo" />

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="login-input">
            <input
              className="form-control"
              {...register("email", { required: true })}
              autoComplete="email"
              type="text"
              placeholder={t("email") + "*"}
            />
            {errors?.username?.type === "required" && (
              <div className="error-message">{t("email.required")}</div>
            )}
          </div>
          <div className="login-input">
            <input
              className="form-control"
              {...register("password", { required: true })}
              autoComplete="current-password"
              type="password"
              placeholder={t("password") + "*"}
              id="current-password"
            />
            {errors?.password?.type === "required" && (
              <span className="error-message">{t("password.required")}</span>
            )}
            <Link to="forgot-password">{t("login.page.forgotPassword")}</Link>
          </div>
          <PrimaryButton className="login-submit" title={t("connection")} />
          <span className="login-registration-span">
            {t("login.page.notYetRegister")}
            <Link to="/registration"> {t("registration")}</Link>
          </span>
        </form>
      </div>
    </section>
  );
}

export default Login;
