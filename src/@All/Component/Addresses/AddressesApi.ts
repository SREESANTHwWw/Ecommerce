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
  endpoints: (builder) => ({
    addAddress: builder.mutation<any, any>({
      query: (data) => ({
        url: "/address/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Address"],
    }),

    getAddress: builder.query<any, void>({
      query: () => "/address/all",
      providesTags: ["Address"],
    }),

    defaultAddress: builder.query<any, void>({
      query: () => "/address/default",
      providesTags: ["Address"],
    }),

    getUserAddresses: builder.query<any, void>({
      query: () => "/address/user",
      providesTags: ["Address"],
    }),

    updateAddress: builder.mutation<any, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/address/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Address"],
    }),

  
    deleteAddress: builder.mutation<any, string>({
      query: (id) => ({
        url: `/address/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useAddAddressMutation,
  useGetAddressQuery,
  useGetUserAddressesQuery,
  useDefaultAddressQuery,
    useDeleteAddressMutation,
  useUpdateAddressMutation,
} = AddressesApi;
