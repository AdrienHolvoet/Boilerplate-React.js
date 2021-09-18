import authenticationService from "../../services/authenticationService/authenticationService";
import { actionTypes } from "./constants";

export const setUser = (user) => {
  return function (dispatch) {
    dispatch({ type: actionTypes.SET_USER, data: user });
  };
};

export const unsetUser = () => {
  return function (dispatch) {
    dispatch({ type: actionTypes.UNSET_USER });
  };
};

export const login = (data) => {
  return authenticationService.login(data);
};
