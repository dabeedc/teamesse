import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: "time",
  initialState: {
    focusMode: false,
    timeLeft: 0,
  },
  reducers: {
    setFocusMode(state, action) {
      state.focusMode = action.payload;
    },
    setSessionTimeLeft(state, action) {
      state.timeLeft = action.payload;
    },
  },
});

export const { setFocusMode, setSessionTimeLeft } = timerSlice.actions;
export default timerSlice.reducer;
