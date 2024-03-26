import {
  BaseQueryFn,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { BACKEND_BASE_URL } from "./config";
import { RootState } from "../store/store";
import { FetchArgs } from "@reduxjs/toolkit/query";
import { UserAuthData } from "./interfaces/auth.interface";
import { logout, setUser } from "../store/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const user = (getState() as RootState).userAuth;

    if (user && user.isLoggedIn) {
      headers.set("Authorization", `Bearer ${user.token}`);
    }
    headers.set("Content-Type", "application/json");
    headers.set("Access-Control-Allow-Origin", "http://localhost:5174");
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    try {
      const { data, error } = await baseQueryUserAuth(
        "user/token",
        api,
        extraOptions
      );

      if (!error && data) {
        const newUserAuthData: UserAuthData = {
          isLoggedIn: true,
          ...data,
        } as UserAuthData;

        api.dispatch(setUser(newUserAuthData));

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } catch (error) {
      console.log(error);
    }
  }
  return result;
};

const baseQueryUserAuth = fetchBaseQuery({
  baseUrl: BACKEND_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const user = (getState() as RootState).userAuth;

    if (user && user.isLoggedIn) {
      headers.set("Authorization", `Bearer ${user.refreshToken}`);
    }

    headers.set("Content-Type", "application/json");
    headers.set("Access-Control-Allow-Origin", "http://localhost:5174");
    return headers;
  },
});

export { baseQuery, baseQueryWithReauth, baseQueryUserAuth };
