import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(e => {
      dispatch({ type: AUTH_ERROR });
    });
};

export const register = ({ name, email, password }) => (dispatch, getState) => {
  // TODO: error actions

  axios
    .post(
      "/api/auth/register",
      { name, email, password },
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(e => {
      dispatch({ type: REGISTER_FAIL });
    });
};

export const login = ({ email, password }) => (dispatch, getState) => {
  //TODO: error actions
  axios
    .post("/api/auth/login", { email, password }, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(e => {
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS
  });
};

export const tokenConfig = getState => {
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
