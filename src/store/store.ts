import { configureStore } from "@reduxjs/toolkit";

import userAuthReducer from "./auth/authSlice";
import searchReducer from "./search/searchSlice";
import searchToggleReducer from "./searchToggle/searchToggleSlice";

import { authApi } from "./api/authapi/auth.api";
import { bookApi } from "./api/bookapi/book.api";

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    search: searchReducer,
    searchToggle: searchToggleReducer,
    [authApi.reducerPath]: authApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApi.middleware,
      bookApi.middleware
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
