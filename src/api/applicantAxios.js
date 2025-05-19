// applicantAxios.js
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "";

let API_URL = "";

try {
  const url = new URL(baseURL);
  API_URL = `${url.protocol}//${url.host}`;
} catch {
  console.warn("Failed to parse VITE_BACKEND_URL, using as-is:", baseURL);
  API_URL = baseURL;
}

const applicantAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-API-KEY": import.meta.env.VITE_API_KEY,
  },
  timeout: 10000,
});

// Add debugging interceptor
applicantAxios.interceptors.request.use(
  (config) => {
    // Store the applicant ID in the headers
    const applicantId = localStorage.getItem("applicant_id");
    if (applicantId) {
      config.headers["X-Applicant-ID"] = applicantId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default applicantAxios;
