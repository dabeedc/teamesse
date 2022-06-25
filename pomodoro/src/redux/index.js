import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/account";
import timerReducer from "./slices/timer";

export const reducer = combineReducers({
  account: userReducer,
  timer: timerReducer,
});
