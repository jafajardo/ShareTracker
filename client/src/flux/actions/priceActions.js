import axios from "axios";
import { GET_PRICE, GET_PRICES_FOR_CHART } from "../actions/types";
import { tokenConfig } from "./authActions";
import { ENDPOINT, PORT } from "./backend";

export const getPrice = symbol => (dispatch, getState) => {
  axios
    .get(`http://${ENDPOINT}:${PORT}/api/prices/${symbol}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_PRICE,
        payload: {
          shareSymbol: symbol,
          shareData: res.data.chart.result[0].meta
        }
      });
    })
    .catch(err => console.log(err));
};

export const getPricesForChart = (symbol, days) => (dispatch, getState) => {
  axios
    .get(`http://${ENDPOINT}:${PORT}/api/prices/${symbol}/${days}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_PRICES_FOR_CHART,
        payload: {
          shareSymbol: symbol,
          days: days,
          timeStamps: res.data.chart.result[0].timestamp,
          closePrices: res.data.chart.result[0].indicators.quote[0].close
        }
      });
    })
    .catch(err => console.log(err));
};
