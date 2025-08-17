import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net/api/v1';

const instance = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    'Accept': 'application/json',
  },
});

// デバッグ(一回だけ)
if (typeof window !== 'undefined' && !(window as any).__API_BASE_LOGGED__) {
  console.log('[API] baseURL =', API_BASE);
  (window as any).__API_BASE_LOGGED__ = true;
}

// Request interceptor to add auth token
instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('access_token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;