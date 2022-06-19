import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../api";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    currentUser: null,
    loading: false,
  },
  reducers: {
    userLogout(state) {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const userLogin = createAsyncThunk(
  "account/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      return await login(username, password);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const { userLogout } = accountSlice.actions;
export default accountSlice.reducer;
