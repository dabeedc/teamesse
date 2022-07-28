import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, signup, getUserStats, updateUser, getPort } from "../api";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    currentUser: null,
    stats: null,
    loading: false,
    port: 3001,
  },
  reducers: {
    userLogout(state) {
      state.currentUser = null;
      alert("Successfully logged out.");
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
      })
      .addCase(userStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(userStats.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.loading = false;
      })
      .addCase(userStats.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchPort.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchPort.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPort.fulfilled, (state, action) => {
        state.port = action.payload.port;
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

export const userSignup = createAsyncThunk(
  "account/signup",
  async (userDetails, { rejectWithValue }) => {
    try {
      return await signup(userDetails);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const userStats = createAsyncThunk("userStats", async () => {
  return await getUserStats();
});

export const updateUserAsync = createAsyncThunk(
  "users/updateUser",
  async (user) => {
    return await updateUser(user);
  }
);

export const fetchPort = createAsyncThunk("account/port", async (user) => {
  return await getPort(user);
});

export const { userLogout } = accountSlice.actions;
export default accountSlice.reducer;
