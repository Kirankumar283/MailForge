import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import templateReducer from './slices/templateSlice';
import contactReducer from './slices/contactSlice';
import localStorageMiddleware from './localStorageMiddleware';

const store = configureStore({
  reducer: {
    auth: authReducer,
    templates: templateReducer,
    contacts: contactReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
