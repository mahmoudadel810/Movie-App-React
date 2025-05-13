// features/auth/authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../API/FetchData";

const initialState = {
  isAdmin: api.checkIfAdminLogged(),
  loading: false,
  error: null,
};

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (password) => {
    const isAuthenticated = await api.checkAdminPassword(password);
    if (!isAuthenticated) {
      throw new Error("Invalid admin password");
    }
    return isAuthenticated;
  }
);

export const logoutAdmin = createAsyncThunk("auth/logoutAdmin", async () => {
  api.handleSignOutAdmin();
});
export const selectIsAdmin = (state) => state.auth.isAdmin;
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAdminSession: (state) => {
      state.isAdmin = api.checkIfAdminLogged();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state) => {
        state.loading = false;
        state.isAdmin = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.isAdmin = false;
      });
  },
});

export const { checkAdminSession } = authSlice.actions;
export default authSlice.reducer;
