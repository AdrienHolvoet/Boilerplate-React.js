import { combineReducers } from "redux";
import userReducer from "@containers/loginPage/reducer";
import appReducer from "@containers/app/reducer";

//Add all the reducers in here to combine them into one
export default combineReducers({ user: userReducer, app: appReducer });
