import { createApi } from "@reduxjs/toolkit/query/react";
import { registerDataReq } from "../../../common/interfaces/requests/register.req.interface";
import { registerDataRes } from "../../../common/interfaces/responses/register.res.interface";
import { loginDataReq } from "../../../common/interfaces/requests/login.req.interface";
import { loginDataRes } from "../../../common/interfaces/responses/login.res.interface";
import { baseQueryWithReauth } from "../../../common/utils";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    postRegister: builder.mutation<registerDataRes, registerDataReq>({
      query: (form) => ({
        url: "user/" + "register",
        method: "POST",
        body: form,
      }),
    }),
    //login
    postLogin: builder.mutation<loginDataRes, loginDataReq>({
      query: (form) => ({
        url: "user/" + "login",
        method: "POST",
        body: form,
      }),
    }),
    postRefreshToken: builder.mutation<loginDataRes, void>({
      query: () => ({
        url: "user/" + "token",
        method: "GET",
      }),
    }),
  }),
});

export const {
  usePostRegisterMutation,
  usePostLoginMutation,
  usePostRefreshTokenMutation,
} = authApi;
