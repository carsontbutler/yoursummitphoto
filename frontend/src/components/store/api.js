import axios from "axios";

export const url = "yoursummitphoto-api.carsonbutler.dev";

export const axiosInstance = axios.create({
  baseURL: url,
  timeout: 5000,
});