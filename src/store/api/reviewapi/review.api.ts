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
  tagTypes: ["reviews"],
  endpoints: (builder) => ({
    getReviews: builder.query<ReviewDataRes[], number>({
      query: (bookId) => {
        return "book/" + bookId + "/review";
      },
      providesTags: [{ type: "reviews", id: 1 }],
    }),
    postReview: builder.mutation<ReviewDataRes[], postQuery>({
      query: ({ bookId, form }) => ({
        url: "book/" + bookId + "/review",
        method: "POST",
        body: form,
      }),
      invalidatesTags: [{ type: "reviews", id: 1 }],
    }),
    updateReview: builder.mutation<ReviewDataRes[], postQuery>({
      query: ({ bookId, form }) => ({
        url: "book/" + bookId + "/review",
        method: "PUT",
        body: form,
      }),
      invalidatesTags: [{ type: "reviews", id: 1 }],
    }),
    deleteReview: builder.mutation<ReviewDataRes[], number>({
      query: (bookId) => ({
        url: "book/" + bookId + "/review",
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "reviews", id: 1 }],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  usePostReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
