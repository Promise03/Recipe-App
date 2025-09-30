import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get authenticated or logged in user
const user = JSON.parse(localStorage.getItem("user"));

// get initial states
const initialState = {
  user: user || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// Register slice function
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkApi) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/register-user",
        userData
      );
      return res.data.userDetails; // Only return user details
    } catch (e) {
      const message =
        e.response?.data?.message || e.message || "Registration failed!";
      return thunkApi.rejectWithValue(message);
    }
  }
);

// create authSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
    clearAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null; // prevent stale user data
      });
  },
});

export const { clearAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
