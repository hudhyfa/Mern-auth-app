import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdminLogged: false,
  loading: false,
  error: "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logInStart: (state) => {
      state.loading = true;
    },
    logInSuccess: (state) => {
      state.isAdminLogged = true;
      state.loading = false;
    },
    logInFailure: (state, action) => {
      state.loading = false;
      state.errorStatus = true;
    },
  },
});

export const { logInStart, logInSuccess, logInFailure } = adminSlice.actions;
export default adminSlice.reducer;
