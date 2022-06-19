import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./account";

export const reducer = combineReducers({
  account: userReducer,
});
