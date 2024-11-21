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
  jobApplicationId: "e9dbc79e-1f83-4ee5-b5e7-8e5e75c02358";
  status: true;
  negotiation: false;
}

export const getJobs = async (): Promise<BaseResponse<Job[]>> => {
  return API.get<Job[]>(Endpoints.GET_JOBS);
};

export const getApplicants = async (
  id: string
): Promise<BaseResponse<JobApplicant[]>> => {
  return API.get<JobApplicant[]>(`${Endpoints.VIEW_APPLICANTS}?jobId=${id}`);
};

export const acceptOrReject = async (
  payload: AcceptOrRejectRequest
): Promise<BaseResponse<unknown>> => {
  return API.post<AcceptOrRejectRequest, unknown>(
    Endpoints.ACCEPT_OR_REJECT,
    payload
  );
};
