import { createSlice } from "@reduxjs/toolkit";

const roomsSlice = createSlice({
  name: "time",
  initialState: {
    selectedRoom: null,
    online: false,
  },
  reducers: {
    setSelectedRoom(state, action) {
      state.selectedRoom = action.payload;
    },
    setOnline(state, action) {
      state.online = action.payload;
    },
  },
});

export const { setSelectedRoom, setOnline } = roomsSlice.actions;
export default roomsSlice.reducer;
