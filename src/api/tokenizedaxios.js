import axios from 'axios';

// Enable credentials and CSRF token handling
axios.defaults.withCredentials = true;

// Fetch the CSRF token from the sanctum/csrf-cookie endpoint
const fetchCSRFToken = async () => {
  try {
    await axios.get(`${import.meta.env.VITE_URL}/sanctum/csrf-cookie`);
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
  }
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-KEY': import.meta.env.VITE_API_KEY,
  },
  timeout: 10000,
});

// Ensure CSRF token is fetched before making requests
axiosInstance.interceptors.request.use(
  async (config) => {
    // Dynamically set 'X-Remember-Token' from localStorage for every request
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['X-Remember-Token'] = token;
    }

    // Fetch CSRF token (if needed)
    await fetchCSRFToken();

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
