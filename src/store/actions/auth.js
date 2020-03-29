import axios from "axios";
import * as actionTypes from "./actionTypes";

const FIREBASE_API_KEY = "AIzaSyBaRaA_PnI1cifqWdMJ4c1DdhjVrkShRA4";

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken: authData.idToken,
  userId: authData.localId
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error
});

export const logout = () => ({
  type: actionTypes.AUTH_LOGOUT
});

export const checkAuthTimeout = expirationTime => dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    // Authenticate
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";
    }
    const params = {
      key: FIREBASE_API_KEY
    };
    axios
      .post(url, authData, { params })
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        console.error(err.response.data.error);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path
})
