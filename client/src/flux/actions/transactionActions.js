import {
  GET_TRANSACTIONS,
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  TOGGLE_LOADING
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { ENDPOINT, PORT } from "./backend";

const URL = `http://${ENDPOINT}:${PORT}/api/transactions`;

export const getTransactions = () => (dispatch, getState) => {
  toggleLoading();

  axios
    .get(URL, tokenConfig(getState))
    .then(response => {
      dispatch({
        type: GET_TRANSACTIONS,
        payload: response.data
      });
    })
    .catch(err => console.log(err));

  toggleLoading();
};

export const addTransaction = transaction => (dispatch, getState) => {
  axios
    .post(URL, transaction, tokenConfig(getState))
    .then(response => {
      dispatch({
        type: ADD_TRANSACTION,
        payload: response.data
      });
    })
    .catch(err => console.log(err));
};

export const deleteTransaction = id => (dispatch, getState) => {
  axios.delete(`${URL}/${id}`, tokenConfig(getState)).then(response => {
    dispatch({
      type: DELETE_TRANSACTION,
      payload: id
    });
  });
};

export const toggleLoading = () => {
  return {
    type: TOGGLE_LOADING
  };
};
