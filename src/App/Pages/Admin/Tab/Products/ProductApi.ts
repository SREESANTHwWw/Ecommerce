import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductCreateType, ProductResponseType } from "./Types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),

  tagTypes: ["Product"],
  endpoints: (build) => ({
    createProduct: build.mutation<ProductResponseType, ProductCreateType>({
      query: (formData) => ({
        url: "/product/add",
        method: "POST",
        body: formData,
      }),
    }),

    getAllProducts: build.query<any, void>({
      query: () => ({
        url: "/product/get",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    getProductById: build.query<any, string>({
      query: (id) => ({
        url: `/product/get/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    removeProduct: build.mutation<any, string>({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    ReOrderingProduct: build.mutation<any, any>({
      query: (data) => ({
        url: `/product/ordering`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    productFilter: build.query<
      any,
      {
        category?: string[];
        minPrice?: number;
        maxPrice?: number;
        minDiscount?: number;
        maxDiscount?: number;
        search?: string;
        sort?: string;
        order?: "asc" | "desc";
        page?: number;
        limit?: number;
      }
    >({
      query: (params) => ({
        url: "/product/filter",
        method: "GET",
        params,
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useRemoveProductMutation,
  useReOrderingProductMutation,
  useProductFilterQuery,
} = productApi;
