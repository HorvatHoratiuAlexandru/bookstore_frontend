import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../../common/utils";
import { UserDataRes } from "../../../common/interfaces/responses/user.res.interface";
import { BACKEND_BASE_URL } from "../../../common/config";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUserById: builder.query<UserDataRes, string>({
      query: (userUid) => {
        return BACKEND_BASE_URL + "user/" + userUid;
      },
    }),
  }),
});

export const { useGetUserByIdQuery } = userApi;
