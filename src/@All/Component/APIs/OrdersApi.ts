import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OrderApi = createApi({
  reducerPath: "OrderApi",
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
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getAllOrder: builder.query<
      any,
      {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        date?: string;
        priceRange?: string;
        paymentMethods?: string;
        paymentStatus?: string;
      }
    >({
      query: ({
        page = 1,
        limit = 10,
        search,
        status,
        date,
        priceRange,
        paymentMethods,
        paymentStatus,
      }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (search) params.append("search", search);
        if (status) params.append("status", status);
        if (date) params.append("date", date); // format: "YYYY-MM-DD,YYYY-MM-DD"
        if (priceRange) params.append("priceRange", priceRange); // format: "min,max"
        if (paymentMethods) params.append("paymentMethod", paymentMethods); // format: "paymentMethod"
        if (paymentStatus) params.append("paymentStatus", paymentStatus); // format: "paymentStatus"
        return `/order/getAll?${params.toString()}`;
      },
      providesTags: ["Order"],
    }),

    getOrderByid: builder.query<any, string>({
      query: (id) => `/order/get/${id}`,
      providesTags: ["Order"],
    }),

    updateOrderStatus: builder.mutation<
      any,
      { id: string; orderStatus: string }
    >({
      query: ({ id, orderStatus }) => ({
        url: `/order/update/status/${id}`,
        method: "PATCH",
        body: { orderStatus },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useGetAllOrderQuery, useGetOrderByidQuery , useUpdateOrderStatusMutation} = OrderApi;
