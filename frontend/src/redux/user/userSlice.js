import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      state.loading = false;
      state.error = false;
      state.accessToken = action.payload.accessToken;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
      state.accessToken = null;
    },
  },
});



export const {
    signInStart,
    signInSuccess,
    signInFailure,
    signOut,
  } = userSlice.actions;
  
  export default userSlice.reducer;