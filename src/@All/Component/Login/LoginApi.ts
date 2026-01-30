import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Request type
export type LoginType = {
  email: string;
  password: string;
};

// Response type
export type LoginResponse = {
  token: string;
  sucess: boolean;
  msg: string;
  err: string;
  
};

export type ForgotPasswordType = {
  email: string;
}


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    
  }),
  endpoints: (build) => ({
    login: build.mutation<any, any>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

  sendUserotp:build.mutation<any, any>({
    query: (data) => ({
      url: "/auth/send-otp",
      method: "POST",
      body: data,
    }),
  }),

userOtpVerify:build.mutation<any, any>({
  query: (data) => ({
    url: "/auth/verify-otp",
    method: "POST",
    body: data,
  }),
}),

firstNameChecker:build.mutation<any, any>({
  query: (data) => ({
    url: "/auth/check-name",
    method: "POST",
    body: data,
  }),
}),

register: build.mutation<any, any>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

googleAuthentication: build.mutation<any, any>({
  query: (data) => ({
    url: "/auth/googleAuth",
    method: "POST",
    body: data,
  }),
}),

    forgetPassword: build.mutation<any, any>({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    forgetPasswordsendotp: build.mutation<any, any>({
      query: (data) => ({
        url: "/forgot-password/send-otp",
        method: "POST",
        body: data,
      }),
    }),
    forgetPasswordVerifyotp: build.mutation<any, any>({
      query: (data) => ({
        url: "/forgot-password/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgetPasswordMutation,
  useForgetPasswordsendotpMutation,
  useForgetPasswordVerifyotpMutation,
  useSendUserotpMutation,
  useUserOtpVerifyMutation,
  useGoogleAuthenticationMutation,
  useFirstNameCheckerMutation
} = authApi;
