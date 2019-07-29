import axios from "axios";

import { GET_PROFILE, PROFILE_LOADING } from "./types";

// Get current profile
export const getCurrentProfile = id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/users/profile/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};
// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
