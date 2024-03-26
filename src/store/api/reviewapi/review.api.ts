import { createApi } from "@reduxjs/toolkit/query/react";
import { ReviewDataReq } from "../../../common/interfaces/requests/review.req.interface";
import { ReviewDataRes } from "../../../common/interfaces/responses/review.res.interface";

import { baseQueryWithReauth } from "../../../common/utils";

type postQuery = {
  bookId: number;
  form: ReviewDataReq;
};

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getReviews: builder.query<ReviewDataRes[], number>({
      query: (bookId) => {
        return "book/" + bookId + "/review";
      },
    }),
    postReview: builder.mutation<ReviewDataRes[], postQuery>({
      query: ({ bookId, form }) => ({
        url: "book/" + bookId + "/review",
        method: "POST",
        body: form,
      }),
    }),
    updateReview: builder.mutation<ReviewDataRes[], postQuery>({
      query: ({ bookId, form }) => ({
        url: "book/" + bookId + "/review",
        method: "PUT",
        body: form,
      }),
    }),
    deleteReview: builder.mutation<ReviewDataRes[], number>({
      query: (bookId) => ({
        url: "book/" + bookId + "/review",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetReviewsQuery,
  usePostReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
