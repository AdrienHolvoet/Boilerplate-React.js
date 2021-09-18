import { actionTypes } from "./constants";

const initialState = null;
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return action.data;

    case actionTypes.UNSET_USER:
      return null;

    default:
      return state;
  }
};

export default userReducer;
