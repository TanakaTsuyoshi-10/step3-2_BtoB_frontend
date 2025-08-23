import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || 'https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized access - redirecting to login');
    }
    return Promise.reject(error);
  }
);

export { api };