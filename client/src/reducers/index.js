import { combineReducers } from "redux";

import authReducer from "./authReducer";

import errorReducer from "./errorReducer";

import profileReducer from "./profileReducer";

import companyReducer from "./companyReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  company: companyReducer
});
