import axios from "axios";
import { TOKEN_NAME, API_URL } from "./constant";

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem(TOKEN_NAME) ?? "";
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return error.response;
  }
);

export default instance;
