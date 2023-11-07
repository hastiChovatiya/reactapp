import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("user");

const initialState = user
  ? {
      loggedIn: false,
      user: user,
    }
  : { loggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register(state, action) {
      state.loggedIn = true;
      state.user = action.payload;
    },
    login(state, action) {
      state.loggedIn = true;
      state.user = action.payload;
    },
    logout(state, action) {
      state.loggedIn = false;
      state.user = null;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
