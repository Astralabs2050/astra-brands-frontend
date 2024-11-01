export const TOKEN_NAME = "ASTRA_TOKEN" as const;
export const EMAIL = "EMAIL" as const;
export const PASSWORD_RESET_TOKEN = "PASSWORD_RESET_TOKEN" as const;
export const API_URL = "http://13.51.197.147:3000/" as const;

const SIGNUP = "auth/register/brand";
const VERIFY_OTP = "auth/otp-verification" as const;
const RESEND_OTP = "auth/resend-otp";
const LOGIN = "auth/login" as const;

export const Endpoints = {
  SIGNUP,
  VERIFY_OTP,
  LOGIN,
  RESEND_OTP,
};

export const Query = {};
