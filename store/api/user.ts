import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { User } from "../../types/user";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/user/`,
  }),
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => ({ url: "gel-all" }),
    }),
    getUserById: builder.query<User, string>({
      query: (userId) => ({ url: `get-by-id?id=${userId}` }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllUsersQuery, useGetUserByIdQuery } = userApi;
