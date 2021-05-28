import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    isAdmin(state, action) {
      state.isAdmin = action.payload.isAdmin;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice;