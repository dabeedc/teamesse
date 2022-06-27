import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/account";
import timerReducer from "./slices/timer";
import roomsReducer from "./slices/rooms";

export const reducer = combineReducers({
  account: userReducer,
  timer: timerReducer,
  rooms: roomsReducer,
});
