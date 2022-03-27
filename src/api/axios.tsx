import axios from "axios";

const API_URL = "http://localhost:3004/";

export const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
