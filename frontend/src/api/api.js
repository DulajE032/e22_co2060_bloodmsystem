import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1/', // Your Django API base URL
});

// Automatically add JWT token to headers
api.interceptors.request.use(
  (config) => {
    const storedTokens = localStorage.getItem('authTokens');
    if (storedTokens) {
      try {
        const tokens = JSON.parse(storedTokens);
        if (tokens.access) {
          config.headers.Authorization = `Bearer ${tokens.access}`;
        }
      } catch (error) {
        console.error("Error parsing auth tokens", error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;