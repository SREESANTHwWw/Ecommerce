import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
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
    getMe: builder.query<any, void>({
      query: () => "/users/me",
      providesTags: ["User"],
    }),

    getAllUsers: builder.query<any, void>({
      query: () => "/users",
      providesTags: ["User"],
    }),

    getUserById: builder.query<any, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),

    
    updateMe: builder.mutation<any, Partial<{
      firstname: string;
      lastname: string;
      username: string;
    }>>({
      query: (body) => ({
        url: "/users/edit",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});


export const {
  useGetMeQuery,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateMeMutation,
} = userApi;
