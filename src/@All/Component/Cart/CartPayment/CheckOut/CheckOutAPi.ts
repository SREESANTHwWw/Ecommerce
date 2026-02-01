import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CheckOutapi = createApi({
  reducerPath: "CheckOutapi",
  tagTypes: ["Order"],
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

    // 1️⃣ Create Razorpay Order
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/create",
        method: "POST",
        body: data,
      }),
    }),

    // 2️⃣ Verify Razorpay Payment
    verifyPayment: builder.mutation({
      query: (data) => ({
        url: "/order/verify-payment",
        method: "POST",
        body: data,
      }),
    }),

  }),
});

export const {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
} = CheckOutapi;
