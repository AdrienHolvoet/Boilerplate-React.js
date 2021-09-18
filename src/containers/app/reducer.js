import { actionTypes } from "./constants";

const initialState = {
  showSideNavbar: true,
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SHOW_SIDENAVBAR:
      return { showSideNavbar: action.data };
    default:
      return state;
  }
};

export default appReducer;
