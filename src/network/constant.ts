export const TOKEN_NAME = "ASTRA_TOKEN" as const;
export const USER_PROFILE = "USER_PROFILE" as const;
export const EMAIL = "EMAIL" as const;
export const PASSWORD_RESET_TOKEN = "PASSWORD_RESET_TOKEN" as const;
export const API_URL = "http://13.51.197.147:3000/" as const;

const SIGNUP = "auth/register/brand";
const VERIFY_OTP = "auth/otp-verification" as const;
const RESEND_OTP = "auth/resend-otp";
const LOGIN = "auth/login" as const;
const GENERATE_DESIGN = "design/create-design";
const GET_USER_INFO = "user/self";
const ADD_CREATOR = "design/add-creator";
const ADDITIONAL_INFO = "design/additional-information";
const CREATE_JOB = "job/create-job";
const GET_JOBS = "job/get-job";
const GET_USER_INFO_QUERY = "GET_USER_INFO_QUERY" as const;
const GET_JOBS_QUERY = "GET_JOBS_QUERY" as const;

export const Endpoints = {
  CREATE_JOB,
  SIGNUP,
  VERIFY_OTP,
  LOGIN,
  RESEND_OTP,
  GENERATE_DESIGN,
  GET_USER_INFO,
  ADD_CREATOR,
  ADDITIONAL_INFO,
  GET_JOBS,
};

export const Query = { GET_USER_INFO_QUERY, GET_JOBS_QUERY };
