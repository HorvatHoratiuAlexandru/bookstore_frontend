import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../../common/utils";
import {
  GetOrdersDataRes,
  PlaceOrderDataRes,
} from "../../../common/interfaces/responses/order.res.interface";
import { BACKEND_BASE_URL } from "../../../common/config";
import {
  PayOrderDataReq,
  PlaceOrderDataReq,
} from "../../../common/interfaces/requests/order.req.interface";

interface PlaceOrderRequestParam {
  body: PlaceOrderDataReq;
  userUid: string;
}

interface PayOrderRequestParam {
  body: PayOrderDataReq;
  userUid: string;
  orderId: number;
}

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["order"],
  endpoints: (builder) => ({
    getOrders: builder.query<GetOrdersDataRes[], string>({
      query: (userUid) => {
        return BACKEND_BASE_URL + "user/" + userUid + "/orders";
      },
      providesTags: [{ type: "order", id: 1 }],
    }),
    placeOrder: builder.mutation<PlaceOrderDataRes, PlaceOrderRequestParam>({
      query: ({ body, userUid }) => ({
        url: BACKEND_BASE_URL + "user/" + userUid + "/orders",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: "order", id: 1 }],
    }),
    payOrder: builder.mutation<PlaceOrderDataRes, PayOrderRequestParam>({
      query: ({ body, userUid, orderId }) => ({
        url:
          BACKEND_BASE_URL +
          "user/" +
          userUid +
          "/orders/" +
          orderId +
          "/process",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: "order", id: 1 }],
    }),
  }),
});

export const { useGetOrdersQuery, usePlaceOrderMutation, usePayOrderMutation } =
  orderApi;
