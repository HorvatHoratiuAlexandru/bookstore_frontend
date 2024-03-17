import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_BASE_URL } from "../../../common/config";
import { bookData } from "../../../common/interfaces/responses/book.res.interface";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Access-Control-Allow-Origin", "http://localhost:5174");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBooks: builder.query<bookData[], string[]>({
      query: (tags) => {
        if (tags.length === 0) {
          return "/book"; // No query parameters
        }

        const queryParams = tags
          .map((tag) => `tags=${encodeURIComponent(tag)}`)
          .join("&");

        return `/book?${queryParams}`;
      },
    }),
  }),
});

export const { useGetBooksQuery } = bookApi;
