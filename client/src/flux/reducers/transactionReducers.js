import { GET_TRANSACTIONS, ADD_TRANSACTION, DELETE_TRANSACTION, TOGGLE_LOADING } from '../actions/types';

const initialState = {
  isLoading: false,
  shareHoldings: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS: {
      return {
        ...state,
        shareHoldings: action.payload
      }
    }
    case ADD_TRANSACTION: {
      return {
        ...state,
        shareHoldings: [...state.shareHoldings, action.payload]
      }
    }
    case DELETE_TRANSACTION: {
      return {
        ...state,
        shareHoldings: state.shareHoldings.filter(share => share._id !== action.payload)
      }
    }
    case TOGGLE_LOADING: {
      return {
        ...state,
        isLoading: !state.isLoading
      }
    }
    default:
      return state;
  }
}