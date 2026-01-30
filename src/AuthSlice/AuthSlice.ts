import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const AuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    loginSlice: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.isAuthenticated = true;

      localStorage.setItem("token", state.token ?? "");
      localStorage.setItem("userId", state.userId ?? "");
    },

    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});

export const { loginSlice, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
