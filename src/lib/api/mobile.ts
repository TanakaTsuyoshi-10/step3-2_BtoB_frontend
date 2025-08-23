// Mobile API configuration - integrated with existing backend
import { get, post, put, path } from '../apiClient';

// Authentication API calls (using existing backend endpoints)
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await post('/login/access-token', {
      username: credentials.email,
      password: credentials.password,
    });
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await get('/users/me');
    return response.data;
  },
  
  updateProfile: async (userData: any) => {
    const response = await put('/users/me', userData);
    return response.data;
  },
};

// Energy usage API calls (using existing metrics endpoints)
export const energyAPI = {
  getMonthlyUsage: async (year: number, month: number) => {
    try {
      const response = await get(path('metrics/monthly-usage'), {
        params: { year }
      });
      
      // Filter for specific month
      const monthData = response.data.months?.find((m: any) => m.month === month);
      return {
        usage: {
          electricity: {
            amount: monthData?.electricity_kwh || 0,
            cost: (monthData?.electricity_kwh || 0) * 25,
            unit: 'kWh'
          },
          gas: {
            amount: monthData?.gas_m3 || 0,
            cost: (monthData?.gas_m3 || 0) * 100,
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
      const response = await get(path('metrics/kpi'));
      const kpi = response.data;
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
      const response = await post('/energy-records', usageData);
      return response.data;
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
      const response = await get('/admin/points/employees');
      const currentUser = await authAPI.getCurrentUser();
      
      // Find current user's points from employees list
      const userPoints = response.data.employees?.find((emp: any) => emp.id === currentUser.id);
      return { balance: userPoints?.points_balance || 0 };
    } catch (error) {
      console.error('Failed to get points balance:', error);
      return { balance: 0 };
    }
  },
  
  getHistory: async (params: any = {}) => {
    try {
      const response = await get('/admin/points/employees', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to get points history:', error);
      return { employees: [], total: 0 };
    }
  },
  
  getRewards: async () => {
    try {
      const response = await get('/admin/incentives/products', {
        params: { active: true }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to get rewards:', error);
      return [];
    }
  },
  
  redeemPoints: async (rewardData: any) => {
    try {
      const response = await post('/admin/incentives/products/redeem', rewardData);
      return response.data;
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
      const response = await get('/admin/points/employees', { 
        params: { ...params, sort_by: 'points_balance', sort_order: 'desc' }
      });
      return response.data.employees || [];
    } catch (error) {
      console.error('Failed to get individual ranking:', error);
      return [];
    }
  },
  
  getMyPosition: async () => {
    try {
      const currentUser = await authAPI.getCurrentUser();
      const response = await get('/admin/points/employees', {
        params: { sort_by: 'points_balance', sort_order: 'desc' }
      });
      
      const employees = response.data.employees || [];
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
      const response = await get(path('metrics/kpi'));
      const kpi = response.data;
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