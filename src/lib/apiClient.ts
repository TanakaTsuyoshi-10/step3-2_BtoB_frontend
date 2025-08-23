// src/lib/apiClient.ts
import axios from "axios";
import Cookies from 'js-cookie';

// Expect NEXT_PUBLIC_API_BASE_URL to be like
// https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net/api/v1
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 
               process.env.NEXT_PUBLIC_API_BASE || 
               'https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net/api/v1';

// Normalize: remove trailing slash
const apiBase = baseURL.replace(/\/+$/, "");

export const api = axios.create({
  baseURL: apiBase, // <-- ends with /api/v1
  timeout: 15000,
  withCredentials: false,
  headers: { 
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

// Helper to build paths without duplicating /api/v1
export const path = (p: string) => {
  if (!p.startsWith("/")) return `/${p}`;
  return p;
};

// Request interceptor to add auth token
api.interceptors.request.use(
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
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('access_token');
      if (typeof window !== 'undefined') {
        console.warn('Unauthorized access - redirecting to login');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Debug logging
if (typeof window !== 'undefined' && !(window as any).__API_BASE_LOGGED__) {
  console.log('[API_BASE]', apiBase);
  (window as any).__API_BASE_LOGGED__ = true;
}