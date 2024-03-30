import { configureStore } from "@reduxjs/toolkit";

import userAuthReducer from "./auth/authSlice";
import searchReducer from "./search/searchSlice";
import searchToggleReducer from "./searchToggle/searchToggleSlice";
import cartDataReducer from "./shoppingcart/shoppingcartSlice";

import { authApi } from "./api/authapi/auth.api";
import { bookApi } from "./api/bookapi/book.api";
import { reviewApi } from "./api/reviewapi/review.api";
import { userApi } from "./api/userapi/user.api";

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    search: searchReducer,
    searchToggle: searchToggleReducer,
    cartData: cartDataReducer,
    [authApi.reducerPath]: authApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApi.middleware,
      bookApi.middleware,
      reviewApi.middleware,
      userApi.middleware
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
