import { actionTypes } from "./constants";

export const setShowSideNavbar = (value) => {
  return function (dispatch) {
    dispatch({ type: actionTypes.SET_SHOW_SIDENAVBAR, data: value });
  };
};
