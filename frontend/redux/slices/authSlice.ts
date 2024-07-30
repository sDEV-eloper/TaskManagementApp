import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('token');
    },
    checkAuth(state) {
      const token = localStorage.getItem('token');
      if (token) {
        state.isLoggedIn = true;
        state.token = token;
      } else {
        state.isLoggedIn = false;
        state.token = null;
      }
    },
  },
});

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
