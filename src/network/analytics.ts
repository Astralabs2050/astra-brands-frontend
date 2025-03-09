import API, { BaseResponse } from "./API";
import { Endpoints } from "./constant";

interface Stat {
  totalJobsCreated: number;
  totalJobApplications: number;
  totalAmount: number;
  completedJobs: number;
  totalImpressions: number;
}
interface Graph {
  [key: string]: number;
}

export const getStat = async (): Promise<BaseResponse<Stat>> => {
  return API.get<Stat>(`${Endpoints.GET_STATS}`);
};

export const getGraph = async (): Promise<BaseResponse<Graph>> => {
  return API.get<Graph>(`${Endpoints.GET_GRAPH}`);
};
