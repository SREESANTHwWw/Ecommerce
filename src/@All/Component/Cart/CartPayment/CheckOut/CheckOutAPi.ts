import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CheckOutapi = createApi({
  reducerPath: "CheckOutapi",
  tagTypes: ["User"], 
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({

    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/create",
        method: "POST",
        body: data,
      }),
    }),

    verifyPayment: builder.mutation({
      query: (data) => ({
        url: "/order/verify-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"], 
    }),

  }),
});


export const {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
} = CheckOutapi;
