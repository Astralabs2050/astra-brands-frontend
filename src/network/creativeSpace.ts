import API, { BaseResponse } from "./API";
import { Endpoints } from "./constant";

interface GenerateRequest {
  prompt: string;
}
interface GenerateResponse {
  images: string[];
  designId: string;
}

interface AddCreatorRequest {
  designId: string;
  creator: string;
}

interface AdditionalInfoRequest {
  designId: string;
  data: {
    outfitName: string;
    pieceNumber: number;
    pieces: { type: string; designNumber: number; piecePrice: number }[];

    imageData: {
      image: string;
      view: string;
    }[];
    prints: { image: string }[];
  };
}

interface CreateNewJobRequest {
  designId: string;
  description: string;
  timeline: string;
  manufacturer: boolean;
}

export const generateDesign = async (
  payload: GenerateRequest
): Promise<BaseResponse<GenerateResponse>> => {
  return API.post<GenerateRequest, GenerateResponse>(
    Endpoints.GENERATE_DESIGN,
    payload
  );
};

export const addCreator = async (
  payload: AddCreatorRequest
): Promise<BaseResponse<unknown>> => {
  return API.patch<AddCreatorRequest, unknown>(Endpoints.ADD_CREATOR, payload);
};

export const additionalInformation = async (
  payload: AdditionalInfoRequest
): Promise<BaseResponse<unknown>> => {
  return API.patch<AdditionalInfoRequest, unknown>(
    Endpoints.ADDITIONAL_INFO,
    payload
  );
};

export const createJob = async (
  payload: CreateNewJobRequest
): Promise<BaseResponse<unknown>> => {
  return API.post<CreateNewJobRequest, unknown>(Endpoints.CREATE_JOB, payload);
};
