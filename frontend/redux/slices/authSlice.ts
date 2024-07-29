import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import axiosInstance from '../../utils/axiosInstance';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const login = (email: string, password: string): AppThunk => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    dispatch(loginSuccess(response.data.token));
  } catch (error) {
    console.error(error);
  }
};

export const signup = (email: string, password: string): AppThunk => async (dispatch) => {
  try {
    await axiosInstance.post('/auth/signup', { email, password });
    dispatch(login(email, password));
  } catch (error) {
    console.error(error);
  }
};

export default authSlice.reducer;
