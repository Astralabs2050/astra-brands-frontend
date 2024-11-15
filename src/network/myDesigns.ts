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

export const getJobs = async (): Promise<BaseResponse<Job[]>> => {
  return API.get<Job[]>(Endpoints.GET_JOBS);
};
