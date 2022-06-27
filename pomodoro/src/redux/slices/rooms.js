import { createSlice } from "@reduxjs/toolkit";

const roomsSlice = createSlice({
  name: "time",
  initialState: {
    selectedRoom: null,
    online: false,
    clockState: null,
  },
  reducers: {
    setSelectedRoom(state, action) {
      state.selectedRoom = action.payload;
    },
    setOnline(state, action) {
      state.online = action.payload;
      state.clockState = null;
    },
    setClockState(state, action) {
      state.clockState = action.payload;
    },
  },
});

export const { setSelectedRoom, setOnline, setClockState } = roomsSlice.actions;
export default roomsSlice.reducer;
