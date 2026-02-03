import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const HealthApi = createApi({
  reducerPath: "HealthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getHealth: builder.query<any, void>({
  query: () => "/health",
}),
  }),
});

export const { useGetHealthQuery } = HealthApi;
