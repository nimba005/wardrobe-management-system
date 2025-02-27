import axios from "axios";
import type { AxiosInstance } from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Ensure it matches Laravel

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
