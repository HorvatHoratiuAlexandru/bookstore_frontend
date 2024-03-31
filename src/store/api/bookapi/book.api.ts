import { createApi } from "@reduxjs/toolkit/query/react";
import { bookData } from "../../../common/interfaces/responses/book.res.interface";
import { baseQueryWithReauth } from "../../../common/utils";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: baseQueryWithReauth,
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
    getSearchBooks: builder.query<bookData[], string>({
      query: (searchText) => {
        return `/book/search?search=${searchText}`;
      },
    }),
    getBook: builder.query<bookData, number>({
      query: (bookId) => {
        return "book/" + bookId;
      },
    }),
  }),
});

export const { useGetBooksQuery, useLazyGetSearchBooksQuery, useGetBookQuery } =
  bookApi;
