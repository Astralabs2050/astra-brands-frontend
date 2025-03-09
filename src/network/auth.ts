import API, { BaseResponse } from "./API";
import { Endpoints } from "./constant";

export interface SignUpRequest {
  email: string;
  password: string;
  username: string;
  country: string;
  city: string;
}

export interface VerifyOtpRequest {
  otp: string;
  email: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}
export interface SignInResponse {
  id: string;
  email: string;
  verified: boolean;
  active: boolean;
  lastseen: string | null;
  isAdmin: boolean;
  userType: string | null;
  createdAt: string;
  updatedAt: string;
  token: string;
}
export interface ResendOtpRequest {
  email: string;
}

interface BrandDetails {
  id: string;
  email: string;
  verified: boolean;
  active: boolean;
  lastseen: string | null;
  otp: string;
  isAdmin: boolean;
  userType: string | null;
  createdAt: string;
  updatedAt: string;
  creator: string | null;
  brand: {
    id: string;
    username: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
  media: string[]; // Adjust type if you have more details about media structure
}

export interface ResendOtpRequest {
  email: string;
}
interface ResetPasswordRequest {
  otp: string;
  email: string;
  password: string;
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
): Promise<BaseResponse<SignInResponse>> => {
  return API.post<SignInRequest, SignInResponse>(Endpoints.LOGIN, payload);
};

export const resendOtp = async (
  payload: ResendOtpRequest
): Promise<BaseResponse<unknown>> => {
  return API.post<ResendOtpRequest, unknown>(Endpoints.RESEND_OTP, payload);
};

export const getUserDetails = async (): Promise<BaseResponse<BrandDetails>> => {
  return API.get<BrandDetails>(Endpoints.GET_USER_INFO);
};

export const forgotPassword = async (
  payload: ResendOtpRequest
): Promise<BaseResponse<unknown>> => {
  return API.post<ResendOtpRequest, unknown>(
    Endpoints.FORGOT_PASSWORD,
    payload
  );
};

export const resetPassword = async (
  payload: ResetPasswordRequest
): Promise<BaseResponse<unknown>> => {
  return API.patch<ResetPasswordRequest, unknown>(
    Endpoints.RESET_PASSWORD,
    payload
  );
};
