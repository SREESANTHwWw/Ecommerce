import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CartApi = createApi({
  reducerPath: "cartApi",

  tagTypes: ["Cart"], 

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
  
    getAllCart: builder.query<any, void>({
      query: () => "/getAllcart",
      providesTags: ["Cart"], 
    }),

    
    addToCart: builder.mutation<any, { productId: string; qty: number }>({
      query: (data) => ({
        url: "/cart/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"], 
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetAllCartQuery,
} = CartApi;
