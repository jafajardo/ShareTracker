import { combineReducers } from "redux";
import transactionReducers from "./transactionReducers";
import priceReducers from "./priceReducers";
import authReducers from "./authReducers";

export default combineReducers({
  transaction: transactionReducers,
  price: priceReducers,
  auth: authReducers
});
