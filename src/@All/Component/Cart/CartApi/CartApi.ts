import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


 export type deleteSavelaterTypeResponse = {
      success:boolean,
      msg:string
}



export const CartApi = createApi({
  reducerPath: "cartApi",

  tagTypes: ["Cart", "Savelater"],

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
    updateQty: builder.mutation<any, { productId: string; qty: number }>({
      query: ({ productId, qty }) => ({
        url: `/cart/update/qty/${productId}`,
        method: "PATCH",
        body: { qty },
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCart: builder.mutation<any, string>({
      query: (id) => ({
        url: `/cart/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    createSavelater: builder.mutation<any, any>({
      query: (data) => ({
        url: "/savelater/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart", "Savelater"],
    }),
    getSavelater: builder.query<any, void>({
      query: () => "/savelater",
      providesTags: ["Savelater"],
    }),
    moveToCart: builder.mutation<any, any>({
      query: (data) => ({
        url: "/savelater/move-to-cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart", "Savelater"],
    }),
    checkstock: builder.mutation<any, any>({
      query: (data) => ({
        url: "/cart/check-stock",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Cart"],
    }),

    deleteSavelater: builder.mutation<deleteSavelaterTypeResponse, string>({
      query: (id) => ({
        url: `/savelater/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Savelater"],
    })

  }),
});

export const {
  useAddToCartMutation,
  useGetAllCartQuery,
  useUpdateQtyMutation,
  useDeleteCartMutation,
  useCreateSavelaterMutation,
  useGetSavelaterQuery,
  useMoveToCartMutation,
  useCheckstockMutation,
  useDeleteSavelaterMutation
} = CartApi;
