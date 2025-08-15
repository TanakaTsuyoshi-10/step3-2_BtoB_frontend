import Cookies from 'js-cookie';
import { User } from '@/types';

export const setAuthToken = (token: string) => {
  Cookies.set('access_token', token, { expires: 7 }); // 7 days
};

export const getAuthToken = (): string | undefined => {
  return Cookies.get('access_token');
};

export const removeAuthToken = () => {
  Cookies.remove('access_token');
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const setCurrentUser = (user: User) => {
  localStorage.setItem('current_user', JSON.stringify(user));
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('current_user');
  return user ? JSON.parse(user) : null;
};

export const removeCurrentUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('current_user');
  }
};

export const logout = () => {
  removeAuthToken();
  removeCurrentUser();
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};