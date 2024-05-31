// src/redux/slices/userAuthorSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for login
export const userAuthorLoginThunk = createAsyncThunk(
  'user-author-login',
  async (userCredObj, thunkApi) => {
    try {
      let res;
      if (userCredObj.userType === 'user') {
        res = await axios.post('http://localhost:4000/user-api/login', userCredObj);
      } else if (userCredObj.userType === 'author') {
        res = await axios.post('http://localhost:4000/author-api/login', userCredObj);
      } else {
        return thunkApi.rejectWithValue('Invalid user type');
      }

      if (res.data.message === 'login success') {
        localStorage.setItem("token", res.data.token);
        return res.data;
      } else {
        return thunkApi.rejectWithValue(res.data.message);
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const userAuthorSlice = createSlice({
  name: "user-author-login",
  initialState: {
    isPending: false,
    loginUserStatus: false,
    currentUser: {},
    errorOccurred: false,
    errMsg: ''
  },
  reducers: {
    resetState: (state) => {
      state.isPending = false;
      state.loginUserStatus = false;
      state.currentUser = {};
      state.errorOccurred = false;
      state.errMsg = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAuthorLoginThunk.pending, (state) => {
        state.isPending = true;
      })
      .addCase(userAuthorLoginThunk.fulfilled, (state, action) => {
        state.isPending = false;
        state.currentUser = action.payload.user;
        state.loginUserStatus = true;
        state.errMsg = '';
        state.errorOccurred = false;
      })
      .addCase(userAuthorLoginThunk.rejected, (state, action) => {
        state.isPending = false;
        state.currentUser = {};
        state.loginUserStatus = false;
        state.errMsg = action.payload;
        state.errorOccurred = true;
      });
  }
});

export const { resetState } = userAuthorSlice.actions;
export default userAuthorSlice.reducer;
