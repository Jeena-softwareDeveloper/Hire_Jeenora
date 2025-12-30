import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true // Important for cookies
})

api.interceptors.request.use((config) => {
  // Fix: Use 'hireuser' instead of 'awareness'
  const websiteType = window.location.hostname.includes('ecommerce') ? 'ecommerce' : 'hireuser';
  config.headers['x-website-type'] = websiteType;

  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 409) {
      // Clear invalid token and redirect to login
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      window.location.href = '/hire/login';
    }
    return Promise.reject(error);
  }
);

export default api;