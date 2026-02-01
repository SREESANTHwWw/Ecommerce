import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AddressesApi = createApi({
  reducerPath: "AddressesApi",
  tagTypes: ["Address"],
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
  endpoints: (build) => ({
    
    addAddress: build.mutation<any, any>({
      query: (data) => ({
        url: "/address/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Address"],
    }),


    getAddress: build.query<any, void>({
      query: () => "/address/all",
      providesTags: ["Address"],
    }),

 
    defaultAddress: build.query<any, void>({
      query: () => "/address/default",
      providesTags: ["Address"],
    }),

 
    updateAddress: build.mutation<
      any,
      { id: string; body: any }
    >({
      query: ({ id, body }) => ({
        url: `/address/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useAddAddressMutation,
  useGetAddressQuery,
  useDefaultAddressQuery,
  useUpdateAddressMutation,
} = AddressesApi;
