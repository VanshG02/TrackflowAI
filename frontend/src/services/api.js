import axios from "axios";

const API = axios.create({
  baseURL: "https://trackflowai-backend.onrender.com",
  withCredentials: false,
});

// ✅ Automatically attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

