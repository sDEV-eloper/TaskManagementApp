import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  email: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  email: null,
};

interface AuthPayload {
  token: string;
  email: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthPayload>) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('email', action.payload.email);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.email = null;
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    },
    checkAuth(state) {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
      if (token && email) {
        state.isLoggedIn = true;
        state.token = token;
        state.email = email;
      } else {
        state.isLoggedIn = false;
        state.token = null;
        state.email = null;
      }
    },
  },
});

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
