import axios from "axios";

export const url = "https://yoursummitphoto-api.carsonbutler.dev";

export const axiosInstance = axios.create({
  baseURL: url,
  timeout: 5000,
});