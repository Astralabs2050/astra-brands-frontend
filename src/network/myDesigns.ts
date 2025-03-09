import API, { BaseResponse } from "./API";
import { Endpoints } from "./constant";

interface Job {
  id: string;
  description: string;
  timeline: string;
  status: boolean;
  manufacturer: boolean;
  userId: string;
  designId: string;
  createdAt: string;
  updatedAt: string;
  design: Design;
}

interface Design {
  id: string;
  outfitName: string;
  pieceNumber: number;
  prompt: string;
  publicKey: string | null;
  creatorType: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  budget: number;
  media: Media[];
}

interface Media {
  id: string;
  link: string;
  mediaType: string;
  userId: string | null;
  designId: string;
  projectId: string | null;
  pieceId: string | null;
  createdAt: string;
  updatedAt: string;
}
interface JobApplicant {
  id: string;
  jobId: string;
  userId: string;
  amount: number;
  status: boolean;
  negotiation: boolean;
  minAmount: number;
  createdAt: string;
  updatedAt: string;
  user: User;
}

interface User {
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
  creator: Creator;
  brand: null;
}

interface Creator {
  id: string;
  userId: string;
  fullName: string;
  location: string;
  category: string[];
  skills: string[];
  creatorType: string;
  createdAt: string;
  updatedAt: string;
}

interface AcceptOrRejectRequest {
  jobApplicationId: string;
  status: boolean;
}

interface SingleJobApplicant {
  id: string;
  jobId: string;
  userId: string;
  amount: number;
  status: boolean;
  negotiation: boolean;
  wallet: string;
  minAmount: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    password: null | string;
    verified: boolean;
    active: boolean;
    lastseen: null | string;
    otp: string;
    isOtpVerified: null | string;
    otpCreatedAt: null | string;
    isOtpExp: null | string;
    isAdmin: boolean;
    userType: null | string;
    createdAt: string;
    updatedAt: string;
    creator: {
      id: string;
      userId: string;
      fullName: string;
      location: string;
      category: string[];
      skills: string[];
      creatorType: string;
      createdAt: string;
      updatedAt: string;
    };
    brand: null;
  };
}

interface JobStatusUpdateReq {
  jobId: string;
  status: string;
  escorowId: string;
}

export const getJobs = async (): Promise<BaseResponse<Job[]>> => {
  return API.get<Job[]>(Endpoints.GET_JOBS);
};

export const getApplicants = async (
  id: string
): Promise<BaseResponse<JobApplicant[]>> => {
  return API.get<JobApplicant[]>(`${Endpoints.VIEW_APPLICANTS}?jobId=${id}`);
};

export const getSingleApplicant = async (
  jobId: string,
  userId: string
): Promise<BaseResponse<SingleJobApplicant>> => {
  return API.get<SingleJobApplicant>(
    `${Endpoints.VIEW_SINGLE_APPLICANT}jobId=${jobId}&userId=${userId}`
  );
};

export const acceptOrReject = async (
  payload: AcceptOrRejectRequest
): Promise<BaseResponse<unknown>> => {
  return API.patch<AcceptOrRejectRequest, unknown>(
    Endpoints.ACCEPT_OR_REJECT,
    payload
  );
};

export const updateStatus = async (
  payload: JobStatusUpdateReq
): Promise<BaseResponse<unknown>> => {
  return API.patch<JobStatusUpdateReq, unknown>(
    Endpoints.UPDATE_JOB_STATUS,
    payload
  );
};
