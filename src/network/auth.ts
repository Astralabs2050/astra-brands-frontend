import API, { BaseResponse } from "./API";
import { Endpoints } from "./constant";

export interface SignUpRequest {
  email: string;
  password: string;
  username: string;
}

export interface VerifyOtpRequest {
  otp: string;
  email: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}
export interface ResendOtpRequest {
  email: string;
}
export const signup = async (
  payload: SignUpRequest
): Promise<BaseResponse<unknown>> => {
  return API.post<SignUpRequest, unknown>(Endpoints.SIGNUP, payload);
};

export const verifyOTP = async (
  payload: VerifyOtpRequest
): Promise<BaseResponse<unknown>> => {
  return API.post<VerifyOtpRequest, unknown>(Endpoints.VERIFY_OTP, payload);
};

export const login = async (
  payload: SignInRequest
): Promise<BaseResponse<unknown>> => {
  return API.post<SignInRequest, unknown>(Endpoints.LOGIN, payload);
};

export const resendOtp = async (
  payload: ResendOtpRequest
): Promise<BaseResponse<unknown>> => {
  return API.post<ResendOtpRequest, unknown>(Endpoints.RESEND_OTP, payload);
};
