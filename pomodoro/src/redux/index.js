import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/account";

export const reducer = combineReducers({
  account: userReducer,
});
