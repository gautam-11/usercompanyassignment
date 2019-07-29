import axios from "axios";

import { GET_COMPANY, COMPANY_LOADING } from "./types";

// Get current profile
export const getCurrentCompany = (name, id) => dispatch => {
  dispatch(setCompanyLoading());
  axios
    .post(`/api/companies/${name}`, id)
    .then(res => {
      dispatch({
        type: GET_COMPANY,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_COMPANY,
        payload: {}
      })
    );
};
// Profile loading
export const setCompanyLoading = () => {
  return {
    type: COMPANY_LOADING
  };
};
