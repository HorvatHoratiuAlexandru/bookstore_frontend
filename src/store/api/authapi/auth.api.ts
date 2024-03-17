import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { registerDataReq } from "../../../common/interfaces/requests/register.req.interface";
import { BACKEND_BASE_URL } from "../../../common/config";
import { registerDataRes } from "../../../common/interfaces/responses/register.res.interface";
import { loginDataReq } from "../../../common/interfaces/requests/login.req.interface";
import { loginDataRes } from "../../../common/interfaces/responses/login.res.interface";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Access-Control-Allow-Origin", "http://localhost:5174");
      return headers;
    },
  }),
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
  }),
});

export const { usePostRegisterMutation, usePostLoginMutation } = authApi;
