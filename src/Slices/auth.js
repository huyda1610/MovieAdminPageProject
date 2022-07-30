import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authAPI from "../Services/authAPI";

const initialState = {
  loginAccount: JSON.parse(localStorage.getItem('adminAccount'))
  ? JSON.parse(localStorage.getItem('adminAccount'))
  : null,
  authIsLoading: false,
}
export const accountLogin = createAsyncThunk(
  "auth/accountLogin",
  async (account) => {
    try {
      const data = await authAPI.accountLogin(account);
      return data;
    } catch (error) {
      throw error
    }
  }
);

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers: {
    loginSuccess: (state , {payload}) => {
      localStorage.setItem('accessToken', payload.accessToken);
      localStorage.setItem('adminAccount', JSON.stringify(payload));
    },
    logout: (state) => {
      state.loginAccount = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(accountLogin.pending, (state) => {
      state.authIsLoading = true;
      state.loginAccount = null;
    });
    builder.addCase(accountLogin.fulfilled, (state, { payload }) => {
      state.loginAccount = payload;
      state.authIsLoading = false;
    });
    builder.addCase(accountLogin.rejected, (state) => {
      state.authIsLoading = false;
      state.loginAccount = undefined;
    });
  },
})

export const {loginSuccess, logout} = authSlice.actions;
export default authSlice.reducer;