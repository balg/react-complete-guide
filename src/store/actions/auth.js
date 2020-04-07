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

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

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
    const storeToken = ({ idToken, expiresIn, localId }) => {
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      localStorage.setItem("token", idToken);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", localId);
    };
    axios
      .post(url, authData, { params })
      .then(response => {
        storeToken(response.data);
        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        console.error(err.response.data.error);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path
});

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem("userId");
        dispatch(
          authSuccess({
            idToken: token,
            localId: userId
          })
        );
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
