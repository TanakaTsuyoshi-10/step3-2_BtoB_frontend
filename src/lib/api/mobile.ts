// Mobile API configuration - integrated with existing backend
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000/api/v1';

// Mobile API client with authentication
const mobileAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
mobileAPI.interceptors.request.use(
  (config) => {
    // Use existing auth system
    const token = typeof window !== 'undefined' ? 
      document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1] : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
mobileAPI.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
      if (typeof window !== 'undefined') {
        // Use existing auth system
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem('current_user');
        window.location.href = '/mobile/login';
      }
    }
    return Promise.reject(error);
  }
);

// Authentication API calls (using existing backend endpoints)
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await mobileAPI.post('/login/access-token', {
      username: credentials.email,
      password: credentials.password,
    });
    return response;
  },
  
  getCurrentUser: async () => {
    return await mobileAPI.get('/users/me');
  },
  
  updateProfile: async (userData: any) => {
    return await mobileAPI.put('/users/me', userData);
  },
};

// Energy usage API calls (using existing metrics endpoints)
export const energyAPI = {
  getMonthlyUsage: async (year: number, month: number) => {
    try {
      const response = await mobileAPI.get('/metrics/monthly-usage', {
        params: { year }
      });
      
      // Filter for specific month
      const monthData = response.months?.find((m: any) => m.month === month);
      return {
        usage: {
          electricity: {
            amount: monthData?.electricity_kwh || 0,
            cost: (monthData?.electricity_kwh || 0) * 25, // Estimated cost per kWh
            unit: 'kWh'
          },
          gas: {
            amount: monthData?.gas_m3 || 0,
            cost: (monthData?.gas_m3 || 0) * 100, // Estimated cost per m³
            unit: 'm³'
          }
        }
      };
    } catch (error) {
      console.error('Failed to get monthly usage:', error);
      return {
        usage: {
          electricity: { amount: 0, cost: 0, unit: 'kWh' },
          gas: { amount: 0, cost: 0, unit: 'm³' }
        }
      };
    }
  },
  
  getCurrentUsage: async () => {
    try {
      const kpi = await mobileAPI.get('/metrics/kpi');
      return {
        electricity_total: kpi.electricity_total_kwh || 0,
        gas_total: kpi.gas_total_m3 || 0,
        co2_reduction: kpi.co2_reduction_total_kg || 0,
      };
    } catch (error) {
      console.error('Failed to get current usage:', error);
      return {
        electricity_total: 0,
        gas_total: 0,
        co2_reduction: 0,
      };
    }
  },

  addUsage: async (usageData: any) => {
    try {
      // This would need to be implemented as energy record creation
      return await mobileAPI.post('/energy-records', usageData);
    } catch (error) {
      console.error('Failed to add usage data:', error);
      throw error;
    }
  },
};

// Points API calls (using existing points endpoints)
export const pointsAPI = {
  getBalance: async () => {
    try {
      const response = await mobileAPI.get('/admin/points/employees');
      const currentUser = await authAPI.getCurrentUser();
      
      // Find current user's points from employees list
      const userPoints = response.employees?.find((emp: any) => emp.id === currentUser.id);
      return { balance: userPoints?.points_balance || 0 };
    } catch (error) {
      console.error('Failed to get points balance:', error);
      return { balance: 0 };
    }
  },
  
  getHistory: async (params: any = {}) => {
    try {
      return await mobileAPI.get('/admin/points/employees', { params });
    } catch (error) {
      console.error('Failed to get points history:', error);
      return { employees: [], total: 0 };
    }
  },
  
  getRewards: async () => {
    try {
      return await mobileAPI.get('/admin/incentives/products', {
        params: { active: true }
      });
    } catch (error) {
      console.error('Failed to get rewards:', error);
      return [];
    }
  },
  
  redeemPoints: async (rewardData: any) => {
    try {
      return await mobileAPI.post('/admin/incentives/products/redeem', rewardData);
    } catch (error) {
      console.error('Failed to redeem points:', error);
      throw error;
    }
  },
};

// Ranking API calls (using existing endpoints)
export const rankingAPI = {
  getIndividualRanking: async (params: any = {}) => {
    try {
      const response = await mobileAPI.get('/admin/points/employees', { 
        params: { ...params, sort_by: 'points_balance', sort_order: 'desc' }
      });
      return response.employees || [];
    } catch (error) {
      console.error('Failed to get individual ranking:', error);
      return [];
    }
  },
  
  getMyPosition: async () => {
    try {
      const currentUser = await authAPI.getCurrentUser();
      const allEmployees = await mobileAPI.get('/admin/points/employees', {
        params: { sort_by: 'points_balance', sort_order: 'desc' }
      });
      
      const employees = allEmployees.employees || [];
      const myPosition = employees.findIndex((emp: any) => emp.id === currentUser.id) + 1;
      const myData = employees.find((emp: any) => emp.id === currentUser.id);
      
      return {
        position: myPosition || 0,
        total: employees.length,
        points: myData?.points_balance || 0
      };
    } catch (error) {
      console.error('Failed to get my position:', error);
      return { position: 0, total: 0, points: 0 };
    }
  },
  
  getAchievements: async () => {
    try {
      // Check CO2 reduction and points for achievements
      const kpi = await mobileAPI.get('/metrics/kpi');
      const currentUser = await authAPI.getCurrentUser();
      
      const achievements = [];
      
      // CO2 reduction achievements
      if (kpi.co2_reduction_total_kg >= 100) {
        achievements.push({ 
          id: 1, 
          title: 'エコ戦士', 
          description: '100kg CO2削減達成', 
          earned: true 
        });
      }
      
      if (kpi.co2_reduction_total_kg >= 500) {
        achievements.push({ 
          id: 2, 
          title: '省エネマスター', 
          description: '500kg CO2削減達成', 
          earned: true 
        });
      }
      
      return achievements;
    } catch (error) {
      console.error('Failed to get achievements:', error);
      return [];
    }
  },
};

// File upload API calls (if needed)
export const uploadAPI = {
  uploadDocument: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      return await mobileAPI.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Failed to upload document:', error);
      throw error;
    }
  },
  
  // Analysis API for uploaded energy bills
  analyzeEnergyBill: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await mobileAPI.post('/upload/analyze-bill', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response;
    } catch (error) {
      console.error('Failed to analyze energy bill:', error);
      throw error;
    }
  },
};

// Utility functions for auth management (using existing auth system)
export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    document.cookie = `access_token=${token}; expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
  }
};

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('current_user');
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1] || null;
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

// User management functions
export const setCurrentUser = (user: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('current_user', JSON.stringify(user));
  }
};

export const getCurrentUser = (): any | null => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('current_user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};