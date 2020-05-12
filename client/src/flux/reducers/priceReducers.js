import { GET_PRICE, GET_PRICES_FOR_CHART } from "../actions/types";

const initialState = {
  prices: [],
  pricesForChart: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRICE: {
      let pricesState;
      const index = state.prices.findIndex(
        item => item.shareSymbol === action.payload.shareSymbol
      );
      if (index > -1) {
        pricesState = [
          ...state.prices.slice(0, index),
          ...state.prices.slice(index + 1, state.prices.length),
          action.payload
        ];
      } else {
        pricesState = [...state.prices, action.payload];
      }

      return {
        ...state,
        prices: [...pricesState]
      };
    }
    case GET_PRICES_FOR_CHART: {
      let pricesForChartState;
      const index = state.pricesForChart.findIndex(
        item =>
          item.shareSymbol === action.payload.shareSymbol &&
          item.days === action.payload.days
      );
      if (index > -1) {
        pricesForChartState = [
          ...state.pricesForChart.slice(0, index),
          ...state.pricesForChart.slice(index + 1, state.pricesForChart.length),
          action.payload
        ];
      } else {
        pricesForChartState = [...state.pricesForChart, action.payload];
      }

      return {
        ...state,
        pricesForChart: [...pricesForChartState]
      };
    }
    default:
      return state;
  }
}
