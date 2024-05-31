// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userAuthorSlice from './slices/userAuthorSlice';

export const store = configureStore({
  reducer: {
    userAuthorLogin: userAuthorSlice
  }
});
