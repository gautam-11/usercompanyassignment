import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import jwt_decode from "jwt-decode";

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //save to localStorage
      const { token } = res.data;
      //Set token to localStorage
      localStorage.setItem("jwtToken", token);
      //Set token to Auth Header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = userData => dispatch => {
  //Remove token from local storage
  localStorage.removeItem("jwtToken");
  //Remove auth header for future requests
  setAuthToken(false);
  //Set current user to {} which will set isAuthenticated to false
  axios.post("http://localhost:4000/api/users/logout", userData).then(res => {
    console.log(res);
  });

  dispatch(setCurrentUser({}));
};
