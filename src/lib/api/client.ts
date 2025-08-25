import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE;
if (!baseURL) {
  throw new Error('NEXT_PUBLIC_API_BASE environment variable is required');
}

const api = axios.create({
  baseURL: baseURL,
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